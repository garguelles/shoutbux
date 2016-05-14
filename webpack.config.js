var entry = './public/apps/admin/main.js',
output = {
  path: __dirname,
  filename: '[name].js'
};
var path = require('path');
var webpack = require('webpack');

module.exports.development = {
  debug : true,
  devtool : 'eval',
  entry: {
    Shoutbox: './public/apps/shoutbox/main.js',
    Login: './public/apps/login/main.js'
  },
  output: output,
  module : {
    loaders : [{
      test: /\.js?$/,
      //exclude: /node_modules/,
      include: [ path.resolve(__dirname, "public/apps") ],
      loader: 'babel-loader'
    },
      {
        test: /\.jade/,
        include: [path.resolve(__dirname, "public/apps")],
        loader: 'jade-loader'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jade'],
    alias: {
      backbone: path.join(__dirname, 'node_modules', 'backbone', 'backbone')
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ]
};

module.exports.production = {
  debug: false,
  entry: {
    Shoutbox: './public/apps/shoutbox/main.js',
    Login: './public/apps/login/main.js'
  },
  output: output,
  module : {
    loaders : [{
      test: /\.js?$/,
      //exclude: /node_modules/,
      include: [ path.resolve(__dirname, "public/apps") ],
      loader: 'babel-loader'
    },
      {
        test: /\.jade/,
        include: [path.resolve(__dirname, "public/apps")],
        loader: 'jade-loader'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jade'],
    alias: {
      backbone: path.join(__dirname, 'node_modules', 'backbone', 'backbone')
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ]
};
