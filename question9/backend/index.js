const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const fs = require('fs');
app.use(bodyParser.raw({ type: '*/*' }))
let todos = {}

function loadTodos() {

    try {
        let contents = fs.readFileSync('todos.json');
        todos = JSON.parse(contents);
    } catch (err) { }

}

function saveTodos() {
    return fs.writeFileSync(
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
    saveTodos();
    res.send("ok");

})

app.post('/clearTodos', (req, res) => {
    let payload = JSON.parse(req.body.toString());
    let username = payload.username;
    todos[username] = [];
    saveTodos();
    res.send("ok");
})

loadTodos();
app.listen(4000, () => console.log('Port 4000!'))