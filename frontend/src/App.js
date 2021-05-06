import React, { Component } from 'react';
import './App.css';
import AppHeader from './components/AppHeader';
import Main from './components/Main';
import Shop from './components/Shop';
import Login from './components/Login';
import Settings from './components/Settings';
import Error from './components/Error';
import Cart from './components/Cart';
import Payment from "./components/Payment";
import cartImg from "./cart.svg";
import settingImg from "./settings.svg";
import logoutImg from "./logout.svg";
import userImg from "./user.svg";

class App extends Component {
  state = {pageSelected:1, userDetails: {}, showCart:false,showLogin:false, itemsInCart:{} , totalPrice:0,totalItems:0};


    handlePageSelection = (pageNum) =>{
        this.setState({pageSelected : pageNum})
    }
    handleLog = (val) =>{
        if(val){
            this.loginUser(val);
        }else{
            this.setState({userDetails : {}});
        }
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
                    this.setState({userDetails : data},()=>this.showLogin());
                    localStorage.setItem('token',data.token);
                }
            )

    }

    showCart = () =>{
        this.setState({showCart : !this.state.showCart});
    }
    showLogin = () =>{
        this.setState({showLogin : !this.state.showLogin});
    }

    setItemsInCart = (tempItems) =>{
        this.setState({itemsInCart: tempItems},()=>this.updateTotalPrice());
    }
    updateTotalPrice=()=>{
        var tempTotalPrice = 0;
        var tempTotalItems = 0;
        // eslint-disable-next-line
        Object.keys(this.state.itemsInCart).map((itemKey,index) => {
            tempTotalItems = tempTotalItems + this.state.itemsInCart[itemKey].quantity;
            tempTotalPrice = tempTotalPrice + this.state.itemsInCart[itemKey].quantity * this.state.itemsInCart[itemKey].pricePerUnit;
        });
        this.setState({totalPrice: tempTotalPrice , totalItems: tempTotalItems});
    }

    switchPaymentOrItems = ()=>{
        if(Object.keys(this.state.userDetails).length === 0){
            this.showLogin();
        }else{
            this.handlePageSelection(4);
            this.showCart();
        }
    }
    removeItemFromCart=(itemToRemove)=>{
        var tempItemsInCart = {...this.props.itemsInCart};
        delete tempItemsInCart[itemToRemove.prodId];
        this.setItemsInCart(tempItemsInCart);
    }

    logout = ()=>{
        this.setState({userDetails:{}});
        localStorage.removeItem('token');
    }

  render() {
    return (
        <div className="App">
            {this.state.showCart ?
                <div className="left-cart">
                    <div className="row">
                        <Cart itemsInCart={this.state.itemsInCart} totalPrice={this.state.totalPrice} setItemsInCart={this.setItemsInCart} isEditable={true}
                            handleQuantity={this.handleQuantity} handlePay={this.switchPaymentOrItems} removeItemFromCart={this.removeItemFromCart}
                        />
                    </div>
                    <div className="modal-backdrop in" onClick={()=>this.showCart()}/>
                </div> : ""
            }
            {this.state.showLogin ?
                <div className="login-popup">
                    <div className="row">
                        <Login handleLog={this.handleLog} userDetails={this.state.userDetails}/>
                    </div>
                    <div className="modal-backdrop modal-backdrop-login in" onClick={()=>this.showLogin()}/>
                </div> : ""
            }


                <div className="container">
                    <div className="sticky-symbol">
                        <div className="symbol-cart">
                            <img title="עגלה" className="symbol-height" alt="" src={cartImg} onClick={()=>this.showCart()}/>
                            <div className="cart-count">
                                (
                                <span>{this.state.totalItems}</span>
                                )
                            </div>
                        </div>
                        <div className="symbol-cart symbol-user">
                            {Object.keys(this.state.userDetails).length === 0 ?
                                <img title="התחברות" className="symbol-height" alt="להתחברות" src={userImg} onClick={() => this.showLogin()}/>
                                :
                                <>
                                    <img title="התנתקות" className="symbol-height" alt="התנתקות" src={logoutImg} onClick={() => this.logout()}/>
                                    <img title="הגדרות" className="symbol-height" alt="הגדרות" src={settingImg} onClick={() => this.handlePageSelection(3)}/>
                                </>
                            }
                        </div>
                    </div>

                    <div className="col-xs-12">
                        <div className="row">
                            <AppHeader className="app-header" handleLog={this.handleLog} userDetails={this.state.userDetails} onSelectPage={this.handlePageSelection}/>
                        </div>
                        <div className="row margin-top-bottom">
                            {this.state.pageSelected === 0 && <Main/>}
                            {this.state.pageSelected === 1 && <Shop onSelectPage={this.handlePageSelection} setItemsInCart={this.setItemsInCart}
                                                                    itemsInCart={this.state.itemsInCart} removeItemFromCart={this.removeItemFromCart} userDetails={this.state.userDetails}/>}
                            {this.state.pageSelected === 3 && <Settings onSelectPage={this.handlePageSelection} userDetails={this.state.userDetails}/>}
                            {this.state.pageSelected === 4 && <Payment userDetails={this.state.userDetails}  itemsInCart={this.state.itemsInCart} totalPrice={this.state.totalPrice}
                                                                       onSelectPage={this.handlePageSelection}/>}
                            {this.state.pageSelected === 404 && <Error/>}
                        </div>
                    </div>
                </div>



        </div>
    );
  }
}

export default App;
