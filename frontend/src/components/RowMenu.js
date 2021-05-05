import React, { Component } from 'react';

class RowMenu extends Component {

    constructor(props) {
        super(props);
        this.selectCategory = this.selectCategory.bind(this);
    }

    selectCategory = (category) => {
        this.props.onSelectCategory(category);
    };

  render() {
    return (
        <div className="row margin-top-bottom">
            {this.props.categories.map((category,index) =>{
                var isSelected = this.props.categorySelected && this.props.categorySelected.categoryId === category.categoryId;
                return <div className={ isSelected ? "col category-name category-selected" :"col category-name"} key={index} onClick={()=>this.selectCategory(category)}>
                            {category.categoryName}
                </div>
            })}

        </div>
    );
  }
}

export default RowMenu;
