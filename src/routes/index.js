let express = require('express');
let app = express();
let path = require('path');
let morgan = require('morgan');
let bodyParser = require('body-parser');
let cors = require('cors');
let handlebars = require('express-handlebars');
let session = require('express-session');
let MongoDBStore = require('connect-mongodb-session')(session);
let store = new MongoDBStore({ uri: process.env.DB, collection: 'mySessions' });

app.engine('hbs', handlebars({defaultLayout: 'index', extname: '.hbs'}));
app.set('view engine', 'hbs');

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(require('express-session')({
  secret: 'SessionSecret',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  },
  store: store,
  resave: true,
  saveUninitialized: true
}));

app.get('/', (req, res) => {
  res.render('home');
});

app.get('/error', (req, res) => {
  if(req.query.message) {
    return res.render('error', {message: req.query.message});
  }
  return res.render('error', {message: 'Server Error'})
});

app.use('/user', require('./user-router'));
app.use('/auth', require('./auth-router'));

app.get('*', (req, res) => {
  res.redirect('/error?message=404 Not Found')
});

module.exports = app;
