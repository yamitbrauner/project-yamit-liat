import React, { Component } from 'react';
import PlusMinus from "./PlusMinus";

class ItemInCart extends Component {


  handleQuantity=(num)=>{
      this.props.handleQuantity(this.props.itemIndex,num);
  }
  removeItemFromCart=()=>{
      this.props.removeItemFromCart(this.props.item);
  }

  render() {
    return (
        <tr>
            <td><button className="col btn btn-default btn-number" onClick={() => this.removeItemFromCart()}><span className="glyphicon glyphicon-remove"></span></button></td>
            <td>{this.props.item.prodName}</td>
            <td>{this.props.item.price_per_unit}₪</td>
            <td>
                <PlusMinus minCart={1} maxCart={10}  handleQuantity={this.handleQuantity} quantity={this.props.item.quantity}/>
            </td>
            <td>{this.props.item.quantity * this.props.item.price_per_unit}₪</td>
        </tr>
    );
  }
}

export default ItemInCart;
