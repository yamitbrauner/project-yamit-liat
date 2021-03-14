import React, { Component } from 'react';
import SideMenu from './SideMenu';
import Item from './Item';
import Cart from './Cart';

class Shop extends Component {
  state = { items:[] ,itemsInCart:[], categories: [], categorySelected: null};
  constructor(props) {
      super(props);
      this.addToCart = this.addToCart.bind(this);
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
          categories: [
             {
                  category_id : 2,
                  category_name:"עוגות"
              },{
                  category_id : 3,
                  category_name:"עוגיות"
              },{
                  category_id : 4,
                  category_name:"ללא גלוטן"
              },{
                  category_id : 5,
                  category_name:"פאי"
              },{
                  category_id : 6,
                  category_name:"טבעוני"
              },{
                  category_id : 7,
                  category_name:"שמרים"
              },
          ]
      },()=>this.handleCategorySelection());
  }

    handleCategorySelection = (category) =>{
      if(!category){
            category = this.state.categories[0];
      }
        this.setState({categorySelected : category})
    }

    addToCart = (itemIndex,quantity) =>{
      this.state.items[itemIndex].quantity = quantity;
      this.setState({items: this.state.items});
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
                            {this.state.categorySelected ? this.state.categorySelected.category_name : "כללי"}</span>
                    </div>
                    {this.state.items.map((item,index) =>{
                        return this.state.categorySelected && item.category_id == this.state.categorySelected.category_id ?
                            <div className="row margin-top-bottom" key={index}>
                                <Item item={item} itemIndex={index} onAddToCart={this.addToCart} />
                            </div> : ''
                    })}
                </div>
                <div className="col">
                    <div className="row margin-top-bottom">
                        <Cart itemsInCart={this.state.items}/>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}

export default Shop;
