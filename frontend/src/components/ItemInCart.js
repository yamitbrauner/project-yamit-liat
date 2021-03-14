import React, { Component } from 'react';
import PlusMinus from "./PlusMinus";

class ItemInCart extends Component {

  constructor(props) {
      super(props);
  }

  handleQuantity=(num)=>{
      this.props.handleUpdateQuantity(this.props.itemIndex,num);
  }

  handleUpdateCart = ()=>{
      this.setState({inCart : this.state.quantity > 0});
      this.props.onAddToCart(this.props.itemIndex, this.state.quantity);
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
            </div>
            <div className="row">
                <PlusMinus minCart={1} maxCart={10}  handleQuantity={this.handleQuantity} quantity={this.props.item.quantity}/>
                <div className="col">
                    <button className="btn-default btn margin-top-bottom" onClick={this.handleUpdateCart}>
                        <span className="category-name">עדכון</span>
                    </button>
                </div>
            </div>

        </div>

    );
  }
}

export default ItemInCart;
