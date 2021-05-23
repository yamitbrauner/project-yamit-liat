import React, { Component } from 'react';

class StockRow extends Component {

    switchEditMode = ()=>{
        this.props.switchProductBox(true,this.props.index);
    }

    delete = ()=>{
        this.props.onDeleteClicked(this.props.index);
    }

  render() {
    return (<tr>
                <td>
                    <button className="col btn btn-default btn-number" disabled={this.props.productBoxOpen} onClick={() => this.delete()}><span className="glyphicon glyphicon-trash"/></button>
                </td>
                <td>
                    <button className="col btn btn-default btn-number" disabled={this.props.productBoxOpen} onClick={() => this.switchEditMode()}><span className="glyphicon glyphicon-pencil"/></button>
                </td>
                <td>{this.props.item.prodId}</td>
                <td>{this.props.categories[this.props.item.categoryId]}</td>
                <td>{this.props.item.prodName}</td>
                <td>{this.props.item.quantityInStock}</td>
                <td>{this.props.item.pricePerUnit + "₪"}</td>
                <td>{this.props.item.description}</td>
    </tr>);
  }
}

export default StockRow;
