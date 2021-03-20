import React, { Component } from 'react';
import ItemInCart from "./ItemInCart";
class Cart extends Component {
    state={inShop : true};

    handleQuantity=(index, num)=>{
        this.props.onAddToCart(index,num);
    }
    handlePay=()=>{
        this.setState({inShop: false});
        this.props.handlePay();
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
                    {this.props.totalPrice > 0 ?
                        <>
                        <div className="row margin-top-bottom">
                            <span className="col">סה"כ: {this.props.totalPrice}₪</span>
                        </div>
                            {this.state.inShop ?
                                <div className="row">
                                    <div className="col">
                                        <button className="btn-default btn margin-top-bottom" onClick={this.handlePay}>
                                            <span className="category-name">לתשלום</span>
                                        </button>
                                    </div>
                                </div>: ""
                            }

                        </>:
                        <div className="row margin-top-bottom">
                            <span className="col">אין פריטים בעגלה</span>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
  }
}

export default Cart;
