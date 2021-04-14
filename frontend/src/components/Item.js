import React, { Component } from 'react';

class Item extends Component {

  handleUpdateCart = ()=>{
      this.props.handleCart(this.props.itemIndex);
  }

  render() {
    var inCart = this.props.itemsInCart[this.props.item.prodId] && this.props.itemsInCart[this.props.item.prodId].quantity >0;
            return (
        <div className="col item box">
            <div className="row">
                <div className="col">
                    <img alt="" className="margin-top-bottom img-thumbnail img-fluid" src={"http://localhost:8080/image?name=" + this.props.item.pic_url+"&&category="+this.props.item.categoryId}/>
                </div>
                <div className="product-box col-6">
                    <div className="product-name row margin-top-bottom">
                        {this.props.item.prodName} {this.props.item.price_per_unit}₪
                    </div>
                    <div className="product-description row">
                        {this.props.item.description}
                    </div>
                </div>
                <div className="col margin-top-bottom">
                    <div className="row">
                        <div className="col">
                            <button className="btn-default btn margin-top-bottom" onClick={this.handleUpdateCart}>
                                <span className="category-name">{inCart ? "הסרה מהסל": "הוספה לסל"}</span>
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
