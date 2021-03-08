import React, { Component } from 'react';
import './App.css';
import AppHeader from './AppHeader';
import Main from './Main';
import Shop from './Shop';
import Login from './Login';

class App extends Component {
  state = {pageSelected:0};

  componentDidMount() {
    //setInterval(this.hello, 1000);
  }


  /*hello = () => {
    fetch('/api/time')
        .then( res => res.text())
        .then(res => { this.setState( {message: res})
        });
  };*/

    handlePageSelection = (pageNum) =>{
        this.setState({pageSelected : pageNum})
    }

  render() {
    return (
        <div className="App">
          <AppHeader className="app-header" onSelectPage={this.handlePageSelection}/>
          <div className="divider"/>
            {this.state.pageSelected === 0 && <Main/>}
            {this.state.pageSelected === 1 && <Shop/>}
            {this.state.pageSelected === 2 && <Login/>}
        </div>
    );
  }
}

export default App;
