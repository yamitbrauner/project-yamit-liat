import React, { Component } from 'react';
import StockRow from "./StockRow";
import NewProduct from "./NewProduct";
import ReactPaginate from 'react-paginate';
const PER_PAGE = 5;

class Stock extends Component {

    state = {items:[],itemsToShow:[], categories:{}, offset: 0};

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

    onOkClicked = (index,newItem)=>{
        let items = [...this.state.items];
        let tempIndex = index + this.state.offset;
        items[tempIndex].quantityInStock = newItem.quantityInStock
        items[tempIndex].pricePerUnit = newItem.pricePerUnit;
        items[tempIndex].description = newItem.description;
        this.setState({
            items: items
        },()=>this.updateItem(tempIndex));
    }

    onDeleteClicked = (index)=>{
        let tempIndex = index + this.state.offset;
        this.deleteItem(tempIndex);
    }
    updateItem= (index) =>{
        if(this.state.addOption){ //add
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.state.items[index])
            };
            fetch("/products",requestOptions)
                .then(res => {
                    if(res.ok){
                        this.switchAddOption();
                        this.getProducts();
                    }
                })
        }else{ // update
            let itemId = this.state.items[index].prodId;
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.state.items[index])
            };
            fetch("/products/"+itemId,requestOptions)
                .then(res => {
                    if(res.ok){
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

    render() {
    return (
        <div className="col">
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
                    return <StockRow item={item} categories={this.state.categories} key={index} index={index} onDeleteClicked={this.onDeleteClicked} onOkClicked={this.onOkClicked}/>
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
