import React, { Component } from 'react';
var MAX_CART = 10;
var MIN_CART = 0;

class Item extends Component {
  state = {quantity:MIN_CART, inCart:false};
  constructor(props) {
      super(props);
      this.minusClicked = this.minusClicked.bind(this);
      this.plusClicked = this.plusClicked.bind(this);
  }
  plusClicked = ()=>{
      if(this.state.quantity < MAX_CART){
          this.setState({quantity: this.state.quantity + 1});
      }
  }
  minusClicked = ()=>{
      if(this.state.quantity > MIN_CART){
          this.setState({quantity: this.state.quantity - 1});
      }
  }
  handleUpdateCart = ()=>{
      this.setState({inCart : this.state.quantity > MIN_CART});
      this.props.onAddToCart(this.props.itemIndex, this.state.quantity);
  }

  render() {
    return (
        <div className="col item">
            <div className="row">
                <div className="col">
                    <img className="img-thumbnail img-fluid" src={this.props.item.pic_url}/>
                </div>
                <div className="product-box col-6">
                    <div className="product-name margin-top-bottom">
                        {this.props.item.prod_name} {this.props.item.price_per_unit}₪
                    </div>
                </div>
                <div className="col margin-top-bottom">
                    <div className="row">
                        <button className="col btn btn-default btn-number" onClick={() => this.minusClicked()} disabled={this.state.quantity === MIN_CART}>
                            <span className="glyphicon glyphicon-minus"></span>
                        </button>
                        <input type="text" name="quantity" className="col form-control input-number input-to-cart" defaultValue="1" value={this.state.quantity} min={MIN_CART} max={MAX_CART} readonly={true}/>
                        <button type="button" className="col btn btn-default btn-number" onClick={() => this.plusClicked()} disabled={this.state.quantity === MAX_CART}>
                            <span className="glyphicon glyphicon-plus"></span>
                        </button>

                    </div>
                    <div className="row">
                        <div className="col">
                            <button className="btn-default btn margin-top-bottom" onClick={this.handleUpdateCart}>
                                <span>{this.state.inCart ? "עדכון": "הוספה לסל"}</span>
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
