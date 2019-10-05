const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'))

const dbConfigs = require('./knexfile.js');
const db = require('knex')(dbConfigs.development);

const mustache = require('mustache')

const uuidv1 = require('uuid/v1');

const homepageTemplate = fs.readFileSync('./templates/homepage.mustache', 'utf8');
app.use(express.urlencoded({extended:false}))


app.get('/api/todos', function (req, res) {
    getAllTodos()
      .then(function (allTodos) {
          if(allTodos) {
            res.send(mustache.render(homepageTemplate, { todosListHTML: renderAllTodos(allTodos) }))
          } else {
            res.status(404).send('Todos not found 😬')
        }
      });
  });

  app.post('/api/todos', function (req, res, nextFn) {
    insertTodo(req.body)
    .then(function (allTodos) {
      console.log('Added todo successfully')
      displayTodos()
    })
});


// GET /api/todos/:slug

app.get('/api/todos/:slug', function (req, res, nextFn) {
    getOneTodo(req.params.slug)
    .then(function (todo) {
        if (todo.length === 1) {
          res.send('<pre>' + JSON.stringify(todo[0]) + '</pre>')
        } else {
          res.status(404).send('Todo not found 😬')
        }
        })
    })

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
    console.log(req.body.slug)
    deleteTodo(req.body.slug)
    .then(function (result) {
        res.send('<ul>Removed todo Successfully!</ul>')
    })

    // .then(function (todo) {
    //     if (todo !== req.body) {
    //         return true;
    //     }
    //     else {
    //         return false;
    //     }
    // })

    // getAllTodos()
    // .then(function (allTodos) {
    // //   res.send('<pre>' + JSON.stringify(allTodos, null, 4) + '</pre>')
    // if (allTodos) {
    //     res.send('<ul>' + allTodos.map(renderTodo).join('') + '</ul>')
    //   } else {
    //     res.status(404).send('Todos not found 😬')
    //   }
    // })   
    // todoList = todoList.filter((todo) => {
    //     if (todo.slug !== req.params.slug) {
    //         return true;
    //     }
    //     else {
    //         return false;
    //     }
    // });
    // res.send(todoList)
});

app.listen(port, function () {
    console.log('Listening on port ' + port + ' 🎉🎉🎉')
  });




// -----------------------------------------------------------------------------
// HTML Rendering

function renderTodo (todo) {
    return `
      <li id="todo_item"><a href="/api/todos/${todo.slug}">${todo.todo_item}</a></li>
    `
}

  function renderAllTodos (allTodos) {
    return '<ul>' + allTodos.map(renderTodo).join('') + '</ul>'
  }
  
  // -----------------------------------------------------------------------------


  // -----------------------------------------------------
// Database Stuff

const getAllTodosQuery = `
SELECT *
FROM todos
`

function displayTodos (todoData) {
  getAllTodos()
      .then(function (allTodos) {
          if(allTodos) {
            res.send(mustache.render(homepageTemplate, { todosListHTML: renderAllTodos(allTodos) }))
          } else {
            res.status(404).send('Todos not found 😬')
        }
      });
}

function insertTodo(todoData) {
    let todo_item = todoData.todo_item
    let slug = uuidv1()
    return db.raw("INSERT INTO todos(todo_item, slug, isActive) VALUES (?, ?, true)", [todo_item, slug])
}

function getAllTodos () {
    return db.raw(getAllTodosQuery)
}

function getOneTodo (slug) {
    console.log(slug)
    return db.raw("SELECT * FROM todos WHERE slug = ?", [slug])
}

function deleteTodo (slug) {
    console.log("deleteTodo  " + slug)
    return db.raw("DELETE FROM todos WHERE slug = ?", [slug]);
}

// function getOneTodo (slug) {
//     return 
//         knex('todos')
//             .where({ slug: slug})
//             .then( (todo) => {
//                 res.send('<pre>' + JSON.stringify(todo, null, 4) + '</pre>')
//             }
//             )};