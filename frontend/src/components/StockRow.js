import React, { Component } from 'react';

class StockRow extends Component {

    state = {editMode : false};
    constructor(props) {
        super(props);
    }
    switchEditMode = ()=>{
        this.setState({ editMode: !this.state.editMode});
    }
    onOkClicked = ()=>{
        this.props.onOkClicked();
    }


  render() {
    return (<tr>
                <td>
                    <button className="col btn btn-default btn-number" onClick={() => this.delete(this.props.item)}>
                        {this.state.editMode ?<span className="glyphicon glyphicon-remove"></span>
                            : <span className="glyphicon glyphicon-trash"></span>}
                    </button>
                </td>
                <td>
                    <button className="col btn btn-default btn-number" onClick={() => this.switchEditMode()}>
                        {this.state.editMode ?<span onClick={()=>this.onOkClicked} className="glyphicon glyphicon-ok"></span>
                        : <span className="glyphicon glyphicon-pencil"></span>}
                    </button>
                </td>
                <td>{this.props.item.product_id}</td>
                <td>{this.props.item.category_id}</td>
                <td>{this.props.item.prod_name}</td>
                <td>{this.props.item.quantity_ordered}</td>
                <td>{this.state.editMode ? <input type="text" className="stock-input" value={this.props.item.quantity_in_stock}/> :this.props.item.quantity_in_stock}</td>
                <td>{this.state.editMode ? <input type="text" className="stock-input" value={this.props.item.price_per_unit}/> :this.props.item.price_per_unit + "₪"} </td>
                <td>{this.state.editMode ? <textarea className="" value={this.props.item.description}/> :this.props.item.description} </td>
                <td>
                    <img alt="" className="margin-top-bottom img-thumbnail img-fluid" src={this.props.item.pic_url}/>
                </td>
    </tr>);
  }
}

export default StockRow;
