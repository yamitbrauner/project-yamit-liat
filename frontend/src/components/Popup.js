import React, { Component } from 'react';
import Cart from "./Cart";
import Login from "./Login";
import Product from "./Product";

let CLOSE_POPUP = 0;
let CART_POPUP = 1;
let LOGIN_POPUP = 2;
let PRODUCT_POPUP = 3;

class Popup extends Component {

  render() {
    return (
                <div className={"popup"+this.props.popupType}>
                    <div className="row">
                        <div className="col-1">
                            <div className="line one" onClick={()=>this.props.showPopup(0)}/>
                            <div className="line two" onClick={()=>this.props.showPopup(0)}/>
                        </div>
                        {this.props.popupType === CART_POPUP ?
                            <Cart itemsInCart={this.props.itemsInCart} totalPrice={this.props.totalPrice} setItemsInCart={this.props.setItemsInCart} isEditable={true}
                              handleQuantity={this.props.handleQuantity} handlePay={()=>this.props.handlePay()} removeItemFromCart={this.props.removeItemFromCart}/>
                              : ""
                        }
                        {this.props.popupType === LOGIN_POPUP ?
                              <Login handleLog={(log)=>this.props.handleLog(log)} userDetails={this.props.userDetails}/>
                              :""}
                        {this.props.popupType === PRODUCT_POPUP?
                            <Product productToShow={this.props.productToShow} handleCart={this.props.handleCart}
                                     itemsInCart={this.props.itemsInCart}/>
                              :""}
                    </div>
                    <div className="modal-backdrop in" onClick={()=>this.props.showPopup(CLOSE_POPUP)}/>
                </div>

  );
  }
  }


export default Popup;
