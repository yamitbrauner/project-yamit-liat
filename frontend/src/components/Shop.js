import React, { Component } from 'react';
import Item from './Item';

class Shop extends Component {
  state = { items:[]};

/*  constructor(props) {
      super(props);
  }
*/
  componentDidMount(){
      this.setState({ items: [
              {
                  prod_id : 1,
                  category_id:2,
                  prod_name:"קוראסון",
                  quantity_ordered : 10,
                  quantity_in_stock : 20,
                  price_per_unit : 2,
                  description : "קוראסון שוקולד",
                  pic_url : "https://www.foodisgood.co.il/wp-content/uploads/2015/11/rugelach.jpg"
              },{
                  prod_id : 1,
                  category_id:2,
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
          ]})
   }




  render() {
    return (
        <div className="page">
            {this.state.items.map(item =>{
                return <Item item={item}/>
            })}
        </div>
    );
  }
}

export default Shop;
