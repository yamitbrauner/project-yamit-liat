import React, { Component } from 'react';

class AppHeader extends Component {

  constructor(props) {
      super(props);
      this.selectPage = this.selectPage.bind(this);
  }


  selectPage = (num) => {
   this.props.onSelectPage(num);
  };

  render() {
    return (
        <div className="col box">
            <ul className="menu-list row">
                <li className="menu-list-item col" onClick={()=>this.selectPage(0)}>
                    <button className="btn menu-list-item-txt"> ראשי </button>
                </li>

                <li className="menu-list-item col" onClick={()=>this.selectPage(1)}>
                    <button className="btn menu-list-item-txt"> חנות </button>
                </li>

                <li className="menu-list-item col">
                    {this.props.isLogged ?
                        <div>
                            <button className="btn menu-list-item-txt default-cursor" disabled={true}>
                                שלום ימית
                            </button>
                            <button className="btn menu-list-item-txt" onClick={()=>this.selectPage(3)}>
                                איזור אישי
                            </button>
                            <button className="btn menu-list-item-txt" onClick={()=>this.props.handleLog(false)}>
                                התנתק
                            </button>
                        </div>
                         :
                        <button onClick={()=>this.selectPage(2)} className="btn menu-list-item-txt"> התחבר </button>

                    }

                    </li>


            </ul>
        </div>
    );
  }
}

export default AppHeader;
