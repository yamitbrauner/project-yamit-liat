import React, { Component } from 'react';

class Login extends Component {

    state = {isLoginPage: true, loginInput:{} };

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    switchPage = (val)=>{
        this.setState({isLoginPage: val});
    }
    handleLog = ()=>{
        this.props.handleLog(this.state.loginInput);
    }
    handleChange(event) {
        var tempLoginInput = {...this.state.loginInput};
        tempLoginInput[event.target.name] = event.target.value;
        this.setState({loginInput:tempLoginInput});
    }

  render() {
    return (
        <div className="col box login-box">

                        <div className="row">
                            <div className="col">
                                    <div className="margin-top-bottom">
                                        <div className="form-row">
                                            <span className="title col">

                                            {this.state.isLoginPage? "התחברות" : "הרשמה"}
                                            </span>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col">
                                                <label htmlFor="name">מייל</label>
                                                <input type="text" className="form-control" id="username" name="username" placeholder="אנא הזן מייל" value={this.state.loginInput.username} onChange={this.handleChange}/>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col">
                                                <label htmlFor="password">סיסמא</label>
                                                <input type="password" className="form-control" id="password" name="password" placeholder="אנא הזן סיסמא" value={this.state.loginInput.password} onChange={this.handleChange}/>
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
                                            <div className="form-group switch-text col">
                                                {this.state.isLoginPage ?
                                                <div onClick={()=>this.switchPage(false)}>משתמש חדש ? להרשמה לחץ כאן</div>
                                                    :
                                                <div onClick={()=>this.switchPage(true)}>משתמש קיים? להתחברות לחץ כאן</div>
                                                }
                                            </div>
                                        </div>
                                        <button onClick={()=>this.handleLog()} className="btn btn-primary">סיום</button>
                                    </div>
                            </div>
                        </div>
                    </div>
    );
  }
}

export default Login;
