const express = require('express');
const bodyParser = require('body-parser');

const uuidv1 = require('uuid/v1');

const dbConfigs = require('./knexfile.js')
const db = require('knex')(dbConfigs.development)

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const port = 3000


// GET /api/todos

app.get('/api/todos', function (req, res, nextFn) {
    getAllTodos()
    .then(function (allTodos) {
      res.send('<pre>' + JSON.stringify(allTodos, null, 4) + '</pre>')
    //   res.send('<ul>' + allTodos.map(renderCohort).join('') + '</ul>')
    })
    // res.send(`This is a list of all my to do items: ${res.send(todoList)}`)
});

// GET /api/todos/:id

app.get('/api/todos/:slug', function (req, res, nextFn) {
    console.log(req.params.slug)
    let slug =  '"' + req.params.slug + '"'
    function getTodoItem(slug) {
    return knex('todos')
        .where({ slug: slug})
        .then( (todo) => {
            if(todo.length === 1) {
                res.send('<pre>' + JSON.stringify(todo, null, 4) + '</pre>')
            } else {
                res.status(404).send('todo not found :(')
            }
        })
    }
})


    // getOneTodo(req.params.slug)
    // .then(function (todo) {
    //   if (todo.length === 1) {
    //     res.send('<pre>' + JSON.stringify(todo[0]) + '</pre>')
    //   } else {
    //     res.status(404).send('todo not found :(')
    //   }
    // })

    // const todoItem = todoList.find(function(todo) {
    //     if (todo.id.toString() === req.params.id) {
    //         return res.send(todo);
    //     }
    // });



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
    todoList = todoList.filter((todo) => {
        if (todo.id.toString() !== req.params.id) {
            return true;
        }
        else {
            return false;
        }
    });
    res.send(todoList)
});

app.listen(port, function () {
    console.log('Listening on port ' + port + ' 👍')
  });


function renderTodo (todo) {
    return `
      <li><a href="/api/todos/${todo.slug}">${todo.title}</a></li>
    `
}



  // -----------------------------------------------------
// Database Stuff

const getAllTodosQuery = `
SELECT *
FROM todos
`

function getAllTodos () {
    return db.raw(getAllTodosQuery)
}



// function getOneTodo (slug) {
//     return 
//         knex('todos')
//             .where({ slug: slug})
//             .then( (todo) => {
//                 res.send('<pre>' + JSON.stringify(todo, null, 4) + '</pre>')
//             }
//             )};