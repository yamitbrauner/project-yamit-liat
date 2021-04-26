import React, { Component } from 'react';

class Login extends Component {
  state = {isLoginPage: true};

    switchPage = (val)=>{
        this.setState({isLoginPage: val});
    }
    finish = ()=>{
        this.props.handleLog(true);
        this.props.onSelectPage(1);
    }

  render() {
    return (
        <div className="col">
            <div className="row">
                <div className="col-3"/>
                <div className="col-6 box">

                        <div className="row">
                            <div className="col">
                                    <div className="margin-top-bottom">
                                        <div className="form-row">
                                            <span className="title col">

                                            {this.state.isLoginPage? "התחברות" : "הרשמה"}
                                            </span>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label htmlFor="name">מייל</label>
                                                <input type="text" className="form-control" id="name" placeholder="אנא הזן מייל"/>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label htmlFor="password">סיסמא</label>
                                                <input type="password" className="form-control" id="password" placeholder="אנא הזן סיסמא"/>
                                            </div>
                                        </div>
                                        {!this.state.isLoginPage?
                                        <>
                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="privateName">שם פרטי</label>
                                                    <input type="text" className="form-control" id="privateName" placeholder="אנא הזן שם פרטי"/>
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="lastName">שם משפחה</label>
                                                    <input type="text" className="form-control" id="lastName" placeholder="אנא הזן שם משפחה"/>
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="address">כתובת</label>
                                                    <input type="text" className="form-control" id="address" placeholder="אנא הזן כתובת"/>
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="phone">טלפון</label>
                                                    <input type="text" className="form-control" id="phone" placeholder="אנא הזן טלפון"/>
                                                </div>
                                            </div>
                                        </>

                                        :""
                                        }



                                        <div className="form-row">
                                            <div className="form-group switch-text col-md-6">
                                                {this.state.isLoginPage ?
                                                <div onClick={()=>this.switchPage(false)}>משתמש חדש ? להרשמה לחץ כאן</div>
                                                    :
                                                <div onClick={()=>this.switchPage(true)}>משתמש קיים? להתחברות לחץ כאן</div>
                                                }
                                            </div>
                                        </div>
                                        <button onClick={()=>this.finish()} className="btn btn-primary">סיום</button>
                                    </div>
                            </div>
                        </div>
                    </div>
                <div className="col-3"/>
            </div>
        </div>
    );
  }
}

export default Login;
