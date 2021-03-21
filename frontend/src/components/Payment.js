import React, { Component } from 'react';

class Payment extends Component {



  render() {
    return (
        <div className="col payment">
            <form className="margin-top-bottom">
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
                        <label htmlFor="credit-card">מספר כרטיס אשראי</label>
                        <input type="text" className="form-control" id="credit-card" placeholder="אנא הזמן מספר כרטיס אשראי"/>
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="id">מספר תז</label>
                        <input type="text" className="form-control" id="id" placeholder="אנא הזן מספר תעודת זהות"/>
                    </div>
                </div>
                <button className="btn btn-primary">המשך לתשלום</button>
            </form>
        </div>
    );
  }
}

export default Payment;
