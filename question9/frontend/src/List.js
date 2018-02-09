import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class List extends Component {
    constructor(props) {
        super(props);
        this.username = props.usr;
        this.state = { todos: [] }
    }
    componentDidMount() {
        fetch("/todos?username=" + this.username)
            .then(x => x.text())
            .then(raw => {
                this.setState({ loggedIn: true });
                let lst = JSON.parse(raw);
                this.setState({ todos: lst })
            })
    }
    // Adds an item to the todo list
    add = () => {
        let item = this.inp.value
        fetch("/addTodo", {
            method: "POST",
            body: JSON.stringify({ item: item, username: this.username })
        });
        this.setState(st => { return { todos: st.todos.concat(item) } }, () => item = "")
    }
    // Deletes everything from the list
    deleteEverything = () => {
        fetch("/clearTodos", {
            method: "POST",
            body: JSON.stringify(this.username)
        });
        this.setState({ todos: [] })
    }
    renderList = () => {
        return (<div>
            <input ref={r => this.inp = r}></input>
            <button onClick={this.add}>add it </button>
            <button onClick={this.deleteEverything}>delete them </button>
            {this.state.todos.map(x => (<li> {x} </li>))}
        </div>);
    }
    render() {
        return this.renderList();
    }
}

export default List;