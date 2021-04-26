import React, { Component } from 'react';

class Payment extends Component {
    state = {isFinish: false}

    finishOrder = ()=>{
        this.setState({isFinish: !this.state.isFinish})
    }

  render() {
    return (
        <div className="col payment box">
            {!this.state.isFinish ?
                <div className="margin-top-bottom">
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="date">תאריך הזמנה</label>
                            <input type="date" className="form-control" id="date" placeholder="תאריך"/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="name">שם מלא</label>
                            <input type="text" className="form-control" id="name" placeholder="אנא הזן שם מלא"/>
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="address">כתובת</label>
                            <input type="text" className="form-control" id="address" placeholder="אנא הזן כתובת"/>
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="city">עיר</label>
                            <input type="text" className="form-control" id="city" placeholder="אנא הזן עיר"/>
                        </div>
                    </div>
                    <div className="divider"/>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <label htmlFor="id">מספר תז</label>
                            <input type="text" className="form-control" id="id" placeholder="אנא הזן מספר תעודת זהות"/>
                        </div>
                    </div>
                    <button onClick={()=>this.finishOrder()} className="btn btn-primary">למעבר לתשלום באמצעות Paypal</button>
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

export default Payment;
