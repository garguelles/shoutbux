'use strict';

/*
 * load proper env file
 * test or development
 */
if (!(process.env.NODE_ENV == 'production')) {
  if (process.env.NODE_ENV == 'test')
    require('dotenv').config({path: './config/env/.env.test'});
  else
    require('dotenv').config({path: './config/env/.env'});
}

let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let dbConfig = require('./config/database');
let env = process.env.NODE_ENV;
let Routes = require('./config/routes');

mongoose.connect(dbConfig[env].host);

app.use('/js', express.static('public/build/js'));
app.use('/images', express.static('public/assets/images'));
app.use('/css', express.static('public/build/css'));

if (env === 'DEVELOPMENT') {
  let morgan = require('morgan');
  app.use(morgan('dev'));
}

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('jwt_secret', process.env.JWT_SECRET);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/*
 * register routes
 */
new Routes(app)
  .registerRoutes()
  .registerAPIRoutes()

module.exports = app;
