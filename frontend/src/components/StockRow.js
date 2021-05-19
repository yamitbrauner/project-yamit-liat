import React, { Component } from 'react';

class StockRow extends Component {

    state = {editMode : false};
    constructor(props) {
        super(props);
        this.state = {prodId:'', quantityInStock: '' ,pricePerUnit: '',  description: ''};
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onOkClicked = this.onOkClicked.bind(this);
    }
    componentDidMount() {
       this.resetValues();
    }
    componentWillReceiveProps(nextProps) {
        // You don't have to do this check first, but it can help prevent an unneeded render
        if (nextProps.item.prodId !== this.state.prodId) {
            this.setState(
                {prodId: nextProps.item.prodId,
                    quantityInStock: nextProps.quantityInStock,
                    pricePerUnit: nextProps.item.pricePerUnit,
                    description: nextProps.item.description});
        }
    }

    resetValues=()=>{
        this.setState(
            {prodId: this.props.item.prodId,
                quantityInStock: this.props.item.quantityInStock,
                pricePerUnit: this.props.item.pricePerUnit,
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
                <td>{this.props.item.prodId}</td>
                <td>{this.props.categories[this.props.item.categoryId]}</td>
                <td>{this.props.item.prodName}</td>
                <td>{this.state.editMode ?
                    <input type="text" className="stock-input" name="quantityInStock" value={this.state.quantityInStock} onChange={this.handleInputChange}/> :
                    this.state.quantityInStock}
                </td>
                <td>{this.state.editMode ?
                    <input type="text" className="stock-input" name="pricePerUnit" value={this.state.pricePerUnit} onChange={this.handleInputChange}/> :
                    this.state.pricePerUnit + "₪"}
                </td>
                <td>{this.state.editMode ?
                    <textarea className="" name="description" value={this.state.description} onChange={this.handleInputChange}/> :
                    this.state.description} </td>
    </tr>);
  }
}

export default StockRow;
