import React, { Component } from 'react';
import UserDetails from "./UserDetails";

class Login extends Component {

    state = {isLoginPage: true, loginInput:{mail:'', password:''}, isError:false};

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    switchPage = (val)=>{
        this.setState({isLoginPage: val});
    }
    goToFunction = (userInput, isLogin) =>{
        if(isLogin){
            this.loginUser(userInput);
        }else{
            this.signUp(userInput);
        }
    }
    signUp = (userInput)=>{
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userInput)
        };
        fetch("/createUser",requestOptions)
            .then(
                (res) => {
                    if(res.ok){
                        alert("משתמש נוצר בהצלחה")
                        this.loginUser({mail:userInput.mail, password:userInput.password});
                    }else{
                        this.setState({isError:true});
                    }
                },
                (error) =>{
                    this.setState({isError:true});
                }
            )
    }

    loginUser = (loginData)=>{
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData)
        };
        fetch("/api/services/controller/user/login",requestOptions)
            .then(res => res.json())
            .then(
                (data) => {
                    this.props.setUserDetails(data);
                    localStorage.setItem('token',data.token);
                    localStorage.setItem('userDetails',JSON.stringify(data));
                },
                (error) =>{
                    this.setState({isError:true});
                }
        )

    }

    handleLog = (userInput)=>{
        if(this.state.loginInput.mail==='' || this.state.loginInput.password===''){
            this.setState({isError:true});
        }else{
            let pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(String(this.state.loginInput.mail).toLowerCase())) {
                    this.setState({isError:true});
                    return;
                }
            let tempLoginInput = {...this.state.loginInput, ...userInput};
            this.setState({isError:false, loginInput : tempLoginInput}, ()=>this.goToFunction(this.state.loginInput, this.state.isLoginPage));
        }
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
                                        {this.state.isError && <div className="form-row">
                                            <div className="col error-txt">אנא הזן את כל הפרטים באופן תקין</div>
                                        </div>}

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
