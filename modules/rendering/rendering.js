

function renderTodo (todo) {
    return `
      <li id="todo_item"><a href="/api/todos/${todo.slug}">${todo.todo_item}</a><button id="delete_button" data-id="${todo.slug}" type="button">X</button></li>
    `
}

function renderAllTodos (allTodos) {
    return '<ul>' + allTodos.map(renderTodo).join('') + '</ul>'
}

module.exports = {
    renderTodo: renderTodo,
    renderAllTodos: renderAllTodos
}