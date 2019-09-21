var express = require('express');
var bodyParser = require('body-parser');
var uuidv1 = require('uuid/v1');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var todoList = [
    {
        id: "7780a5d0-dc8d-11e9-8c15-3763a3a5062c",
        todo: "Implement a REST API",
        isComplete: false
    }
];

// GET /api/todos

app.get('/api/todos', function (req, res, nextFn) {
    res.send(`This is a list of all my to do items: ${res.send(todoList)}`)
});

// GET /api/todos/:id

app.get('/api/todos/:id', function (req, res, nextFn) {
    const todoItem = todoList.find(function(todo) {
        if (todo.id.toString() === req.params.id) {
            return res.send(todo);
        }
    });
});

// POST /api/todos

app.post('/api/todos', function (req, res, nextFn) {
    newTodo = { 
        id: uuidv1(), 
        todo: req.body.todo,
        isComplete: false,
    };
    todoList.push(newTodo);
    res.send(`This is an updated list of all my to do items: ${res.send(todoList)}`)
});

// PUT /api/todos/:id

app.put('/api/todos/:id', function (req, res, nextFn) {
    const todoItem = todoList.find(function(todo) {
        if (todo.id === req.params.id) {
            let updatedTodo = {
                id: todo.id, 
                todo: req.body.todo, 
                isComplete: false,
            }
            todoList.push(updatedTodo)
        }
    });
    res.send(`This is an updated list of all my to do items: ${res.send(todoList)}`)
});

// DELETE /api/todos/:id

app.delete('/api/todos/:id', function (req, res, nextFn) {
    console.log(req.params)
    const todoItem = todoList.find(function(todo) {
        if (todo.id === req.params.id) {
            let todoIndex = todoList.indexOf(todo.id);
            todoList.splice(todoIndex,1)
        }
    });
    res.send(`This is an updated list of all my to do items: ${res.send(todoList)}`)
});

app.listen(3000, function(){
    console.log('You got lots to do on port 3000!');
})