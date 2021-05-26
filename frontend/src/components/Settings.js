import React, { Component } from 'react';
import UserDetails from "./UserDetails";
import Stock from "./Stock";
import Users from "./Users";
import {Link} from "react-router-dom";
let STOCK = "2";
let DETAILS = "3";
let USERS = "4";
let MANAGER_ROLE = 1;
let isManager = false;

class Settings extends Component {

  state = {categories:[], type:'' };


  componentDidMount(){
      isManager = this.props.userDetails.roleId === MANAGER_ROLE;

      let categories = [
          {
              categoryId : DETAILS,
              categoryName:"ניהול פרטים אישיים"
          }
      ];
      if(isManager){
          categories.push(
              {
                  categoryId : USERS,
                  categoryName:"ניהול משתמשים והזמנות"
              });
          categories.push(
              {
              categoryId : STOCK,
              categoryName:"ניהול מלאי"
          });
      }else{
          categories.push(
              {
                  categoryId : USERS,
                  categoryName:"ניהול הזמנות"
              }
          )
      }
      this.setState({categories: categories});
  }

  render() {
      let type = this.props.match.params.type;
      return (
        <div className="col">
            <div className="row margin-top-bottom">
                {this.state.categories.map((category,index) =>{
                    let isSelected = type && type === category.categoryId;
                    return <Link className={ isSelected ? "col category-name category-selected" :"col category-name black-font"} key={index} to={category.categoryId}>
                        {category.categoryName}
                    </Link>
                })}

            </div>
            <div className="row">
                <div className="col">
                            {
                                // eslint-disable-next-line
                                type && type === STOCK &&
                                <div className="margin-top-bottom">
                                    <Stock showPopup={(error)=>this.props.showPopup(error)}/>
                                </div>
                            }
                            {
                                // eslint-disable-next-line
                                type && type === DETAILS &&
                                <UserDetails showPopup={(error)=>this.props.showPopup(error)} userDetails={this.props.userDetails} isUpdate={true}/>
                            }
                            {
                                // eslint-disable-next-line
                                type && type === USERS &&
                                <div className="margin-top-bottom">
                                    <Users
                                        showPopup={(error)=>this.props.showPopup(error)}
                                        userDetails={this.props.userDetails}/>
                                </div>
                            }

                        </div>
            </div>
        </div>

    );
  }
}

export default Settings;
