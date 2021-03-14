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
            {Object.keys(this.props.categories).map((category,i) =>{
                return <>
                    <a key={i} className="row margin-top-bottom" onClick={()=>this.selectCategory(category)}>
                        <button className="btn col category-name">
                            {this.props.categories[category].category_name}
                        </button>
                    </a>
                    <div className="divider row margin-top-bottom"/>
                </>
            })}

        </div>
    );
  }
}

export default SideMenu;
