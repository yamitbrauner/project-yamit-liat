import React, { Component } from 'react';
import RowMenu from './RowMenu';
import Item from './Item';


class Shop extends Component {
  state = { items:{}, categories: [], categorySelected: null};


  componentDidMount(){
      fetch("/category")
        .then(res => res.json())
        .then(
            (resCategories) => {
                this.setState({
                    categories: resCategories,
                },()=>this.handleCategorySelection());
            },
            (error) => {
                this.props.onSelectPage(404);
            }
        )
  }

    handleCategorySelection = (category) =>{
      if(!category){
            category = this.state.categories[0];
      }

      if(this.state.items[category.categoryId] && this.state.items[category.categoryId].length > 0){
          this.setState({
              categorySelected : category
          });
      }else{
          fetch("/products/category/"+category.categoryId)
              .then(res => res.json())
              .then(
                  (resProducts) => {
                      var tempItems = {...this.state.items};
                      tempItems[category.categoryId] = resProducts;
                      this.setState({
                          items: tempItems,
                          categorySelected : category
                      });
                  },
                  (error) => {
                      this.props.onSelectPage(404);
                  }
              )
      }

    }

    handleCart = (itemIndex) =>{
      var tempItemsInCart = {...this.props.itemsInCart};
      var selectedItem = this.state.items[this.state.categorySelected.categoryId][itemIndex];
      if(tempItemsInCart[selectedItem.prodId]){
          this.props.removeItemFromCart(selectedItem);
      }else{
          selectedItem.quantity = 1;
          tempItemsInCart[selectedItem.prodId]=selectedItem;
          this.props.setItemsInCart(tempItemsInCart);
      }
    }


  render() {
    return (
        <div className="col">
            <div className="row">
                    <div className="col">
                            <RowMenu onSelectCategory={this.handleCategorySelection}
                                      categorySelected={this.state.categorySelected}
                                        categories={this.state.categories}/>

                        <div className="row">
                            {this.state.categorySelected &&
                                this.state.items[this.state.categorySelected.categoryId].map((item, index) => {
                                    //eslint-disable-next-line
                                    return item.quantityInStock > 0 ?
                                        <Item item={item} itemIndex={index} key={index} handleCart={(itemIndex)=>this.handleCart(itemIndex)} itemsInCart={this.props.itemsInCart}/>
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
