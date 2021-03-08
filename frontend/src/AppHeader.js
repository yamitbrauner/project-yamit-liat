import React, { Component } from 'react';

class AppHeader extends Component {
  state = {menuList:[]};

  constructor(props) {
      super(props);
      this.selectPage = this.selectPage.bind(this);
  }


  selectPage = (num) => {
   this.props.onSelectPage(num);
  };

  render() {
    return (
        <ul className="menu-list">
            <li className="menu-list-item" onClick={()=>this.selectPage(0)}>
                <button className="menu-list-item-txt"> ראשי </button>
            </li>

            <li className="menu-list-item" onClick={()=>this.selectPage(1)}>
                <button className="menu-list-item-txt"> חנות </button>
            </li>

            <li className="menu-list-item" onClick={()=>this.selectPage(2)}>
                <button className="menu-list-item-txt"> התחבר </button>
            </li>


        </ul>
    );
  }
}

export default AppHeader;
