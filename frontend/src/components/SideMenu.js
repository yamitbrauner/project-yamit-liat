import React, { Component } from 'react';

class SideMenu extends Component {
  state = { categories:[]};

  constructor(props) {
      super(props);
  }

    componentDidMount(){
        this.setState({ categories: [
                {
                    category_id : 1,
                    category_name:"general"
                },{
                    category_id : 2,
                    category_name:"Cakes"
                },{
                    category_id : 3,
                    category_name:"Cookies"
                },{
                    category_id : 4,
                    category_name:"Gluten_free"
                },{
                    category_id : 5,
                    category_name:"Quiches_and_Pies"
                },{
                    category_id : 6,
                    category_name:"Vegan"
                },{
                    category_id : 7,
                    category_name:"Yeast"
                },
            ]})
    }

  render() {
    return (
        <div className="side-menu col">
            {this.state.categories.map(category =>{
                return <>
                    <div className="row margin-top-bottom">
                        <button className="btn">
                            {category.category_name}
                        </button>
                    </div>
                    <div className="divider row margin-top-bottom"/>
                </>
            })}

        </div>
    );
  }
}

export default SideMenu;
