import React, { Component } from 'react';
import UserDetails from "./UserDetails";

class Login extends Component {

    state = {isLoginPage: true, loginInput:{} };

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    switchPage = (val)=>{
        this.setState({isLoginPage: val});
    }
    handleLog = (userInput)=>{
        var tempLoginInput = {...this.state.loginInput, ...userInput};
        this.setState({loginInput : tempLoginInput}, ()=>this.props.handleLog(this.state.loginInput, this.state.isLoginPage));
    }
    handleChange(event) {
        let tempLoginInput = {...this.state.loginInput};
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
                                                <input type="text" className="form-control" id="mail" name="mail" placeholder="אנא הזן מייל" value={this.state.loginInput.mail} onChange={this.handleChange}/>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col">
                                                <label htmlFor="password">סיסמא</label>
                                                <input type="password" className="form-control" id="password" name="password" placeholder="אנא הזן סיסמא" value={this.state.loginInput.password} onChange={this.handleChange}/>
                                            </div>
                                        </div>
                                        {!this.state.isLoginPage?
                                            <UserDetails userDetails={this.props.userDetails} signUp={this.handleLog} isUpdate={true}/>
                                        :""
                                        }



                                        <div className="form-row">
                                            <div className="form-group switch-text col">
                                                {this.state.isLoginPage ?
                                                    <div>
                                                        <button onClick={()=>this.handleLog()} className="btn btn-danger ">סיום</button>
                                                        <div className="margin-top-bottom" onClick={()=>this.switchPage(false)}>משתמש חדש ? להרשמה לחץ כאן</div>
                                                    </div>
                                                    :
                                                <div onClick={()=>this.switchPage(true)}>משתמש קיים? להתחברות לחץ כאן</div>
                                                }
                                            </div>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
    );
  }
}

export default Login;
