import React, { Component } from 'react';
import ItemInCart from "./ItemInCart";
class Cart extends Component {


    handleQuantity=(index, num)=>{
        this.props.onAddToCart(index,num);
    }
  render() {
    return (
        <div className="col cart">
            <div className="row cart-title"><span className="col cart-title-text">סיכום הזמנה</span></div>
            <div className="divider row margin-top-bottom"/>
            <div className="row">
                <div className="col">
                    {this.props.itemsInCart.map((item,index) =>{
                        return item.quantity >0 ?
                            <div className="row">
                                <ItemInCart item={item} itemIndex={index} handleUpdateQuantity={this.handleQuantity}/>
                            </div>
                             : ''
                    })}
                </div>
            </div>
        </div>
    );
  }
}

export default Cart;
