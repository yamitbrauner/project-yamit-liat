import React, { Component } from 'react';

class Item extends Component {
  state = {};
  constructor(props) {
      super(props);
  }

  render() {
    return (
        <div className="col">
            <div className="row">
                <div className="col">
                    <img className="img-thumbnail img-fluid" src={this.props.item.pic_url}/>
                </div>
                <div className="product-box col-6">
                    <div className="row product-name">
                        {this.props.item.prod_name} {this.props.item.price_per_unit}₪
                    </div>
                </div>
                <div className="col">
                     <button className="btn">הוספה לסל</button>
                </div>
            </div>
            <div className="divider row margin-top-bottom"/>
        </div>
    );
  }
}

export default Item;
