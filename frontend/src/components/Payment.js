import React, { Component } from 'react';
import UserDetails from "./UserDetails";
import Cart from "./Cart";
import moment from 'moment';
import { PayPalButton } from "react-paypal-button-v2";

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
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        fetch("/createNewReservation",requestOptions)
            .then(res => res.json())
            .then(
                (reservationData) => {
                    this.updateResProducts(reservationData);
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
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            };
            fetch("/createPurchase",requestOptions)
                .then(res => {
                    if(res.ok){
                        if(Object.keys(this.props.itemsInCart).length === index+1){
                            this.setState({showPaypal:true, reservationId: reservationData.reservationId});
                        }
                    }
                })
        });
    }

    confirmReservation = (orderId)=>{
        var paymentId = orderId;
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch("/confirmReservation?reservationId="+this.state.reservationId + "&paymentId=" + paymentId,requestOptions)
            .then(res => {
                if(res.ok){
                    this.setState({ isFinish:!this.state.isFinish},()=>this.props.setItemsInCart({}));
                }
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
                            ההזמנה הושלמה בהצלחה
                    </div>

                    }
                    <Cart itemsInCart={this.props.itemsInCart} totalPrice={this.props.totalPrice} isEditable={false}/>
                </div>


        </div>
    );
  }
}

export default Payment;
