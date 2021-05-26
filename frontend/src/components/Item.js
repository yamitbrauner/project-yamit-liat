import React, { Component } from 'react';

class Item extends Component {

  handleUpdateCart = ()=>{
      this.props.handleCart(this.props.itemIndex);
  }
  showProduct=()=>{
    this.props.showProduct(this.props.itemIndex);
  }

  render() {
      let inCart = this.props.itemsInCart[this.props.item.prodId] && this.props.itemsInCart[this.props.item.prodId].quantity >0;
            return (
        <div className="col-3">
            <div className="row">
                <img alt="" className="item-img col" onClick={()=>this.showProduct()}
                     src={"/image?name=" + this.props.item.picUrl+"&&category="+this.props.item.categoryId}/>
            </div>
            <div className="row margin-top-bottom">
                <span className="col product-name">
                {this.props.item.prodName} {this.props.item.pricePerUnit}₪
                </span>
            </div>
                <div className="row margin-top-bottom">
                    <div className="col">
                        <button className="btn-default btn-danger btn margin-top-bottom" onClick={this.handleUpdateCart}>
                            <span className="add-to-cart">{inCart ? "הסרה מהסל": "הוספה לסל"}</span>
                        </button>
                    </div>
                </div>
        </div>
    );
  }
}

export default Item;
