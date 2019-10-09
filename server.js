const fs = require('fs');

//Express Server
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

//Authentication
const cors = require('cors');
const session = require('express-session')
const passport = require('passport')

//Modules
const log = require('./modules/logging.js');
const getDB = require('./modules/db/todos.js');
const mustache = require('mustache');
const uuidv1 = require('uuid/v1');
const {renderTodo, renderAllTodos} = require('./modules/rendering/rendering.js');

//Templating
const homepageTemplate = fs.readFileSync('./templates/homepage.mustache', 'utf8');
app.use(express.urlencoded({extended:false}))


app.get('/api/todos', function (req, res) {
  getDB.getAllTodos()
      .then(function (allTodos) {
          if(allTodos) {
            res.send(mustache.render(homepageTemplate, { todosListHTML: renderAllTodos(allTodos) }))
          } else {
            res.status(404).send('Todos not found 😬')
        }
      });
  });

app.post('/api/todos', function (req, res, nextFn) {
  getDB.insertTodo(req.body)
  .then(function (allTodos) {
    console.log('Added todo successfully')
    displayTodos()
  })
});

// GET /api/todos/:slug

app.get('/api/todos/:slug', function (req, res, nextFn) {
  getDB.getOneTodo(req.params.slug)
    .then(function (todo) {
        if (todo.length === 1) {
          res.send('<pre>' + JSON.stringify(todo[0]) + '</pre>')
        } else {
          res.status(404).send('Todo not found 😬')
        }
        })
    });

// POST /api/todos



// PUT /api/todos/:slug
// Still need to work on this, not totally imporant yet. Need to delete items first. 

app.put('/api/todos/:slug', function (req, res, nextFn) {
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

app.delete('/api/todos', function (req, res, nextFn) {
    log.info(req.body);
    console.dir(req.body)
    // log.info(JSON.parse(req.body))
    // getDB.deleteTodo(req.body)
    // .then(function (result) {
    //     res.send('<ul>Removed todo Successfully!</ul>')
    // })
});

app.listen(port, function () {
    log.info('Listening on port ' + port + ' 🎉🎉🎉');
    // log.warn('This is a warning');
    // log.error('This is an error');
  });

function getElInfo(){
  console.log("hello")
}