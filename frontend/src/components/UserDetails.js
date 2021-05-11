import React, { Component } from 'react';
import DatePicker from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css'
const today = moment();
const disablePastDt = current => {
    return current.isAfter(today);
};

class UserDetails extends Component {
    state = {isFinish: false,  isError:false,userInput:{}};

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        let userInput = {
                deliveryDate: null,
                firstName: this.props.userDetails.firstName,
                lastName: this.props.userDetails.lastName,
                address: this.props.userDetails.address,
                phone: this.props.userDetails.phone
            };
        this.setState({userInput : userInput});
    }

    finish = ()=>{
        if(this.props.isUpdate){
            this.updateDetails()
        }else{
            if(this.state.deliveryDate === null){
                this.setState({isError:true});
            }else{
                this.props.finishOrder(this.state.deliveryDate)
                this.setState({isFinish: !this.state.isFinish})
            }
        }
    }
    onDateChange = (event)=>{
        this.setState({deliveryDate:event._d, isError:false});
    }
    handleChange(event) {
        let tempUserInput = {...this.state.userInput};
        tempUserInput[event.target.name] = event.target.value;
        this.setState({userInput:tempUserInput});
    }

    updateDetails(event) {
        // service of update
    }

    render() {
        let isUpdate = this.props.isUpdate;
        return (
          <div className="row">
              {!this.state.isFinish ?
                  <div className="col margin-top-bottom">
                      {!isUpdate ? <div className="form-row">
                          <div className="form-group col-md-6">
                              <label htmlFor="date">תאריך הזמנה</label>
                              <DatePicker
                                  onChange={this.onDateChange}
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
                              <input type="text" className="form-control" id="firstName" name="firstName" onChange={this.handleChange} disabled={!isUpdate} value={this.state.userInput.firstName}/>
                          </div>
                          <div className="form-group col-md-6">
                              <label htmlFor="address">שם משפחה</label>
                              <input type="text" className="form-control" id="lastName" name="lastName" onChange={this.handleChange} disabled={!isUpdate} value={this.state.userInput.lastName}/>
                          </div>
                      </div>
                      <div className="form-row">
                          <div className="form-group col-md-6">
                              <label htmlFor="address">כתובת להזמנה</label>
                              <input type="text" className="form-control" id="address" name="address" onChange={this.handleChange} disabled={!isUpdate} value={this.state.userInput.address}/>
                          </div>
                      </div>

                      <div className="divider"/>
                      <div className="form-row">
                          <div className="form-group col-md-6">
                              <label htmlFor="id">מספר טלפון</label>
                              <input type="text" className="form-control" id="phone" name="phone" onChange={this.handleChange} disabled={!isUpdate} value={this.state.userInput.phone}/>
                          </div>
                          <div className="form-group col-md-6">
                              <label htmlFor="id">מייל</label>
                              <input type="text" className="form-control" id="mail" name="mail" disabled={true} value={this.props.userDetails.mail}/>
                          </div>
                      </div>

                              <button onClick={()=>this.finish()} className="btn btn-lg margin-top-bottom btn-danger">
                                  {isUpdate ? "עדכון" : "למעבר לתשלום באמצעות Paypal"}</button>

                  </div>
                  :
                  <div>
                      ההזמנה הושלמה בהצלחה
                  </div>

              }

          </div>
      );
    }
}

export default UserDetails;
