import React, { Component } from 'react';
import './App.css';
import AppHeader from './components/AppHeader';
import Main from './components/Main';
import Shop from './components/Shop';
import Login from './components/Login';
import Settings from './components/Settings';
import Error from './components/Error';
import matokli from './matokli.png'
class App extends Component {
  state = {pageSelected:1, isLoggedIn: false};


    handlePageSelection = (pageNum) =>{
        this.setState({pageSelected : pageNum})
    }
    handleLog = (val) =>{
        this.setState({isLoggedIn : val})
    }

  render() {
    return (
        <div className="App container">
            <div className="col-xs-12">
                <div className="row header-position">
                    <AppHeader className="app-header" handleLog={this.handleLog} isLoggedIn ={this.state.isLogged} onSelectPage={this.handlePageSelection}/>
                </div>
                <div className="row">
                    <img className="header-img" alt="" src={matokli} />
                </div>
                <div className="row margin-top-bottom header-position">
                    {this.state.pageSelected === 0 && <Main/>}
                    {this.state.pageSelected === 1 && <Shop onSelectPage={this.handlePageSelection} isLoggedIn={this.state.isLoggedIn}/>}
                    {this.state.pageSelected === 2 && <Login handleLog={this.handleLog} isLoggedIn ={this.state.isLoggedIn} onSelectPage={this.handlePageSelection}/>}
                    {this.state.pageSelected === 3 && <Settings onSelectPage={this.handlePageSelection}/>}
                    {this.state.pageSelected === 404 && <Error/>}
                </div>
            </div>
        </div>
    );
  }
}

export default App;
