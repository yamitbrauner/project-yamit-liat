import React, { Component } from 'react';
import DatePicker from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css'
const today = moment();
const disablePastDt = current => {
    return current.isAfter(today);
};

class UserDetails extends Component {
    state = {isFinish: false}

    finishOrder = ()=>{
        this.setState({isFinish: !this.state.isFinish})
    }

  render() {
    var dt = null;
      return (
        <div className="row">
            {!this.state.isFinish ?
                <div className="col margin-top-bottom">
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="date">תאריך הזמנה</label>
                            <DatePicker
                                class="form-control"
                                isValidDate={disablePastDt}
                                value={dt}
                                dateFormat="DD/MM/YYYY"
                                timeFormat={false}
                            />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="name">שם מלא</label>
                            <input type="text" className="form-control" id="name" disabled={true} value={this.props.userDetails.firstName + " " + this.props.userDetails.lastName}/>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="address">כתובת להזמנה</label>
                            <input type="text" className="form-control" id="address" disabled={true} value={this.props.userDetails.address}/>
                        </div>
                    </div>

                    <div className="divider"/>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="id">מספר טלפון</label>
                            <input type="text" className="form-control" id="phone" disabled={true} value={this.props.userDetails.phone}/>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="id">מייל</label>
                            <input type="text" className="form-control" id="mail" disabled={true} value={this.props.userDetails.mail}/>
                        </div>
                    </div>
                    <button onClick={()=>this.finishOrder()} className="btn btn-lg margin-top-bottom btn-danger">למעבר לתשלום באמצעות Paypal</button>
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
