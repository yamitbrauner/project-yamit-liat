import React, { Component } from 'react';

class PlusMinus extends Component {

  constructor(props) {
      super(props);
      this.minusClicked = this.minusClicked.bind(this);
      this.plusClicked = this.plusClicked.bind(this);
  }
  plusClicked = ()=>{
      this.props.handleQuantity(this.props.quantity+1);
  }
  minusClicked = ()=>{
      this.props.handleQuantity(this.props.quantity-1);

  }

  render() {
    return (
        <div className="col margin-top-bottom">
            <div className="row">
                <button className="col btn btn-default btn-number" onClick={() => this.minusClicked()} disabled={this.props.quantity === this.props.minCart}><span className="glyphicon glyphicon-minus"></span></button>
                <input type="text" name="quantity" className="col form-control input-number input-to-cart" value={this.props.quantity} min={this.props.minCart} max={this.props.maxCart} readOnly={true}/>
                <button type="button" className="col btn btn-default btn-number" onClick={() => this.plusClicked()} disabled={this.props.quantity === this.props.maxCart}><span className="glyphicon glyphicon-plus"></span></button>
            </div>
        </div>
    );
  }
}

export default PlusMinus;
