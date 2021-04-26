import React, { Component } from 'react';
import SideMenu from './SideMenu';
import Item from './Item';
import Cart from './Cart';
import Payment from './Payment';


class Shop extends Component {
  state = { items:{}, itemsInCart:{} ,totalPrice:0, categories: [], categorySelected: null, isPayment: false};


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

    removeItemFromCart=(itemToRemove)=>{
      var tempItemsInCart = {...this.state.itemsInCart};
      delete tempItemsInCart[itemToRemove.prodId]
      this.setState({itemsInCart: tempItemsInCart}, ()=>this.updateTotalPrice());
    }

    handleCart = (itemIndex) =>{
      var tempItemsInCart = {...this.state.itemsInCart};
      var selectedItem = this.state.items[this.state.categorySelected.categoryId][itemIndex];
      if(tempItemsInCart[selectedItem.prodId]){
          this.removeItemFromCart(selectedItem);
      }else{
          selectedItem.quantity = 1;
          tempItemsInCart[selectedItem.prodId]=selectedItem;
          this.setState({itemsInCart: tempItemsInCart}, ()=>this.updateTotalPrice())
      }
    }

    handleQuantity = (prodId, num)=>{
        var tempItemsInCart = {...this.state.itemsInCart};
        tempItemsInCart[prodId].quantity = num;
        this.setState({itemsInCart: tempItemsInCart}, ()=>this.updateTotalPrice());
    }

    updateTotalPrice=()=>{
        var tempTotalPrice = 0;
        // eslint-disable-next-line
        Object.keys(this.state.itemsInCart).map((itemKey,index) => {
         tempTotalPrice = tempTotalPrice + this.state.itemsInCart[itemKey].quantity * this.state.itemsInCart[itemKey].pricePerUnit;
        });

        this.setState({totalPrice: tempTotalPrice });
    }

    switchPaymentOrItems = ()=>{
        if(Object.keys(this.props.userDetails).length === 0){
            this.props.onSelectPage(2);
        }else{
            this.setState({isPayment: !this.state.isPayment})
        }
    }

  render() {
    return (
        <div className="col">
            <div className="row">
                {!this.state.isPayment ?
                    <>
                        <div className="col">
                            <div className="row">
                                <SideMenu onSelectCategory={this.handleCategorySelection}
                                          categories={this.state.categories}/>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="row">
                        <span className="col title">
                            {this.state.categorySelected ? this.state.categorySelected.categoryName : "כללי"}</span>
                            </div>
                            {this.state.categorySelected &&
                                this.state.items[this.state.categorySelected.categoryId].map((item, index) => {
                                    //eslint-disable-next-line
                                    return item.quantityInStock > 0 ?
                                        <div className="row margin-top-bottom" key={index}>
                                            <Item item={item} itemIndex={index} handleCart={this.handleCart} itemsInCart={this.state.itemsInCart}/>
                                        </div> : ''
                                })}
                        </div>
                    </>
                    :
                    <div className="col-8">
                        <div className="row">
                            <Payment userDetails={this.props.userDetails}/>
                        </div>
                    </div>
                }


                <div className="col">
                    <div className="row margin-top-bottom">
                        <Cart itemsInCart={this.state.itemsInCart} removeItemFromCart={this.removeItemFromCart}
                              handleQuantity={this.handleQuantity}
                              totalPrice={this.state.totalPrice} handlePay={this.switchPaymentOrItems}/>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default Shop;
