import React, { Component } from 'react';
import UserDetails from "./UserDetails";
import Cart from "./Cart";
import RowMenu from "./RowMenu";
import moment from 'moment';
var SHOP = 1;
class Payment extends Component {

    state = {isFinish: false, categories:[]}

    componentDidMount(){


        var categories = [
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

    finishOrder= (deliveryDate) =>{
        const today = moment();
        var data = {
        userId: this.props.userDetails.userId,
        totalPrice: this.props.totalPrice,
        paymentId: "152315789",
        reservationDate: today,
        deliveryDate: deliveryDate
    }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        };
        fetch("/createNewReservation",requestOptions)
            .then(res => {
                if(res.ok){
                    this.setState({isFinish: !this.state.isFinish})
                }
            })


    }

  render() {
      return (
        <div className="col payment">
            <RowMenu onSelectCategory={this.handleCategorySelection}
                     categories={this.state.categories}/>
            {!this.state.isFinish ?
                <div className="row">
                    <div className="col">
                        <div className="row">
                            <div className="col title"> פרטי חיוב ומשלוח</div>
                        </div>
                        <UserDetails userDetails={this.props.userDetails} finishOrder={this.finishOrder} isUpdate={false}/>
                    </div>
                    <Cart itemsInCart={this.props.itemsInCart} totalPrice={this.props.totalPrice} isEditable={false}/>

                </div>
                :
                <div>
                    ההזמנה הושלמה בהצלחה
                </div>

            }

        </div>
    );
  }
}

export default Payment;
