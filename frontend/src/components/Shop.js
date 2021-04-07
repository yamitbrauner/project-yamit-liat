import React, { Component } from 'react';
import SideMenu from './SideMenu';
import Item from './Item';
import Cart from './Cart';
import Payment from './Payment';

class Shop extends Component {
  state = { items:[] ,totalPrice:0, categories: [], categorySelected: null, isPayment: false};
  constructor(props) {
      super(props);
      this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount(){
    fetch("/product")
        .then(res => res.json())
        .then(
            (resProduct) => {
                fetch("/category")
                    .then(res => res.json())
                    .then(
                        (resCategories) => {
                           this.setState({
                                items: resProduct,
                                categories: resCategories

                            },()=>this.handleCategorySelection());
                        },
                        (error) => {
                            this.props.onSelectPage(404);
                        }
                    )},
            (error) => {
                this.props.onSelectPage(404);
            }
        )
  }

    handleCategorySelection = (category) =>{
      if(!category){
            category = this.state.categories[0];
      }
        this.setState({categorySelected : category})
    }

    addToCart = (itemIndex,quantity) =>{
      var tempItems = [...this.state.items];
      var tempTotalPrice = this.state.totalPrice
      if(quantity< tempItems[itemIndex].quantity){
          tempTotalPrice = tempTotalPrice - (tempItems[itemIndex].quantity * tempItems[itemIndex].price_per_unit)
      }
      tempItems[itemIndex].quantity = quantity;
      tempTotalPrice = tempTotalPrice + (tempItems[itemIndex].quantity * tempItems[itemIndex].price_per_unit)
      this.setState({items: tempItems, totalPrice: tempTotalPrice });
    }
    switchPaymentOrItems = ()=>{
        this.setState({isPayment: !this.state.isPayment})
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
                            {
                                this.state.items.map((item, index) => {
                                    //eslint-disable-next-line
                                    return this.state.categorySelected && item.categoryId == this.state.categorySelected.categoryId ?
                                        <div className="row margin-top-bottom" key={index}>
                                            <Item item={item} itemIndex={index} onAddToCart={this.addToCart}/>
                                        </div> : ''
                                })}
                        </div>
                    </>
                    :
                    <div className="col-9">
                        <div className="row">
                            <Payment/>
                        </div>
                    </div>
                }


                <div className="col">
                    <div className="row margin-top-bottom">
                        <Cart itemsInCart={this.state.items} onAddToCart={this.addToCart} totalPrice={this.state.totalPrice} handlePay={this.switchPaymentOrItems}/>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default Shop;
