import React, { Component } from 'react';
import StockRow from "./StockRow";
import NewProduct from "./NewProduct";
import ReactPaginate from 'react-paginate';
const PER_PAGE = 5;

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
        fetch("/category")
            .then(res => res.json())
            .then(
                (resCategories) => {
                    fetch("/product")
                        .then(res => res.json())
                        .then(
                            (resProducts) => {
                                this.setState({
                                    items: resProducts,
                                    categories: this.organizeCategories(resCategories),
                                    pageCount: Math.ceil(resProducts.length / PER_PAGE)
                                },()=>this.handlePageClick());
                            },
                            (error) => {
                                this.props.onSelectPage(404);
                            }
                        )
                },
                (error) => {
                    this.props.onSelectPage(404);
                }
            )
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
            offset = Math.ceil(selected * PER_PAGE);
        }else{
            offset = this.state.offset;
        }
        this.setState({
            offset: offset,
            itemsToShow : this.state.items.slice(offset, offset + PER_PAGE),
            pageCount: Math.ceil(this.state.items.length / PER_PAGE)
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
    onDeleteClicked = (index)=>{
        let tempIndex = index + this.state.offset;
        this.deleteItem(tempIndex);
    }
    updateItem= () =>{
        if(this.state.hasEditIndex === false){ //add
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.state.items[0])
            };
            fetch("/products",requestOptions)
                .then(res => {
                    if(res.ok){
                        this.switchProductBox();
                        this.handlePageClick({selected:0});
                    }
                })
        }else{ // update
            let item = this.state.items[this.state.hasEditIndex];
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item)
            };
            fetch("/products/"+item.prodId,requestOptions)
                .then(res => {
                    if(res.ok){
                        this.switchProductBox();
                        this.handlePageClick();
                    }
                })
        }

    }
    deleteItem= (index) =>{
        let itemId = this.state.items[index].prodId;
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        };
        fetch("/deleteProduct?productId="+itemId,requestOptions)
            .then(res => {
                if(res.ok){
                    let items = [...this.state.items];
                    items.splice(index,1);
                    this.setState({ items: items},()=>this.handlePageClick());

                }
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

    render() {
    return (
        <div className="col">
            {!this.state.productBoxOpen && <button className="btn btn-danger row" onClick={()=>this.switchProductBox(true,false)}>
                    הוספת מוצר
                </button>}
            {this.state.productBoxOpen && <NewProduct onOkClicked={this.onOkClicked} cancelAdd={this.switchProductBox} items={this.state.items} hasEditIndex={this.state.hasEditIndex}/>}
            <table className="table table-striped">
                <thead>
                <tr>
                    <th scope="col"/>
                    <th scope="col"/>
                    <th scope="col">#</th>
                    <th scope="col">קטגוריה</th>
                    <th scope="col">שם מוצר</th>
                    <th scope="col">כמות במלאי</th>
                    <th scope="col">מחיר</th>
                    <th scope="col">תיאור</th>
                 </tr>
                </thead>
                <tbody>
                {this.state.itemsToShow.length > 0 && this.state.itemsToShow.map((item,index)=>{
                    return <StockRow item={item}
                                     categories={this.state.categories}
                                     key={index}
                                     index={index}
                                     switchProductBox={this.switchProductBox}
                                     productBoxOpen = {this.state.productBoxOpen}
                                     onDeleteClicked={this.onDeleteClicked}/>
                })}
                </tbody>
            </table>
            <ReactPaginate
                previousLabel={'הקודם'}
                nextLabel={'הבא'}
                breakLabel={'...'}
                breakClassName={'break-me'}
                pageCount={this.state.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={'pagination'}
                activeClassName={'active'}
            />
        </div>
    );
  }
}

export default Stock;
