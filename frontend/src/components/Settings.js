import React, { Component } from 'react';
import RowMenu from "./RowMenu";
import UserDetails from "./UserDetails";
import Stock from "./Stock";
import Reservations from "./Reservations";
var STOCK = 2;
var DETAILS = 3;
var ORDERS = 4;
var MANAGER_ROLE = 2;
var isManager = false;

class Settings extends Component {

  state = {categorySelected: null, categories:[] };

  componentDidMount(){

      isManager = this.props.userDetails.roleId === MANAGER_ROLE;

      var categories = [
          {
              categoryId : DETAILS,
              categoryName:"ניהול פרטים אישיים"
          },{
              categoryId : ORDERS,
              categoryName:"ההזמנות שלי"
          }
      ];
      if(isManager){
          categories.push({
              categoryId : STOCK,
              categoryName:"ניהול מלאי"
          });
      }
      this.setState({categories: categories},()=>this.handleCategorySelection())
  }
    handleCategorySelection = (category) =>{
        if(!category){
            category = this.state.categories[0];
        }
        this.setState({categorySelected : category})
    }
    onSelectPage=(val)=>{
      this.props.onSelectPage(val);
    }


  render() {

    return (
        <div className="col">
            <RowMenu onSelectCategory={this.handleCategorySelection}
                     categorySelected={this.state.categorySelected}
                     categories={this.state.categories}/>
            <div className="row">
                <div className="col">
                            {
                                // eslint-disable-next-line
                                this.state.categorySelected && this.state.categorySelected.categoryId === STOCK &&
                                <div className="margin-top-bottom">
                                    <Stock onSelectPage={this.onSelectPage}/>
                                </div>
                            }
                            {
                                // eslint-disable-next-line
                                this.state.categorySelected && this.state.categorySelected.categoryId === DETAILS &&
                                <UserDetails userDetails={this.props.userDetails} isUpdate={true}/>
                            }
                            {
                                // eslint-disable-next-line
                                this.state.categorySelected && this.state.categorySelected.categoryId === ORDERS &&
                                <div className="margin-top-bottom">
                                    <Reservations userDetails={this.props.userDetails}/>
                                </div>
                            }

                        </div>
            </div>
        </div>

    );
  }
}

export default Settings;
