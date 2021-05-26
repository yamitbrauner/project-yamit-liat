import React, { Component } from 'react';
import RowMenu from './RowMenu';
import Item from './Item';


class Shop extends Component {
  state = { items:{}, categories: [], categorySelected: null, productToShow:false, searchInput:''};


    constructor(props){
        super(props);
        this.search = this.search.bind(this);
    }
  componentDidMount(){
      fetch("/category")
        .then(res => res.json())
        .then(
            (resCategories) => {
                this.setState({
                    categories: resCategories,
                },()=>this.handleCategorySelection());
            }
        )
        .catch((error)=>{
          this.props.showPopup(window.ERROR_POPUP);
        })
  }

    handleCategorySelection = (category) =>{
      if(!category){
            category = this.state.categories[0];
      }

      if(this.state.items[category.categoryId] && this.state.items[category.categoryId].length > 0){
          this.setState({
              categorySelected : category,
              searchInput:''
          });
      }else{
          fetch("/products/category/"+category.categoryId)
              .then(res => res.json())
              .then(
                  (resProducts) => {
                      let tempItems = {...this.state.items};
                      tempItems[category.categoryId] = resProducts;
                      this.setState({
                          items: tempItems,
                          categorySelected : category,
                          searchInput:''
                      });
                  }
              )
              .catch((error)=>{
                  this.props.showPopup(window.ERROR_POPUP);
              })
      }

    }

    handleCart=(itemIndex)=>{
        let selectedItem = this.state.items[this.state.categorySelected.categoryId][itemIndex];
        this.props.handleCart(itemIndex, selectedItem);
    }

    showProduct=(itemIndex)=>{
        this.props.showProduct(this.state.items[this.state.categorySelected.categoryId][itemIndex],itemIndex);
    }
    search=(event)=>{
      this.setState({
         searchInput: event.target.value
      });
    }

  render() {
        let searchResult=[];
        if(this.state.categorySelected){
            searchResult = this.state.items[this.state.categorySelected.categoryId].filter(item=>
                {
                    return item.prodName.includes(this.state.searchInput);
                }
            );
        }
    return (
        <div className="col">
            <div className="row">
                    <div className="col">
                            <RowMenu onSelectCategory={this.handleCategorySelection}
                                      categorySelected={this.state.categorySelected}
                                        categories={this.state.categories}/>
                        <div className="row margin-top-bottom">
                            <div className="col">
                                <input type="text" className="search" name="search" value={this.state.searchInput} placeholder="לחיפוש מוצרים בקטגוריה אנא הקלד..." onChange={this.search}/>
                            </div>
                        </div>
                        <div className="row">
                            {searchResult.map((item, index) => {
                                    //eslint-disable-next-line
                                    return item.quantityInStock > 0 ?
                                        <Item item={item} itemIndex={index} key={index} handleCart={(itemIndex)=>this.handleCart(itemIndex)}
                                              itemsInCart={this.props.itemsInCart} showProduct={this.showProduct}/>
                                         : ''
                                })}
                        </div>
                    </div>
            </div>
        </div>
    );
  }
}

export default Shop;
