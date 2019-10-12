const fs = require('fs');

//Express Server
const express = require('express');
const app = express();
const port = 3000;
const {db} = require('./modules/db/dbConnection')

// const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

//Modules
const log = require('./modules/logging.js');
const getDB = require('./modules/db/todos.js');
const mustache = require('mustache');
const {renderTodo, renderAllTodos} = require('./modules/rendering/rendering.js');

//Templating
const homepageTemplate = fs.readFileSync('./templates/homepage.mustache', 'utf8');

app.get('/api/todos', ensureAuth, (req, res) => {
  console.log("user - ", req.user)
  getDB.getAllTodos()
      .then((allTodos) => {
          if(allTodos) {
            res.send(mustache.render(homepageTemplate, { todosListHTML: renderAllTodos(allTodos) }))
          } else {
            res.status(404).send('Todos not found 😬')
        }
      });
  });

app.post('/api/todos', (req, res, nextFn) => {
  getDB.insertTodo(req.body)
  .then((allTodos) => {
    console.log('Added todo successfully')
    displayTodos();
  })
});

// GET /api/todos/:slug

app.get('/api/todos/:slug', (req, res, nextFn) => {
  getDB.getOneTodo(req.params.slug)
    .then((todo) => {
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

app.put('/api/todos/:slug', (req, res, nextFn) => {
    const todoItem = todoList.find((todo) => {
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

app.delete('/api/todos', (req, res, nextFn) => {
    log.info(req.body);
    // console.dir(req.body)
    // log.info(JSON.parse(req.body))
    // getDB.deleteTodo(req.body)
    // .then(function (result) {
    //     res.send('<ul>Removed todo Successfully!</ul>')
    // })
});

app.listen(port, () => {
    log.info('Listening on port ' + port + ' 🎉🎉🎉');
    // log.warn('This is a warning');
    // log.error('This is an error');
  });

// function getElInfo(){
//   console.log("hello")
// }






//Authentication
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());
const LocalStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy((email, password, done) => {
  console.log('got auth request') 
  db('users')
  .where({email: email})
  .then((userRows) => {
    let user = userRows[0]
    if (!user) {
      return done(null, false);
    }
    
    if (user.password != password) {
      return done(null, false);
    }
    return done(null, user);
  })
  .catch(err => {
    console.log('auth error - ', err)
  });
}
));


app.get('/auth', (req, res) => res.sendFile('auth.html', { root : __dirname}));


app.post('/auth',
  passport.authenticate('local', { failureRedirect: '/error' }),
  function(req, res) {
    req.session.passport
    res.redirect('/success?email='+req.user.email);
  }
  );

app.get('/success', (req, res) => res.send("Welcome "+req.query.email+"!!"));
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function(user, cb) {
  console.log("seiralize user -", user.id)

  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  User.findById(id, function(err, user) {
    cb(err, user);
  });
});

function ensureAuth(req, res, next) {
  if (passport.authenticate('local')) {
    console.log("user -", req.user)
    return next();
  }

  console.log('ensureAuth failed! ')
  res.redirect('/auth')
}