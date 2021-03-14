import React, { Component } from 'react';
import SideMenu from './SideMenu';
import Item from './Item';

class Shop extends Component {
  state = { items:[],itemsFiltered:[], itemsToDisplay:[], categories: {}, categorySelected:2};
  constructor(props) {
      super(props);
      this.filterByCategory = this.filterByCategory.bind(this);
  }

  componentDidMount(){
      this.setState({
          items: [
              {
                  prod_id : 1,
                  category_id:7,
                  prod_name:"קוראסון",
                  quantity_ordered : 10,
                  quantity_in_stock : 20,
                  price_per_unit : 2,
                  description : "קוראסון שוקולד",
                  pic_url : "https://www.foodisgood.co.il/wp-content/uploads/2015/11/rugelach.jpg"
              },{
                  prod_id : 1,
                  category_id:3,
                  prod_name:"עוגיית שוקולד צ'יפס",
                  quantity_ordered : 10,
                  quantity_in_stock : 20,
                  price_per_unit : 5,
                  description : "עוגיית שוקולד צ'יפס",
                  pic_url : "https://www.foodisgood.co.il/wp-content/uploads/2015/07/Simple-chocolate-chip-cookies-2-862x614.jpg"
              },{
                  prod_id : 1,
                  category_id:2,
                  prod_name:"מוס שוקולד",
                  quantity_ordered : 10,
                  quantity_in_stock : 20,
                  price_per_unit : 6,
                  description : "מוס שוקולד",
                  pic_url : "https://www.krutit.co.il/wp-content/uploads/2019/09/KRT_2786.jpg"
              },{
                  prod_id : 1,
                  category_id:2,
                  prod_name:"עוגת גבינה ופירות יער",
                  quantity_ordered : 10,
                  quantity_in_stock : 20,
                  price_per_unit : 10,
                  description : "עוגת גבינה ופירות יער",
                  pic_url : "https://medias.hashulchan.co.il/www/uploads/2015/11/500_65061-600x600.jpg"
              },
          ],
          categories: {

                  2: {
                      category_name: "עוגות"
                  },3:{
                      category_name:"עוגיות"
                  },4:{
                      category_name:"ללא גלוטן"
                  },5:{
                      category_name:"פאי"
                  },6:{
                      category_name:"טבעוני"
                  },7:{
                      category_name:"שמרים"
                  }

              },
      },()=>this.handleCategorySelection(2));
  }
    filterByCategory = (category) =>{
        var tempItemsFiltered = [];
        this.state.items.map(item=>{
            if(item.category_id == category){
                tempItemsFiltered.push(item);
            }
        })
        this.setState({itemsFiltered:tempItemsFiltered, itemsToDisplay:tempItemsFiltered})
    }
    handleCategorySelection = (category) =>{
        this.filterByCategory(category);
        this.setState({categorySelected : category})
    }


  render() {
    return (
        <div className="col">
            <div className="row">
                <div className="col">
                    <div className="row">
                        <SideMenu onSelectCategory={this.handleCategorySelection} categories={this.state.categories}/>
                    </div>
                </div>
                <div className="col-6">
                    <div className="row">
                        <span className="col title">
                            {this.state.categories[this.state.categorySelected] ? this.state.categories[this.state.categorySelected].category_name: "כללי"}</span>
                    </div>
                    {this.state.itemsToDisplay.map(item =>{
                        return <div className="row margin-top-bottom">
                            <Item item={item}/>
                        </div>

                    })}
                </div>
                <div className="col">
                </div>
            </div>
        </div>
    );
  }
}

export default Shop;
