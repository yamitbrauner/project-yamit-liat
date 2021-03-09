import React, { Component } from 'react';
import './App.css';
import AppHeader from './components/AppHeader';
import Main from './components/Main';
import Shop from './components/Shop';
import Login from './components/Login';

class App extends Component {
  state = {pageSelected:1};

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
        <div className="App container">
            <div className="col-xs-12">
                <div className="row">
                    <AppHeader className="app-header" onSelectPage={this.handlePageSelection}/>
                </div>
                <div className="divider row"/>
                <div className="row margin-top-bottom">
                    {this.state.pageSelected === 0 && <Main/>}
                    {this.state.pageSelected === 1 && <Shop/>}
                    {this.state.pageSelected === 2 && <Login/>}
                </div>
            </div>
        </div>
    );
  }
}

export default App;
