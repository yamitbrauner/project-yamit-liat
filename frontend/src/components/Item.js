import React, { Component } from 'react';
import PlusMinus from "./PlusMinus";

class Item extends Component {
  state = {quantity:0, inCart:false};

    handleQuantity=(num)=>{
        this.setState({quantity:num});
    }

  handleUpdateCart = ()=>{
      this.setState({inCart : this.state.quantity > 0});
      this.props.onAddToCart(this.props.itemIndex, this.state.quantity);
  }

  render() {
    return (
        <div className="col item box">
            <div className="row">
                <div className="col">
                    <img alt="" className="margin-top-bottom img-thumbnail img-fluid" src={this.props.item.pic_url}/>
                </div>
                <div className="product-box col-6">
                    <div className="product-name margin-top-bottom">
                        {this.props.item.prod_name} {this.props.item.price_per_unit}₪
                    </div>
                </div>
                <div className="col margin-top-bottom">
                   <PlusMinus minCart={0} maxCart={10} handleQuantity={this.handleQuantity} quantity={this.state.quantity}/>
                    <div className="row">
                        <div className="col">
                            <button className="btn-default btn margin-top-bottom" onClick={this.handleUpdateCart}>
                                <span className="category-name">{this.state.inCart ? "עדכון": "הוספה לסל"}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default Item;
