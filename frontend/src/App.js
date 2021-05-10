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
let CLOSE_POPUP = 0;
let CART_POPUP = 1;
let LOGIN_POPUP = 2;
let PRODUCT_POPUP = 3;

class App extends Component {
  state = {pageSelected:1, userDetails: {}, itemsInCart:{}, totalPrice:0, totalItems:0, productToShow:false};

    componentDidMount(){
        var tempUserDetails = localStorage.getItem('userDetails');
        if(tempUserDetails && tempUserDetails.length > 0){
            this.setState({userDetails: JSON.parse(tempUserDetails)});
        }
    }

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
        this.showPopup(CART_POPUP);
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

    handlePay = ()=>{
        if(Object.keys(this.state.userDetails).length === 0){
            this.showPopup(LOGIN_POPUP);
        }else{
            this.showPopup(CLOSE_POPUP);
            this.handlePageSelection(4);
        }
    }
    removeItemFromCart=(itemToRemove)=>{
        var tempItemsInCart = {...this.state.itemsInCart};
        delete tempItemsInCart[itemToRemove.prodId];
        this.setItemsInCart(tempItemsInCart);
    }

    logout = ()=>{
        this.setState({userDetails:{}});
        localStorage.removeItem('token');
        localStorage.removeItem('userDetails');
    }
    showProduct = (item,itemIndex)=>{
        var productToShow = false;
        if(item !== undefined){
            productToShow = {
                item:item,
                itemIndex : itemIndex
            }
        }
        this.setState({productToShow: productToShow },()=>this.showPopup(PRODUCT_POPUP));
    }

    handleCart = (itemIndex, selectedItem) =>{
        var tempItemsInCart = {...this.state.itemsInCart};
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
                                    <img title="הגדרות" className="symbol-height" alt="הגדרות" src={settingImg} onClick={() => this.handlePageSelection(3)}/>
                                </>
                            }
                        </div>
                    </div>

                    <div className="col-xs-12">
                        <div className="row">
                            <AppHeader className="app-header" pageSelected={this.state.pageSelected} onSelectPage={this.handlePageSelection}/>
                        </div>
                        <div className="row margin-top-bottom">
                            {this.state.pageSelected === 1 && <Shop onSelectPage={this.handlePageSelection} handleCart={this.handleCart}
                                                                    showProduct={this.showProduct} itemsInCart={this.state.itemsInCart}/>}
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
