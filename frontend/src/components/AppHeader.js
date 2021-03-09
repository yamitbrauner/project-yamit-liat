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
        <div className="col">
            <ul className="menu-list row">
                <li className="menu-list-item col" onClick={()=>this.selectPage(0)}>
                    <button className="btn menu-list-item-txt"> ראשי </button>
                </li>

                <li className="menu-list-item col" onClick={()=>this.selectPage(1)}>
                    <button className="btn menu-list-item-txt"> חנות </button>
                </li>

                <li className="menu-list-item col" onClick={()=>this.selectPage(2)}>
                    <button className="btn menu-list-item-txt"> התחבר </button>
                </li>


            </ul>
        </div>
    );
  }
}

export default AppHeader;
