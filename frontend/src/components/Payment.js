import React, { Component } from 'react';
import UserDetails from "./UserDetails";
import Cart from "./Cart";
import RowMenu from "./RowMenu";
import moment from 'moment';
let SHOP = 1;
class Payment extends Component {

    state = {isFinish: false, categories:[]}

    componentDidMount(){


        let categories = [
            {
                categoryId : SHOP,
                categoryName:"חזרה לחנות"
            }
        ];
        this.setState({categories: categories});
    }
    handleCategorySelection = (category)=>{
        this.props.onSelectPage(category.categoryId);
    }

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
        Object.keys(this.props.itemsInCart).map((key,index)=>{
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
                            this.confirmReservation(reservationData.reservationId);
                        }
                    }
                })
        });
    }

    confirmReservation = (reservationId)=>{
        var paymentId = 10203040;
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
        };
        fetch("/confirmReservation?reservationId="+reservationId + "&paymentId=" + paymentId,requestOptions)
            .then(res => {
                if(res.ok){
                    this.setState({ isFinish:!this.state.isFinish},()=>this.props.setItemsInCart({}));
                }
            })
    }

  render() {
      return (
        <div className="col payment">
            <RowMenu onSelectCategory={this.handleCategorySelection}
                     categories={this.state.categories}/>
                <div className="row">
                    {!this.state.isFinish ?

                    <div className="col">
                        <div className="row">
                            <div className="col title"> פרטי חיוב ומשלוח</div>
                        </div>
                        <UserDetails userDetails={this.props.userDetails} finishOrder={this.finishOrder} isUpdate={false}/>
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
