import React, { Component } from 'react';
import PlusMinus from "./PlusMinus";

class ItemInCart extends Component {


  handleQuantity=(num)=>{
      this.props.handleUpdateQuantity(this.props.itemIndex,num);
  }


  render() {
    return (
        <div className="col">
            <div className="row margin-top-bottom">
                                <span className="col">
                                    {this.props.item.prod_name}
                                </span>
                <span className="col">
                                    {this.props.item.quantity * this.props.item.price_per_unit}₪
                </span>
                <span className="col">
                    <button className="col btn btn-default btn-number" onClick={() => this.handleQuantity(0)}><span className="glyphicon glyphicon-remove"></span></button>
                </span>
            </div>
            <div className="row">
                <PlusMinus minCart={1} maxCart={10}  handleQuantity={this.handleQuantity} quantity={this.props.item.quantity}/>
            </div>

        </div>

    );
  }
}

export default ItemInCart;
