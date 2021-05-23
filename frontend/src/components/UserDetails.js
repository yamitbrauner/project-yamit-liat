import React, { Component } from 'react';
import DatePicker from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css'
const today = moment();
const disablePastDt = current => {
    return current.isAfter(today);
};

class UserDetails extends Component {
    state = {isError:false,userInput:{}};

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        let userInput = {
                firstName: this.props.userDetails.firstName,
                lastName: this.props.userDetails.lastName,
                address: this.props.userDetails.address,
                phone: this.props.userDetails.phone,
                deliveryDate: today.add('1','days')

            };
        this.setState({userInput : userInput});
    }

    finish = ()=>{
        if(this.props.isUpdate){
            this.updateDetails()
        }else{
            if(this.state.userInput.deliveryDate === null){
                this.setState({isError:true});
            }else{
                this.props.finishOrder(this.state.userInput);
            }
        }
    }
    handleChange(event) {
        if(event){
            let tempUserInput = {...this.state.userInput};
            if(event._d){
                tempUserInput["deliveryDate"] = event._d;
            }else{
                tempUserInput[event.target.name] = event.target.value;
            }
            this.setState({userInput:tempUserInput,isError:false});
        }
    }

    updateDetails() {
        if(Object.keys(this.props.userDetails).length > 0){
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.state.userInput)
            };
            fetch("/users/"+this.props.userDetails.userId,requestOptions)
                .then(
                    (res) => {
                        if(res.ok){
                            alert("נשמר בהצלחה")
                        }
                    }
                )
        }else{
            this.props.signUp(this.state.userInput);
        }
    }

    render() {
        let isUpdate = this.props.isUpdate;
        return (
          <div className="row">
                  <div className="col margin-top-bottom">
                      {!isUpdate ? <div className="form-row">
                          <div className="form-group col-md-6">
                              <label htmlFor="date">תאריך הזמנה</label>
                              <DatePicker
                                  onChange={this.handleChange}
                                  class="form-control"
                                  isValidDate={disablePastDt}
                                  value={this.state.userInput.deliveryDate}
                                  dateFormat="DD/MM/YYYY"
                                  timeFormat={false}
                              />
                              {this.state.isError ? <span className="error-txt">יש למלא תאריך הזמנה</span> : ""}
                          </div>
                      </div> : ""}

                      <div className="form-row">
                          <div className="form-group col-md-6">
                              <label htmlFor="name">שם פרטי</label>
                              <input type="text" className="form-control" id="firstName" name="firstName" placeholder="אנא הזן שם פרטי"
                                     onChange={this.handleChange} disabled={!isUpdate} value={this.state.userInput.firstName}/>
                          </div>
                          <div className="form-group col-md-6">
                              <label htmlFor="address">שם משפחה</label>
                              <input type="text" className="form-control" id="lastName" name="lastName" placeholder="אנא הזן שם משפחה"
                                     onChange={this.handleChange} disabled={!isUpdate} value={this.state.userInput.lastName}/>
                          </div>
                      </div>
                      <div className="divider"/>
                      <div className="form-row">
                          <div className="form-group col-md-6">
                              <label htmlFor="address">כתובת להזמנה</label>
                              <input type="text" className="form-control" id="address" name="address"  placeholder="אנא הזן כתובת"
                                     onChange={this.handleChange} disabled={!isUpdate} value={this.state.userInput.address}/>
                          </div>
                          <div className="form-group col-md-6">
                              <label htmlFor="id">מספר טלפון</label>
                              <input type="text" className="form-control" id="phone" name="phone"  placeholder="אנא הזן טלפון"
                                     onChange={this.handleChange} disabled={!isUpdate} value={this.state.userInput.phone}/>
                          </div>
                      </div>

                              <button onClick={()=>this.finish()} className="btn btn-lg margin-top-bottom btn-danger">
                                  {isUpdate ? "שמירה" : "למעבר לתשלום באמצעות Paypal"}</button>

                  </div>

          </div>
      );
    }
}

export default UserDetails;
