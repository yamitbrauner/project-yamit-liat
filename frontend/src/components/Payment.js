import React, { Component } from 'react';
import UserDetails from "./UserDetails";
import Cart from "./Cart";
import moment from 'moment';
import { PayPalButton } from "react-paypal-button-v2";
import finishedImg from "../orderFinished.svg";
import { getHeaders } from './GlobalFunc'

class Payment extends Component {

    state = {isFinish: false, showPaypal: false, reservationId:''};

    finishOrder= (userInput) =>{
        const today = moment();
        let data = {
        userId: this.props.userDetails.userId,
        totalPrice: this.props.totalPrice,
        reservationDate: today,
        deliveryDate: userInput.deliveryDate
    }
        const requestOptions = {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(data)
        };
        fetch("/user/"+this.props.userDetails.userId+"/createNewReservation",requestOptions)
            .then(res => res.json())
            .then(
                (reservationData) => {
                    this.updateResProducts(reservationData);
                })
            .catch((error)=>{
                this.props.showPopup(window.ERROR_POPUP);
            });
    }
    updateResProducts=(reservationData)=>{
        Object.keys(this.props.itemsInCart).forEach((key,index)=>{
            let item = this.props.itemsInCart[key];
            let data = {
                prodId: item.prodId,
                categoryId: item.categoryId,
                reservationId: reservationData.reservationId,
                quantity: item.quantity
            }
            const requestOptions = {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(data)
            };
            fetch("/user/"+this.props.userDetails.userId+"/createPurchase",requestOptions)
                .then(res => {
                    if(res.ok){
                        if(Object.keys(this.props.itemsInCart).length === index+1){
                            this.setState({showPaypal:true, reservationId: reservationData.reservationId});
                        }
                    }
                }).catch((error)=>{
                this.props.showPopup(window.ERROR_POPUP);
            })
        });
    }

    confirmReservation = (orderId)=>{
        var paymentId = orderId;
        const requestOptions = {
            method: 'PUT',
            headers: getHeaders(),
        };
        fetch("/user/"+this.props.userDetails.userId+"/confirmReservation?reservationId="+this.state.reservationId + "&paymentId=" + paymentId,requestOptions)
            .then(res => {
                if(res.ok){
                    this.setState({ isFinish:!this.state.isFinish},()=>this.props.setItemsInCart({}));
                }
            })
            .catch((error)=>{
                this.props.showPopup(window.ERROR_POPUP);
        })
    }

    render() {
      return (
        <div className="col payment">
                <div className="row">
                    {!this.state.isFinish ?

                    <div className="col">

                        {this.state.showPaypal ?
                            <div className="row">
                                <div className="col">
                                    <h1 className="row">אנא בחר אמצעי תשלום</h1>
                                    <div className="row">
                                        <PayPalButton
                                            amount={this.props.totalPrice}
                                            onSuccess={(details, data) => {
                                                this.confirmReservation(data.orderID);
                                            }}
                                            loacle= "he_IL"
                                            options={{
                                                currency: "ILS",
                                                clientId: window.PAYPAL_CLIENT_ID
                                            }}
                                        />
                                    </div>
                                </div>
                        </div> :
                            <>
                                <div className="row">
                                    <div className="col title"> פרטי חיוב ומשלוח</div>
                                </div>
                                <UserDetails userDetails={this.props.userDetails} finishOrder={this.finishOrder} isUpdate={false}/>
                            </>
                        }
                    </div>
                        :
                    <div className="col">
                        <div className="row">
                            <span className="col title">
                            ההזמנה הושלמה בהצלחה
                            </span>
                        </div>
                        <div className="row">
                            <img title="ההזמנה הושלמה בהצלחה" className="col symbol-height finished-symbol margin-top-bottom" alt="ההזמנה הושלמה בהצלחה" src={finishedImg}/>
                        </div>

                    </div>

                    }
                    {!this.state.isFinish && <Cart itemsInCart={this.props.itemsInCart} totalPrice={this.props.totalPrice} isEditable={false}/>}
                </div>


        </div>
    );
  }
}

export default Payment;
