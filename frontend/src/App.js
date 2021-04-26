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
  state = {pageSelected:1, userDetails: {}};


    handlePageSelection = (pageNum) =>{
        this.setState({pageSelected : pageNum})
    }
    handleLog = (val) =>{
        if(val){
            this.fetchUserDetails();
        }else{
            this.setState({userDetails : {}});
        }
    }

    fetchUserDetails = ()=>{
        // to change for a specific user
        fetch("/user")
            .then(res => res.json())
            .then(
                (resUser) => {
                    this.setState({
                        userDetails: resUser[0]
                    });
                },
                (error) => {
                    this.props.onSelectPage(404);
                }
            )
    }

  render() {
    return (
        <div className="App container">
            <div className="col-xs-12">
                <div className="row header-position">
                    <AppHeader className="app-header" handleLog={this.handleLog} userDetails={this.state.userDetails} onSelectPage={this.handlePageSelection}/>
                </div>
                <div className="row">
                    <img className="header-img" alt="" src={matokli} />
                </div>
                <div className="row margin-top-bottom header-position">
                    {this.state.pageSelected === 0 && <Main/>}
                    {this.state.pageSelected === 1 && <Shop onSelectPage={this.handlePageSelection} userDetails={this.state.userDetails}/>}
                    {this.state.pageSelected === 2 && <Login handleLog={this.handleLog} userDetails={this.state.userDetails} onSelectPage={this.handlePageSelection}/>}
                    {this.state.pageSelected === 3 && <Settings onSelectPage={this.handlePageSelection} userDetails={this.state.userDetails}/>}
                    {this.state.pageSelected === 404 && <Error/>}
                </div>
            </div>
        </div>
    );
  }
}

export default App;
