import React, { Component } from 'react';

class Product extends Component {

    handleUpdateCart = ()=>{
        this.props.handleCart(this.props.productToShow.itemIndex, this.props.productToShow.item);
    }

  render() {
      let item = this.props.productToShow.item;
      let inCart = this.props.itemsInCart[item.prodId] && this.props.itemsInCart[item.prodId].quantity >0;
      return (
        <div className="col box login-box">
                        <div className="row">
                            <div className="col">
                                <div className="margin-top-bottom row">
                                    <h1 className="col">{item.prodName}</h1>
                                </div>
                                <div className="row">
                                    <span className="col product-popup-txt">{item.description}</span>
                                </div>
                                <div className="divider margin-top-bottom"/>
                                <div className="row">
                                    <span className="col product-popup-txt">מחיר ליחידה : ₪{item.pricePerUnit} </span>
                                </div>
                                <div className="divider margin-top-bottom"/>
                                <button className="btn-default btn-danger btn margin-top-bottom" onClick={this.handleUpdateCart}>
                                    <span className="add-to-cart">{inCart ? "הסרה מהסל": "הוספה לסל"}</span>
                                </button>
                            </div>
                            <div className="col">
                                <img alt="" className="product-popup-img row"
                                     src={"/public/getImage?name=" + item.picUrl+"&&category="+item.categoryId}/>
                            </div>
                        </div>
                    </div>
    );
  }
}

export default Product;
