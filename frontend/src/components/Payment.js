import React, { Component } from 'react';
import UserDetails from "./UserDetails";
import Cart from "./Cart";
import RowMenu from "./RowMenu";
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

    finishOrder = ()=>{
        this.setState({isFinish: !this.state.isFinish})
    }

  render() {
debugger;
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
                        <UserDetails userDetails={this.props.userDetails}/>
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
