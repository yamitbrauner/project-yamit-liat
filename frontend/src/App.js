import React, { Component } from 'react';
import './App.css';
import AppHeader from './components/AppHeader';
import Shop from './components/Shop';
import Settings from './components/Settings';
import Error from './components/Error';
import Payment from "./components/Payment";
import Popup from "./components/Popup";
import cartImg from "./cart.svg";
import settingImg from "./settings.svg";
import logoutImg from "./logout.svg";
import userImg from "./user.svg";
import { Route, Switch, Link, Redirect} from 'react-router-dom'

let CLOSE_POPUP = 0;
let CART_POPUP = 1;
let LOGIN_POPUP = 2;
let PRODUCT_POPUP = 3;

class App extends Component {
  state = {pageSelected:1, userDetails: {}, itemsInCart:{}, totalPrice:0, totalItems:0, productToShow:false};

    componentDidMount(){
        let tempUserDetails = localStorage.getItem('userDetails');
        if(tempUserDetails && tempUserDetails.length > 0){
            this.setState({userDetails: JSON.parse(tempUserDetails)});
        }
    }
    handleLog = (userInput, isLogin) =>{
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

                    }
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
                    this.setState({userDetails : data},()=>this.showPopup(CLOSE_POPUP));
                    localStorage.setItem('token',data.token);
                    localStorage.setItem('userDetails',JSON.stringify(data));
                }
            )

    }

    showPopup = (type) =>{
        this.setState({popupType : type});
    }

    setItemsInCart = (tempItems) =>{
        this.setState({itemsInCart: tempItems},()=>this.updateTotalPrice());
    }
    updateTotalPrice=()=>{
        let tempTotalPrice = 0;
        let tempTotalItems = 0;
        // eslint-disable-next-line
        Object.keys(this.state.itemsInCart).map((itemKey,index) => {
            tempTotalItems = tempTotalItems + this.state.itemsInCart[itemKey].quantity;
            tempTotalPrice = tempTotalPrice + this.state.itemsInCart[itemKey].quantity * this.state.itemsInCart[itemKey].pricePerUnit;
        });
        this.setState({totalPrice: tempTotalPrice , totalItems: tempTotalItems});
    }

    handlePay = ()=>{
        if(Object.keys(this.state.userDetails).length === 0){
            this.showPopup(LOGIN_POPUP);
        }else{
            this.showPopup(CLOSE_POPUP);
        }
    }
    removeItemFromCart=(itemToRemove)=>{
        let tempItemsInCart = {...this.state.itemsInCart};
        delete tempItemsInCart[itemToRemove.prodId];
        this.setItemsInCart(tempItemsInCart);
    }

    logout = ()=>{
        this.setState({userDetails:{}});
        localStorage.removeItem('token');
        localStorage.removeItem('userDetails');
    }
    showProduct = (item,itemIndex)=>{
        let productToShow = false;
        if(item !== undefined){
            productToShow = {
                item:item,
                itemIndex : itemIndex
            }
        }
        this.setState({productToShow: productToShow },()=>this.showPopup(PRODUCT_POPUP));
    }

    handleCart = (itemIndex, selectedItem) =>{
        let tempItemsInCart = {...this.state.itemsInCart};
        if(tempItemsInCart[selectedItem.prodId]){
            this.removeItemFromCart(selectedItem);
        }else{
            selectedItem.quantity = 1;
            tempItemsInCart[selectedItem.prodId]=selectedItem;
            this.setItemsInCart(tempItemsInCart);
        }
    }

  render() {
    return (
        <div className="App">
            { this.state.popupType > 0 ?
                <Popup popupType={this.state.popupType} showPopup={this.showPopup}
                       itemsInCart={this.state.itemsInCart} totalPrice={this.state.totalPrice} setItemsInCart={this.setItemsInCart} isEditable={true}
                       handleQuantity={this.handleQuantity} handlePay={this.handlePay} removeItemFromCart={this.removeItemFromCart} handleLog={this.handleLog}
                       userDetails={this.state.userDetails} productToShow={this.state.productToShow} handleCart={this.handleCart}
                />
                : ""
            }
                <div className="container">
                    <div className="sticky-symbol">
                        <div className="symbol-cart">
                            <img title="עגלה" className="symbol-height" alt="" src={cartImg} onClick={()=>this.showPopup(CART_POPUP)}/>
                            <div className="cart-count">
                                (
                                <span>{this.state.totalItems}</span>
                                )
                            </div>
                        </div>
                        <div className="symbol-cart symbol-user">
                            {Object.keys(this.state.userDetails).length === 0 ?
                                <img title="התחברות" className="symbol-height" alt="להתחברות" src={userImg} onClick={() => this.showPopup(LOGIN_POPUP)}/>
                                :
                                <>
                                    <img title="התנתקות" className="symbol-height" alt="התנתקות" src={logoutImg} onClick={() => this.logout()}/>

                                    <Link to="/settings/3"><img title="הגדרות" className="symbol-height" alt="הגדרות" src={settingImg}/></Link>

                                </>
                            }
                        </div>
                    </div>

                    <div className="col-xs-12">
                        <div className="row">
                            <AppHeader className="app-header" pageSelected={this.state.pageSelected}/>
                        </div>
                        <Switch>
                            <Route exact path="/shop">
                                <Shop handleCart={this.handleCart}
                                      showProduct={this.showProduct} itemsInCart={this.state.itemsInCart}/>
                            </Route>
                            <Route exact path="/settings/:type"

                                   render={(matchProps) =>
                                       <Settings
                                           {...matchProps}
                                           {...this.props}
                                           userDetails={this.state.userDetails}
                                       />
                                   }>
                            </Route>

                            <Route path="/payment">
                                <Payment userDetails={this.state.userDetails}
                                            itemsInCart={this.state.itemsInCart}
                                         totalPrice={this.state.totalPrice}
                                         setItemsInCart={this.setItemsInCart}/>
                            </Route>
                            <Redirect  from="/"  to="/shop"  exact  />
                        </Switch>
                    </div>
                </div>



        </div>
    );
  }
}

export default App;
