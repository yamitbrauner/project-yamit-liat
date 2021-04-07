import React, { Component } from 'react';

class StockRow extends Component {

    state = {editMode : false};
    constructor(props) {
        super(props);
        this.state = {quantity_in_stock: '' ,price_per_unit: '',  description: ''};
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onOkClicked = this.onOkClicked.bind(this);
    }
    componentDidMount() {
       this.resetValues();
    }

    resetValues=()=>{
        this.setState(
            {quantity_in_stock: this.props.item.quantity_in_stock,
                price_per_unit: this.props.item.price_per_unit,
                description: this.props.item.description});
    }
    cancelEdit = ()=>{
        this.resetValues();
        this.switchEditMode();
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }
    switchEditMode = ()=>{
        this.setState({ editMode: !this.state.editMode});
    }
    onOkClicked = ()=>{
        this.props.onOkClicked(this.props.index, this.state);
        this.switchEditMode();
    }

    delete = ()=>{
        this.props.onDeleteClicked(this.props.index);
    }

  render() {
    return (<tr>
                <td>
                    {this.state.editMode ?
                        <button className="col btn btn-default btn-number" onClick={() => this.cancelEdit()}><span className="glyphicon glyphicon-remove"/></button>
                        :
                        <button className="col btn btn-default btn-number" onClick={() => this.delete()}><span className="glyphicon glyphicon-trash"/></button>}
                </td>
                <td>
                    {this.state.editMode ?
                    <button className="col btn btn-default btn-number" onClick={() => this.onOkClicked()}><span className="glyphicon glyphicon-ok"/></button>
                    :
                    <button className="col btn btn-default btn-number" onClick={() => this.switchEditMode()}><span className="glyphicon glyphicon-pencil"/></button>
                    }
                </td>
                <td>{this.props.item.product_id}</td>
                <td>{this.props.item.category_id}</td>
                <td>{this.props.item.prod_name}</td>
                <td>{this.props.item.quantity_ordered}</td>
                <td>{this.state.editMode ?
                    <input type="text" className="stock-input" name="quantity_in_stock" value={this.state.quantity_in_stock} onChange={this.handleInputChange}/> :
                    this.state.quantity_in_stock}
                </td>
                <td>{this.state.editMode ?
                    <input type="text" className="stock-input" name="price_per_unit" value={this.state.price_per_unit} onChange={this.handleInputChange}/> :
                    this.state.price_per_unit + "₪"}
                </td>
                <td>{this.state.editMode ?
                    <textarea className="" name="description" value={this.state.description} onChange={this.handleInputChange}/> :
                    this.state.description} </td>
                <td>
                    <img alt="" className="margin-top-bottom img-thumbnail img-fluid" src={this.props.item.pic_url}/>
                </td>
    </tr>);
  }
}

export default StockRow;
