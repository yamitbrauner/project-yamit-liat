import React, { Component } from 'react';

class Item extends Component {
  state = {};
  constructor(props) {
      super(props);
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
                <div className="col">
                     <button className="btn margin-top-bottom" onClick={()=>this.props.onAddToCart(this.props.item)}>
                         <span>הוספה לסל</span>
                     </button>
                </div>
            </div>
        </div>
    );
  }
}

export default Item;
