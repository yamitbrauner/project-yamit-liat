import React, { Component } from 'react';

class NewProduct extends Component {

    constructor(props) {
        super(props);
        this.state = {
            hasEditIndex:'false',
            prodId:'',
            categoryId:'',
            prodName:'',
            quantityInStock: '' ,
            pricePerUnit: '',
            description: '',
            picUrl:'',
            isError:false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onOkClicked = this.onOkClicked.bind(this);
    }
    componentDidMount() {
        let item = this.props.hasEditIndex!== false ? this.props.items[this.props.hasEditIndex] : {};
        this.setState(
            {
                hasEditIndex: this.props.hasEditIndex,
                prodId: item.prodId ? item.prodId : '',
                categoryId: item.categoryId ? item.categoryId : '',
                prodName: item.prodName ? item.prodName : '',
                quantityInStock: item.quantityInStock ? item.quantityInStock : '',
                pricePerUnit: item.pricePerUnit? item.pricePerUnit: '',
                picUrl: item.picUrl? item.picUrl: '',
                description: item.description ? item.description : ''});
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
        // eslint-disable-next-line
        if(this.state.categoryId =='' || this.state.prodName =='' || this.state.quantityInStock ==''
            || this.state.pricePerUnit =='' || this.state.description ==''|| this.state.picUrl ==''){
            this.setState({isError:true});
        }else{
            let item = this.props.hasEditIndex!== false ? this.props.items[this.props.hasEditIndex] : {};
            if(item.picUrl !== this.state.picUrl){
                const formData = new FormData();
                formData.append("multipartImage",this.state.picUrl);
                const requestOptions = {
                    method: 'POST',
                    body: formData,
                    redirect: 'follow'
                };
                fetch("/saveImage?category="+this.state.categoryId,requestOptions)
                    .then(res => {
                        if(res.ok) {
                            this.props.onOkClicked(this.state);
                        }
                    })
                    .catch((error)=>{
                        this.props.showPopup(4);
                    })
            }else{
                this.props.onOkClicked(this.state);
            }
        }
    }

  render() {
    return (
        <div className="col add-product margin-top-bottom">
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="categoryId">קטגוריה</label>

                    <select className="form-control" name="categoryId" id="categoryId" placeholder="אנא בחר קטגוריה" onChange={this.handleInputChange}>
                        {Object.keys(this.props.categories).map((key)=>{
                            return <option key={key} value={key}>{this.props.categories[key]}</option>
                        })})
                    </select>
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="address">שם מוצר</label>
                    <input type="text" className="form-control" id="prodName" name="prodName" placeholder="אנא הזן שם מוצר"
                           onChange={this.handleInputChange} value={this.state.prodName}/>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="categoryId">כמות במלאי</label>
                    <input type="text" className="form-control" name="quantityInStock" placeholder="כמות"
                           onChange={this.handleInputChange} value={this.state.quantityInStock}/>
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="address">מחיר</label>
                    <input type="text" className="form-control" name="pricePerUnit" placeholder="מחיר"
                           onChange={this.handleInputChange} value={this.state.pricePerUnit}/>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-md">
                    <label htmlFor="address">תיאור</label>
                    <textarea className="form-control" name="description" placeholder="תיאור"
                              onChange={this.handleInputChange} value={this.state.description}/>
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
            {this.state.isError && <div className="form-row">
                <div className="col error-txt">אנא הזן את כל הפרטים</div>
            </div>}
            <div className="form-row">
                <div className="form-group col-md-12">
                    <button className="btn btn-danger btn-save" onClick={()=>this.onOkClicked()}>שמור</button>
                    <button className="btn btn-danger" onClick={()=>this.props.cancelAdd(false,false)}>ביטול</button>
                </div>
            </div>
        </div>


        );
  }
}

export default NewProduct;
