var todoList = document.getElementById("todo_list");

todoList.addEventListener("click", function (event) {
    console.dir(event.target.dataset.id)
    let todoSlug = event.target.dataset.id;
    let url = '/api/todos'
        fetch(url, {
            method: 'DELETE',
            body: JSON.stringify({slug: todoSlug})
        }).then(response => {
            response.json().then(json => {
                return json;
            })
        }).catch((err) => {
            console.error('there was an error:', err)
        })
}, false);