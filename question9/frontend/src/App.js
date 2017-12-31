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
      body: JSON.stringify({ item: item, username: this.state.username })
    });
    this.setState(st => { return { todos: st.todos.concat(item) } }, () => item = "")
  }

  deleteEverything = () => {
    fetch("/clearTodos", {
      method: "POST",
      body: JSON.stringify(this.state.username)
    });
    this.setState({ todos: [] })
  }

  setUsername = () => {
    let username = this.inputRef.value;
    this.setState({username: username});
    fetch("/todos?username=" + username)
      .then(x => x.text())
      .then(raw => {
        let lst = JSON.parse(raw);
        this.setState({ todos: lst })
      })
  }

  render() {
    if (!this.state.username) {
      return (<div>
        <input ref={r => this.inputRef = r} />
        <button onClick={this.setUsername}> Submit </button>
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