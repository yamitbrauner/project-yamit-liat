import React, { Component } from 'react';

class Cart extends Component {

    constructor(props) {
        super(props);
    }
;

  render() {
    return (
        <div className="col cart">
            <div className="row cart-title"><span className="col cart-title-text">סיכום הזמנה</span></div>
            <div className="divider row margin-top-bottom"/>
            <div className="row">
                <div className="col">
                    {this.props.itemsInCart.map(item =>{
                        return item.quantity >0 ?
                            <div className="row margin-top-bottom">
                                {item.prod_name} {item.quantity}
                            </div> : ''
                    })}
                </div>
            </div>
        </div>
    );
  }
}

export default Cart;
