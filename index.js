
/**
 * Module dependencies.
 */

var render = require('./lib/render');
var logger = require('koa-logger');
var route = require('koa-route');
var views = require('co-views');
var parse = require('co-body');
var koa = require('koa');
var app = koa();

// "database"

var articles = [];

// middleware

app.use(logger());

// route middleware

app.use(route.get('/', list));
app.use(route.get('/article/:id', show));

// route definitions

/**
 * Post listing.
 */

function *list() {
  this.body = yield render('list', { articles: articles });
}

/**
 * Show post :id.
 */

function *show(id) {
  var article = articles[id];
  if (!article) this.throw(404, 'invalid post id');
  this.body = yield render('show', { article: article });
}

// listen

app.listen(3000);
console.log('listening on port 3000');
