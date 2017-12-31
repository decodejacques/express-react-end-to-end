import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = { todos: [] }
  }

  componentDidMount = () => {
    fetch("/todos")
    .then(x => x.json())
    .then(lst => this.setState({todos: lst}))
  }

  add = () => {
    let item = this.inp.value
    fetch("/addTodo", {
      method: "POST",
      body: JSON.stringify(item)
    });
    this.setState(st => { return { todos: st.todos.concat(item) } })
  }

  

  deleteEverything = () => {
    fetch("/deleteEverything")
    this.setState({ todos: [] })
  }

  render() {
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