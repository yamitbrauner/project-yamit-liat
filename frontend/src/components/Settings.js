import React, { Component } from 'react';
import UserDetails from "./UserDetails";
import Stock from "./Stock";
import Users from "./Users";
import {Link} from "react-router-dom";
let isManager = false;

class Settings extends Component {

  state = {categories:[], type:'' };


  componentDidMount(){
      isManager = this.props.userDetails.roleId === window.MANAGER_ROLE;
      let categories = [
          {
              categoryId : window.DETAILS,
              categoryName:"ניהול פרטים אישיים"
          }
      ];
      if(isManager){
          categories.push(
              {
                  categoryId : window.USERS,
                  categoryName:"ניהול משתמשים והזמנות"
              });
          categories.push(
              {
              categoryId : window.STOCK,
              categoryName:"ניהול מלאי"
          });
      }else{
          categories.push(
              {
                  categoryId : window.USERS,
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
                                type && type === window.STOCK &&
                                <div className="margin-top-bottom">
                                    <Stock showPopup={(error)=>this.props.showPopup(error)}/>
                                </div>
                            }
                            {
                                // eslint-disable-next-line
                                type && type === window.DETAILS &&
                                <UserDetails showPopup={(error)=>this.props.showPopup(error)} userDetails={this.props.userDetails} isUpdate={true}/>
                            }
                            {
                                // eslint-disable-next-line
                                type && type === window.USERS &&
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
