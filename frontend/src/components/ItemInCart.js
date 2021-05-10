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
            {this.props.isEditable && <td><button className="col btn btn-default btn-number" onClick={() => this.removeItemFromCart()}><span className="glyphicon glyphicon-remove"/></button></td>}
            <td>{this.props.item.prodName}</td>
            <td>{this.props.item.pricePerUnit}₪</td>
            <td>
                { this.props.isEditable ?
                    <PlusMinus minCart={1} maxCart={this.props.item.quantityInStock}  handleQuantity={this.handleQuantity} quantity={this.props.item.quantity}/>
                    :
                    <div>{this.props.item.quantity}</div>
                }
            </td>
            <td>{this.props.item.quantity * this.props.item.pricePerUnit}₪</td>
        </tr>
    );
  }
}

export default ItemInCart;
