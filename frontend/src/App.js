import React, { Component } from 'react';
import './App.css';
import AppHeader from './components/AppHeader';
import Main from './components/Main';
import Shop from './components/Shop';
import Login from './components/Login';
import matokli from './matokli.png'
class App extends Component {
  state = {pageSelected:1};

  componentDidMount() {
  }

    handlePageSelection = (pageNum) =>{
        this.setState({pageSelected : pageNum})
    }

  render() {
    return (
        <div className="App container">
            <div className="col-xs-12">
                <div className="row header-position">
                    <AppHeader className="app-header" onSelectPage={this.handlePageSelection}/>
                </div>
                <div className="row">
                    <img className="header-img" alt="" src={matokli} />

                </div>
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
