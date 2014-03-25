
'use strict';

/**
 * Module dependencies.
 */

var path = require('path');
var parse = require('co-body');
var logger = require('koa-logger');
var route = require('koa-route');
var livereload = require('koa-livereload');
var render = require('koa-swig');
var koa = require('koa');
var app = koa();

// render

render(app, {
  root: path.join(__dirname, 'views'),
  autoescape: true,
  cache: false,
  ext: 'html'
});

// "database"

var articles = [];

// middleware

app.use(logger());
app.use(livereload());

// route middleware

app.use(route.get('/', list));
app.use(route.get('/article/:id', show));

// route definitions

/**
 * Post listing.
 */

function *list() {
  yield this.render('list', { articles: articles });
}

/**
 * Show post :id.
 */

function *show(id) {
  var article = articles[id];
  if (!article) this.throw(404, 'invalid post id');
  yield render('show', { article: article });
}

// listen

app.listen(3000);
console.log('listening on port 3000');
