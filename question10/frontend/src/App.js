import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = { todos: [] }
  }

  add = () => {
    let item = this.inp.value
    fetch("/addTodo", {
      method: "POST",
      body: JSON.stringify({ item: item, username: this.username })
    });
    this.setState(st => { return { todos: st.todos.concat(item) } }, () => item = "")
  }

  deleteEverything = () => {
    fetch("/clearTodos", {
      method: "POST",
      body: JSON.stringify(this.username)
    });
    this.setState({ todos: [] })
  }

  processSignupResponse = (response) => {
    if (response !== "ok") {
      this.setState({ signupFailed: true });
      return;
    }
    this.setState({ todos: [], ready: true })
  }

  signup = () => {
    let credentials = JSON.stringify({ username: this.usernameInput.value, password: this.passwordInput.value })
    fetch("/signup", {
      method: "POST",
      body: credentials
    })
      .then(x => x.text())
      .then(this.processSignupResponse)
  }

  processLoginResponse = (response) => {
    if (response !== "ok") {
      this.setState({ loginFailed: true });
      return;
    }
    fetch("/todos?username=" + this.username)
      .then(x => x.text())
      .then(raw => {
        let lst = JSON.parse(raw);
        this.setState({ todos: lst, ready: true })
      })
  }

  login = () => {
    let credentials = JSON.stringify({ username: this.usernameInput.value, password: this.passwordInput.value })
    fetch("/login", {
      method: "POST",
      body: credentials
    })
      .then(x => x.text())
      .then(this.processLoginResponse)
  }



  render() {
    if (this.state.loginFailed) {
      return (<h1> Invalid username or password </h1>);
    }
    if (this.state.signupFailed) {
      return (<h1> Username already taken</h1>);
    }
    if (!this.state.ready) {
      return (<div>
        <input ref={r => this.usernameInput = r} /><br />
        <input ref={r => this.passwordInput = r} /><br />
        <button onClick={this.login}> Login </button><br />
        <button onClick={this.signup}> Signup </button>
      </div>)
    }
    return (
      <div className="App">
        <input ref={r => this.inp = r}></input>
        <button onClick={this.add}>add it </button>
        <button onClick={this.deleteEverything}>delete them </button>
        {this.state.todos.map(x => (<li> {x} </li>))}
      </div>
    );
  }
}

export default App;