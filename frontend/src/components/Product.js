import React, { Component } from 'react';

class Product extends Component {

    handleUpdateCart = ()=>{
        this.props.handleCart(this.props.itemIndex, this.props.item);
    }

  render() {
      var inCart = this.props.itemsInCart[this.props.item.prodId] && this.props.itemsInCart[this.props.item.prodId].quantity >0;
      return (
        <div className="col box login-box">
                        <div className="row">
                            <div className="col-1">
                                <div className="line one" onClick={()=>this.props.close()}/>
                                <div className="line two" onClick={()=>this.props.close()}/>
                            </div>
                            <div className="col">
                                <div className="margin-top-bottom row">
                                    <h1 className="col">{this.props.item.prodName}</h1>
                                </div>
                                <div className="row">
                                    <span className="col product-popup-txt">{this.props.item.description}</span>
                                </div>
                                <div className="divider margin-top-bottom"/>
                                <div className="row">
                                    <span className="col product-popup-txt">מחיר ליחידה : ₪{this.props.item.pricePerUnit} </span>
                                </div>
                                <div className="divider margin-top-bottom"/>
                                <button className="btn-default btn-danger btn margin-top-bottom" onClick={this.handleUpdateCart}>
                                    <span className="add-to-cart">{inCart ? "הסרה מהסל": "הוספה לסל"}</span>
                                </button>
                            </div>
                            <div className="col">
                                <img alt="" className="product-popup-img row"
                                     src={"http://localhost:8080/image?name=" + this.props.item.picUrl+"&&category="+this.props.item.categoryId}/>
                            </div>
                        </div>
                    </div>
    );
  }
}

export default Product;
