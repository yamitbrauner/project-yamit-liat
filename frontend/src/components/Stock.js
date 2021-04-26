import React, { Component } from 'react';
import StockRow from "./StockRow";
import ReactPaginate from 'react-paginate';
const PER_PAGE = 5;

class Stock extends Component {

    state = {items:[],itemsToShow:[], categories:{}, offset: 0};

    componentDidMount(){
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
                                    itemsToShow : resProducts.slice(this.state.offset,PER_PAGE),
                                    categories: this.organizeCategories(resCategories),
                                    pageCount: Math.ceil(resProducts.length / PER_PAGE)
                                });
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
        var tempCategories = {};
        categories.map(category =>{
            tempCategories[category.categoryId] = category.categoryName;
        })
        return tempCategories;
    }

    handlePageClick = (data) => {
        let selected = data.selected;
        let offset = Math.ceil(selected * PER_PAGE);
        this.setState({ offset: offset,  itemsToShow : this.state.items.slice(offset, offset + PER_PAGE) });
    };

    onOkClicked = (index,newItem)=>{
        var items = [...this.state.items];
        items[index].quantityInStock = newItem.quantityInStock
        items[index].pricePerUnit = newItem.pricePerUnit;
        items[index].description = newItem.description;
        this.setState({ items: items});
    }

    onDeleteClicked = (index)=>{
        var items = [...this.state.items];
        items.splice(index,1);
        this.setState({ items: items});
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
                    <th scope="col">כמות שהוזמנה</th>
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
