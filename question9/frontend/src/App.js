import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import List from './List.js'

class App extends Component {
  constructor() {
    super();
    this.state = {}
  }

  renderLogin = () => {
    return (
      <div>
        <div>
          <input ref={r => this.usernameInp = r} placeholder="username" type="text" />
          <input placeholder="password" type="password" />
        </div>
        <div>
          <button onClick={this.loginAction}>login</button><button>signup</button>
        </div>
      </div>);
  }

  loginAction = () => {
    this.username = this.usernameInp.value;
    
  }



  render() {
    if (this.state.loggedIn) {
      return <List usr={this.username} />;
    } else {
      return this.renderLogin();
    }
  }
}

export default App;