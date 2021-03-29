import React, { Component } from 'react';

class SideMenu extends Component {

    constructor(props) {
        super(props);
        this.selectCategory = this.selectCategory.bind(this);
    }

    selectCategory = (category) => {
        this.props.onSelectCategory(category);
    };

  render() {
    return (
        <div className="side-menu col">
            {this.props.categories.map((category,index) =>{
                return <div key={index}>
                <div className="row">
                    <div className="col margin-top-bottom" onClick={()=>this.selectCategory(category)}>
                        <button className="btn btn-default col category-name row">
                            {category.category_name}
                        </button>
                    </div>
                </div>
                <div className="divider row margin-top-bottom"/>
                </div>
            })}

        </div>
    );
  }
}

export default SideMenu;
