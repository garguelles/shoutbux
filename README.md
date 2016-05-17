# Shoutbux

# Stack

#### Server
* Express
* Mongoose
* Supertest
* Mocha
* Should.js

#### Client
* Backbone / Marionette
* Backbone-Routing
* Backbone.Service
* Backbone.Radio
* Stylus
* Jade
* Webpack
* Babel
* Gulp

[![Join the chat at https://gitter.im/garguelles/fullstack-marionette](https://badges.gitter.im/garguelles/fullstack-marionette.svg)](https://gitter.im/garguelles/fullstack-marionette?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[![Dependency Status](https://david-dm.org/garguelles/fullstack-marionette.svg)](https://david-dm.org/garguelles/fullstack-marionette)

### Getting Started

Just [clone](github-windows://openRepo/https://github.com/garguelles/shoutbux.git) or [fork](https://github.com/garguelles/shoutbux/fork) the repo and start hacking:

```shell
$ npm install
```

Setup database connection strings
```shell
$ cp ./config/database.sample.js ./config/database.js
```

Setup .env files (Environment Variables using dotenv package)
.env for development and .env.test for testing environment
just replace config values depending on your local configurations

```shell
$ cp ./config/env/.env.sample ./config/env/.env
```

### A Note on ES Classes
ES2015 Classes do *not* work well with Backbone or Marionette at time of writing. See https://github.com/jashkenas/backbone/issues/3560. Use Backbone's built in extend functions to get around this for the time being.

### Build
Builds a minified version of the application in the dist folder.

```shell
$ gulp build --type production
```

### How to Test

Run unit tests and integration tests are powered by [Supertest](https://github.com/visionmedia/supertest), [Mocha](http://mochajs.org/) and [Should](https://shouldjs.github.io):

```shell
$ npm test
```
see package.json for complete test command

### How to seed

Install node-mongo-seeds package then run the seed command

```shell
$ npm install -g node-mongo-seeds
$ npm run seed
```

### Development
Builds the application and starts a webserver with livereload. By default the webserver starts at port 3000.

```shell
$ gulp
```

By default, it builds in debug mode.

* If you need to build in release mode, add `--type production` flag.

### Learn More

 * [Backbone.js](http://backbonejs.org/)
 * [Jade](http://jade-lang.com/)
 * [Marionette.js](http://marionettejs.com/)
 * [Webpack](http://webpack.github.io/)
 * [Babel - Use next generation JavaScript, today](https://babeljs.io/)

### Copyright

Licensed under MIT License (MIT). See [LICENSE.txt](./LICENSE)
