'use strict';

let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let dbConfig = require('./config/database');
let env = process.env.NODE_ENV;
let Routes = require('./config/routes');

// @todo: refactor initialization of routers
let pagesRouter = require('./controllers/pages-controller');

mongoose.connect(dbConfig[env].host);

app.use('/js', express.static('public/build/js'));
app.use('/images', express.static('public/assets/images'));
app.use('/css', express.static('public/build/css'));

if (env === 'DEVELOPMENT') {
  let morgan = require('morgan');
  app.use(morgan('dev'));
  //require('dotenv').load();
}

new Routes(app)
  .registerRoutes()
  .registerAPIRoutes()

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('jwt_secret', process.env.JWT_SECRET);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

module.exports = app;