import React, { Component } from 'react';
import ItemInCart from "./ItemInCart";
import {Link} from "react-router-dom";

class Cart extends Component {

    removeItemFromCart=(itemToRemove)=>{
        this.props.removeItemFromCart(itemToRemove);
    }

    handleQuantity = (prodId, num)=>{
        let tempItemsInCart = {...this.props.itemsInCart};
        tempItemsInCart[prodId].quantity = num;
        this.props.setItemsInCart(tempItemsInCart);
    }

    handlePay=()=>{
        this.props.handlePay();
    }
  render() {
    return (
        <div className={this.props.isEditable? "col cart box" : "col box"}>
            <div className="row cart-title"><span className="col cart-title-text">סיכום הזמנה</span></div>
            <div className="divider row margin-top-bottom"/>
            <div className="row">
                <div className="col">
                    <table className="table table-striped">
                        <thead>
                        <tr>
                            {this.props.isEditable && <th/>}
                            <th scope="col">מוצר</th>
                            <th scope="col">מחיר ליח'</th>
                            <th scope="col">כמות</th>
                            <th scope="col">סה"כ</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Object.keys(this.props.itemsInCart).map((prodID,index) =>{
                            return this.props.itemsInCart[prodID].quantity >0 ?
                                <ItemInCart item={this.props.itemsInCart[prodID]} key={index} itemIndex={prodID} removeItemFromCart={this.removeItemFromCart}
                                            handleQuantity = {this.handleQuantity} isEditable={this.props.isEditable}/>
                                : ''
                        })}
                        </tbody>
                    </table>

                    {this.props.totalPrice > 0 ?
                        <>
                            <div className="row margin-top-bottom">
                                <span className="col">סה"כ: {this.props.totalPrice}₪</span>
                            </div>
                            {
                                this.props.isEditable &&
                            <div className="row">
                                <div className="col">
                                    <button className="btn-default btn margin-top-bottom" onClick={this.handlePay}>
                                        <Link to="payment" className="category-name">לתשלום</Link>
                                    </button>
                                </div>
                            </div>
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
