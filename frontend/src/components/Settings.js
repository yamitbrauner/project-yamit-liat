import React, { Component } from 'react';
import SideMenu from "./SideMenu";
import Stock from "./Stock";
import OrdersTable from "./OrdersTable";
var STOCK = 2;
var DETAILS = 3;
var ORDERS = 4;


class Settings extends Component {

  state = {categorySelected: null, categories:[] };

  componentDidMount(){
      this.setState({categories: [
              {
                  category_id : STOCK,
                  category_name:"ניהול מלאי"
              },{
                  category_id : DETAILS,
                  category_name:"ניהול פרטים אישיים"
              },{
                  category_id : ORDERS,
                  category_name:"ההזמנות שלי"
              }
          ]},()=>this.handleCategorySelection())
  }
    handleCategorySelection = (category) =>{
        if(!category){
            category = this.state.categories[0];
        }
        this.setState({categorySelected : category})
    }


  render() {
    return (
        <div className="col">
            <div className="row">
                <div className="col">
                    <div className="row">
                        <SideMenu onSelectCategory={this.handleCategorySelection}
                                  categories={this.state.categories}/>
                    </div>
                </div>
                <div className="col-9 box item">
                        <div className="row">
                            <div className="col">
                                {
                                    // eslint-disable-next-line
                                    this.state.categorySelected && this.state.categorySelected.category_id == STOCK &&
                                <div className="margin-top-bottom">
                                    <Stock/>
                                </div>
                                }
                                {
                                    // eslint-disable-next-line
                                    this.state.categorySelected && this.state.categorySelected.category_id == DETAILS &&
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
                                                <a onClick={()=>this.sign(false)}>להרשמה</a>
                                                    :
                                                <a onClick={()=>this.sign(true)}>להתחברות</a>
                                                }
                                            </div>
                                        </div>
                                        <button onClick={()=>this.finish()} className="btn btn-primary">סיום</button>
                                    </div>
                                }
                                {
                                    // eslint-disable-next-line
                                    this.state.categorySelected && this.state.categorySelected.category_id == ORDERS &&
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
