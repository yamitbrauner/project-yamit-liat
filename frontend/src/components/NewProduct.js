import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/DropdownButton'

class NewProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            prodId:'',
            categoryId:'',
            prodName:'',
            quantityInStock: '' ,
            pricePerUnit: '',
            description: '',
            picUrl:''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onOkClicked = this.onOkClicked.bind(this);
    }

    cancelAdd = ()=>{
        this.setState({
            prodId:'',
            categoryId:'',
            prodName:'',
            quantityInStock: '' ,
            pricePerUnit: '',
            description: '',
            picUrl:''
        })
        this.props.cancelAdd();
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        let value = '';
        if(event.target.files && event.target.files.length){
            value = event.target.files[0];
        }else{
            value = event.target.value;
        }
        this.setState({
            [name]: value
        });
    }
    onOkClicked = ()=>{
        const formData = new FormData();
        formData.append("multipartImage",this.state.picUrl);
        const requestOptions = {
            method: 'POST',
            body: formData,
            redirect: 'follow'
        };
        fetch("/saveImage?category="+this.state.categoryId,requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
        this.props.onOkClicked(-1, this.state);
    }


  render() {
    return (
        <div className="col add-product">
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="categoryId">קטגוריה</label>
                    <input type="text" className="form-control" id="categoryId" name="categoryId" placeholder="אנא הזן מס' קטגוריה"
                           onChange={this.handleInputChange}/>
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="address">שם מוצר</label>
                    <input type="text" className="form-control" id="prodName" name="prodName" placeholder="אנא הזן שם מוצר"
                           onChange={this.handleInputChange}/>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="categoryId">כמות במלאי</label>
                    <input type="text" className="form-control" name="quantityInStock" onChange={this.handleInputChange} placeholder="כמות"/>
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="address">מחיר</label>
                    <input type="text" className="form-control" name="pricePerUnit" onChange={this.handleInputChange} placeholder="מחיר"/>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md">
                    <label htmlFor="address">תיאור</label>
                    <textarea className="form-control" name="description" onChange={this.handleInputChange} placeholder="תיאור"/>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-12">
                    <input type="file"
                           name="picUrl"
                           onChange={this.handleInputChange}
                    />
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-12">
                    <button className="btn btn-danger btn-save" onClick={()=>this.onOkClicked()}>שמור</button>
                    <button className="btn btn-danger" onClick={()=>this.cancelAdd()}>ביטול</button>
                </div>
            </div>
        </div>


        );
  }
}

export default NewProduct;
