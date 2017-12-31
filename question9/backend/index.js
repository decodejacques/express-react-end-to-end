const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const fs = require('fs-extra');
app.use(bodyParser.raw({ type: '*/*' }))
let todos = {}

function loadTodos() {
    return fs.ensureFile('todos.json')
        .then(() =>
            fs.readFile('todos.json')
        )
        .then(raw => {
            if (raw == undefined || raw.toString().length == 0) {
                todos = {};
            }
            else {
                console.log(raw.toString());
                todos = JSON.parse(raw);
            }
        })
}

function saveTodos() {
    return fs.writeFile(
        'todos.json',
        JSON.stringify(todos))
}



app.get('/todos', (req, res) => {
    let username = req.query.username
    let userTodos = todos[username]
    if (userTodos == undefined) userTodos = []
    res.send(JSON.stringify(userTodos))
})

app.post('/addTodo', (req, res) => {
    let payload = JSON.parse(req.body.toString());
    let item = payload.item;
    let username = payload.username;
    let userTodos = todos[username]
    if (userTodos == undefined) userTodos = []
    userTodos.push(item);
    todos[username] = userTodos;
    saveTodos()
        .then(() => res.send("ok"))

})

app.post('/clearTodos', (req, res) => {
    let payload = JSON.parse(req.body.toString());
    let username = payload.username;
    todos[username] = [];
    saveTodos()
        .then(() => res.send("ok"))
})

loadTodos()
    .then(() =>
        app.listen(4000, () => console.log('Port 4000!')))