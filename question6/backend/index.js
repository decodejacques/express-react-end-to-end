const express = require('express')
const app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.raw({ type: '*/*' }))

let todos = ["breath", "eat", "sleep"]

app.get('/todos', (req, res) => res.send(JSON.stringify(todos)))

app.get('/deleteEverything', (req, res) => {
    todos = [];
    res.send("ok")
})

app.post('/addTodo', (req, res) => {
    todos.push(JSON.parse(req.body.toString()));
    res.send("ok")
})

app.listen(4000, () => console.log('Port 4000!'))