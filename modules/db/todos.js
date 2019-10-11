const {db} = require('./dbConnection.js')
const uuidv1 = require('uuidv1');


const getAllTodosQuery = `
SELECT *
FROM todos
`

function displayTodos (todoData) {
  getAllTodos()
      .then((allTodos) => {
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

// function insertuser(todoData) {
//     let todo_item = todoData.todo_item
//     let slug = uuidv1()
//     return db.raw("INSERT INTO users(firstName, lastName, email, slug, password) VALUES (?, ?, ?, ?, ?)", [todo_item, slug])
// }

// firstName, lastName, email, slug, password



//Public API

module.exports = {
    displayTodos: displayTodos,
    insertTodo: insertTodo,
    getAllTodos: getAllTodos,
    getOneTodo: getOneTodo,
    deleteTodo: deleteTodo
}