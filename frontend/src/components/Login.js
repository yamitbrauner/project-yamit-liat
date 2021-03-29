import React, { Component } from 'react';

class Login extends Component {
  state = {isLogin: true};

  /*constructor(props) {
      super(props);
  }*/

  render() {
    return (
        <div className="col">
            <div className="row">
                <div className="col-3"/>
                <div className="col-6 header">
                        <div className="row">
                            <div className="col">
                                {this.state.isLogin ?
                                    <div className="margin-top-bottom">
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label htmlFor="name">מייל</label>
                                                <input type="text" className="form-control" id="name" placeholder="אנא הזן מייל"/>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label htmlFor="address">סיסמא</label>
                                                <input type="password" className="form-control" id="address" placeholder="אנא הזן סיסמא"/>
                                            </div>
                                        </div>
                                        <div className="divider"/>

                                        <button onClick={()=>this.finishOrder()} className="btn btn-primary">סיום</button>
                                    </div>
                                    :
                                    <div>
                                        ההזמנה הושלמה בהצלחה
                                    </div>

                                }

                            </div>                        </div>
                    </div>
                <div className="col-3"/>




            </div>
        </div>
    );
  }
}

export default Login;
