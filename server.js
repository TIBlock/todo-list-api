var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var todoList = [
    {
        id: 1,
        todo: "Implement a REST API"
    }
];

// GET /api/todos
app.get('/api/todos', function (req, res, nextFn) {
    console.log(req.params)
    res.send(`This is a list of all my to do items: ${res.send(todoList)}`)
});

// GET /api/todos/:id

app.get('/api/todos/:id', function (req, res, nextFn) {

    const todoItem = todoList.find(function(todo) {
        if (todo.id.toString() === req.params.id) {
            return res.send(todo);
        }
    });
    console.log(todoItem)
});

// POST /api/todos

app.post('/api/todos', function (req, res, nextFn) {
    console.log(req.params)
    res.send(`you posted to my todo list successfully.`)
});

// PUT /api/todos/:id

app.put('/api/todos/:id', function (req, res, nextFn) {
    console.log(req.params)
    res.send(`I put to my todo list successfully.`)
});

// DELETE /api/todos/:id

app.delete('/api/todos/:id', function (req, res, nextFn) {
    console.log(req.params)
    res.send(`I sent a delete request successfully.`)
});

app.listen(3000, function(){
    console.log('You got lots to do on port 3000!');
})