import React, { Component } from 'react';
import NewProduct from "./NewProduct";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import { getHeaders } from './GlobalFunc'

class Stock extends Component {

    state = {items:[],itemsToShow:[], categories:{}, offset: 0, productBoxOpen: false, hasEditIndex:false};

    constructor(props){
        super(props);
        this.updateItem = this.updateItem.bind(this);
    }
    componentDidMount(){
        this.getProducts();
    }
    getProducts(){
        fetch("/public/getAllCategory")
            .then(res => res.json())
            .then(
                (resCategories) => {
                    fetch("/public/getAllProducts")
                        .then(res => res.json())
                        .then(
                            (resProducts) => {
                                this.setState({
                                    items: resProducts,
                                    categories: this.organizeCategories(resCategories),
                                    pageCount: Math.ceil(resProducts.length / window.PER_PAGE)
                                },()=>this.handlePageClick());
                            }
                        )
                        .catch((error)=>{
                            this.props.showPopup(window.ERROR_POPUP);
                        })
                }
            )
            .catch((error)=>{
                this.props.showPopup(window.ERROR_POPUP);
            })
    }
    organizeCategories = (categories)=>{
        let tempCategories = {};
        // eslint-disable-next-line
        categories.map(category =>{
            tempCategories[category.categoryId] = category.categoryName;
        })
        return tempCategories;
    }
    handlePageClick = (data) => {
        let offset = 0;
        if(data){
            let selected = data.selected;
            offset = Math.ceil(selected * window.PER_PAGE);
        }else{
            offset = this.state.offset;
        }
        this.setState({
            offset: offset,
            itemsToShow : this.state.items.slice(offset, offset + window.PER_PAGE),
            pageCount: Math.ceil(this.state.items.length / window.PER_PAGE)
        });
    };
    onOkClicked = (newItem)=>{
        let items = [...this.state.items];
        if(this.state.hasEditIndex === false){
            //add
            items.unshift({
                categoryId : newItem.categoryId,
                prodName : newItem.prodName,
                quantityInStock : newItem.quantityInStock,
                pricePerUnit : newItem.pricePerUnit,
                description : newItem.description,
                picUrl : newItem.picUrl.name
            })
        }else{
            items[this.state.hasEditIndex].prodName = newItem.prodName
            items[this.state.hasEditIndex].quantityInStock = newItem.quantityInStock
            items[this.state.hasEditIndex].pricePerUnit = newItem.pricePerUnit;
            items[this.state.hasEditIndex].description = newItem.description;
            items[this.state.hasEditIndex].picUrl = newItem.picUrl.name ?  newItem.picUrl.name :  newItem.picUrl;
        }
        this.setState({
            items: items
        },()=>this.updateItem());
    }

    updateItem= () =>{
        if(this.state.hasEditIndex === false){ //add
            const requestOptions = {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(this.state.items[0])
            };
            fetch("/admin/createNewProduct",requestOptions)
                .then(res => {
                    if(res.ok){
                        this.switchProductBox();
                        this.handlePageClick({selected:0});
                    }
                })
                .catch((error)=>{
                    this.props.showPopup(window.ERROR_POPUP);
                })
        }else{ // update
            let item = this.state.items[this.state.hasEditIndex];
            const requestOptions = {
                method: 'PUT',
                headers: getHeaders(),
                body: JSON.stringify(item)
            };
            fetch("/admin/updateProductById/"+item.prodId,requestOptions)
                .then(res => {
                    if(res.ok){
                        this.switchProductBox();
                        this.handlePageClick();
                    }
                })
                .catch((error)=>{
                    this.props.showPopup(window.ERROR_POPUP);
            })
        }

    }
    deleteItem= (index) =>{
        let tempIndex = index + this.state.offset;
        let itemId = this.state.items[tempIndex].prodId;
        const requestOptions = {
            method: 'DELETE',
            headers: getHeaders(),
        };
        fetch("/admin/deleteProductById?productId="+itemId,requestOptions)
            .then(res => {
                if(res.ok){
                    let items = [...this.state.items];
                    items.splice(tempIndex,1);
                    this.setState({ items: items},()=>this.handlePageClick());

                }else{
                    alert("לא ניתן למחוק, קיימת הזמנה עבוד מוצר זה");
                }
            })
            .catch((error)=>{
                this.props.showPopup(window.ERROR_POPUP);
            })
    }
    switchProductBox = (val,index) =>{
        let tempIndex = false;
        if(index !== false){
            tempIndex = index + this.state.offset;
       }
       this.setState({productBoxOpen : val ? val : !this.state.productBoxOpen, hasEditIndex:tempIndex});
    }
    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    handlePageChange = (page,sizePerPage) => {
        let offset = Math.ceil((page-1) * sizePerPage);
        this.setState({ offset: offset});
    };

    render() {
        const paginationOption = {
            sizePerPage: window.PER_PAGE,
            hideSizePerPage:  true,
            withFirstAndLast:true,
            onPageChange: this.handlePageChange
        };
        let columns = [{
            dataField: 'delete',
            isDummyField:true,
            text: '',
            classes: 'small-col',
            headerClasses:'small-col',
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    if(!this.state.productBoxOpen){
                        this.deleteItem(rowIndex);
                    }
                },
            },
            formatter: (cell,row,rowIndex,formatExtraData)=>{
                return (
                    <div className="col">
                        <a className="glyphicon glyphicon-trash color-black"/>
                    </div>
                    );
            },
        },{
            dataField: 'edit',
            isDummyField:true,
            text: '',
            classes: 'small-col',
            headerClasses:'small-col',
            events: {
                onClick: (e, column, columnIndex, row, rowIndex) => {
                    if(!this.state.productBoxOpen) {
                        this.switchProductBox(true, rowIndex)
                    }
                },
            },
            formatter: (cell,row,rowIndex,formatExtraData)=>{
                return (
                    <div className="col">
                        <a className="glyphicon glyphicon-pencil color-black"/>
                    </div>
                    );
            },
        },{
            dataField: 'categoryId',
            text: 'קטגוריה',
            formatter: (cell,row,rowIndex,formatExtraData)=>{
                return formatExtraData[cell];
            },
            formatExtraData:this.state.categories
        },{
            dataField: 'prodName',
            text: 'שם מוצר'
        }, {
            dataField: 'quantityInStock',
            text: 'כמות במלאי'
        }, {
            dataField: 'pricePerUnit',
            text: 'מחיר',
            formatter: (cell,row,rowIndex,formatExtraData)=>{
                return "₪"+cell;
            }
        }, {
            dataField: 'description',
            text: 'תאור'
        }
        ];
    return (
        <div className="col">
            {!this.state.productBoxOpen && <button className="margin-top-bottom btn btn-danger row" onClick={()=>this.switchProductBox(true,false)}>
                    הוספת מוצר
                </button>}
            {this.state.productBoxOpen &&
            <NewProduct
                showPopup={(error)=>this.props.showPopup(error)}
                onOkClicked={this.onOkClicked}
                cancelAdd={this.switchProductBox}
                items={this.state.items}
                categories={this.state.categories}
                hasEditIndex={this.state.hasEditIndex}/>
            }
            {this.state.items.length ?
                <BootstrapTable
                    pagination={paginationFactory(paginationOption)}
                    keyField='prodId'
                    data={ this.state.items }
                    columns={ columns }
                /> : ""
            }
        </div>

    );
  }
}

export default Stock;
