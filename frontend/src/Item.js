import React, { Component } from 'react';

class Item extends Component {
  state = {};
  constructor(props) {
      super(props);
  }

  render() {
    return (
        <div className="product">
            <img className="product-img" src={this.props.item.pic_url}/>
            <div className="product-box">
               <span className="product-name">{this.props.item.prod_name}</span>
               <span>{this.props.item.price_per_unit}₪</span>
            </div>

        </div>
    );
  }
}

export default Item;
