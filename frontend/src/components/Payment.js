import React, { Component } from 'react';

class Payment extends Component {



  render() {
    return (
        <div className="col payment">
            <>
                <div className="row">
                    <span className="col">מועד אספקה</span>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="row">
                            <label>בחירת תאריך</label>
                        </div>
                        <div className="row">
                            <input type="date"/>
                        </div>
                    </div>
                </div>
                <div className="divider row margin-top-bottom"/>
            </>
            <>
                <div className="row">
                    <span className="col">פרטים אישיים</span>
                </div>
                <div className="row">
                    <div className="col form-group">
                        <div className="row">
                            <label>שם</label>
                        </div>
                        <div className="row">
                            <input type="text" className="form-control"/>
                        </div>
                    </div>
                    <div className="col">
                        <div className="row">
                            <label>טלפון</label>
                        </div>
                        <div className="row">
                            <input type="text"/>
                        </div>
                    </div>
                    <div className="col">
                        <div className="row">
                            <label>דוא"ל</label>
                        </div>
                        <div className="row">
                            <input type="text"/>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="row">
                            <label>רחוב</label>
                        </div>
                        <div className="row">
                            <input type="text"/>
                        </div>
                    </div>
                    <div className="col">
                        <div className="row">
                            <label>מספר</label>
                        </div>
                        <div className="row">
                            <input type="text"/>
                        </div>
                    </div>
                    <div className="col">
                        <div className="row">
                            <label>עיר</label>
                        </div>
                        <div className="row">
                            <input type="text"/>
                        </div>
                    </div>
                </div>
            </>
            <div className="divider row margin-top-bottom"/>
            <>
                <div className="row">
                    <span className="col">מידע נוסף</span>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="row">
                            <label>הערות</label>
                        </div>
                        <div className="row">
                            <textarea class="col"/>
                        </div>
                    </div>
                </div>
            </>
            <div className="divider row margin-top-bottom"/>
        </div>



    );
  }
}

export default Payment;
