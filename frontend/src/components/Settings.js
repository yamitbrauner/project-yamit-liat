import React, { Component } from 'react';
import SideMenu from "./SideMenu";
import Stock from "./Stock";
import OrdersTable from "./OrdersTable";
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
            <div className="row">
                <div className="col margin-l">
                    <div className="row">
                        <SideMenu onSelectCategory={this.handleCategorySelection}
                                  categories={this.state.categories}/>
                    </div>
                </div>
                <div className="col-9 box">
                        <div className="row">
                            <div className="col">
                                {
                                    // eslint-disable-next-line
                                    this.state.categorySelected && this.state.categorySelected.categoryId == STOCK &&
                                <div className="margin-top-bottom">
                                    <Stock onSelectPage={this.onSelectPage}/>
                                </div>
                                }
                                {
                                    // eslint-disable-next-line
                                    this.state.categorySelected && this.state.categorySelected.categoryId == DETAILS &&
                                    <div className="margin-top-bottom">
                                        <div className="form-row">
                                            <span className="title col">

                                            {this.state.isLogin? "התחברות" : "הרשמה"}
                                            </span>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label htmlFor="name">מייל</label>
                                                <input type="text" className="form-control" id="name" placeholder="אנא הזן מייל"/>
                                            </div>
                                        </div>
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label htmlFor="password">סיסמא</label>
                                                <input type="password" className="form-control" id="password" placeholder="אנא הזן סיסמא"/>
                                            </div>
                                        </div>
                                        {!this.state.isLogin?
                                        <>
                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="privateName">שם פרטי</label>
                                                    <input type="text" className="form-control" id="privateName" placeholder="אנא הזן שם פרטי"/>
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="lastName">שם משפחה</label>
                                                    <input type="text" className="form-control" id="lastName" placeholder="אנא הזן שם משפחה"/>
                                                </div>
                                            </div>
                                            <div className="form-row">
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="address">כתובת</label>
                                                    <input type="text" className="form-control" id="address" placeholder="אנא הזן כתובת"/>
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label htmlFor="phone">טלפון</label>
                                                    <input type="text" className="form-control" id="phone" placeholder="אנא הזן טלפון"/>
                                                </div>
                                            </div>
                                        </>

                                        :""
                                        }



                                        <div className="form-row">
                                            <div className="form-group switch-text col-md-6">
                                                {this.state.isLogin ?
                                                <div onClick={()=>this.sign(false)}>להרשמה</div>
                                                    :
                                                <div onClick={()=>this.sign(true)}>להתחברות</div>
                                                }
                                            </div>
                                        </div>
                                        <button onClick={()=>this.finish()} className="btn btn-primary">סיום</button>
                                    </div>
                                }
                                {
                                    // eslint-disable-next-line
                                    this.state.categorySelected && this.state.categorySelected.categoryId == ORDERS &&
                                <div className="margin-top-bottom">
                                    <OrdersTable/>
                                </div>
                                }

                            </div>
                        </div>
                    </div>
            </div>
        </div>
    );
  }
}

export default Settings;
