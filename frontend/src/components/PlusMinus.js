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
        <div className="col">
            <div className="row">
                <span className="glyphicon glyphicon-minus glyphicon-size glyphicon-minus-align"  onClick={() => this.minusClicked()}/>
                <span className="input-to-cart">
                    {this.props.quantity}
                </span>

                { this.props.quantity < this.props.maxCart && <span className="glyphicon glyphicon-plus glyphicon-size glyphicon-plus-align" onClick={() => this.plusClicked()}/>}
            </div>
        </div>
    );
  }
}

export default PlusMinus;
