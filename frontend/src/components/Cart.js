import React, { Component } from 'react';

class Cart extends Component {

    constructor(props) {
        super(props);
        this.selectCategory = this.selectCategory.bind(this);
    }

    selectCategory = (category) => {
        this.props.onSelectCategory(category);
    };

  render() {
    return (
        <div className="col cart">
            <div className="row cart-title"><span className="col cart-title-text">סיכום הזמנה</span></div>
            <div className="divider row margin-top-bottom"/>
            <div className="row">
                {
                    this.props.itemsInCart.length>0 ?
                        <span> פריטים בעגלה</span>
                        :
                <span className="col empty-cart margin-top-bottom">
                העגלה ריקה
                </span>
                }
            </div>
        </div>
    );
  }
}

export default Cart;
