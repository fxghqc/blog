
'use strict';

/**
 * Module dependencies.
 */

var logger = require('koa-logger');
var route = require('koa-route');
var livereload = require('koa-livereload');
var hbs = require('koa-hbs');
var koa = require('koa');
var app = koa();

// "database"

var articles = [
  {
    title: "title1",
    content: "content1"
  },
  {
    title: "title2",
    content: "content2"
  },
  {
    title: "title3",
    content: "content3"
  },
  {
    title: "title4",
    content: "content4"
}];

// middleware

app.use(hbs.middleware({
  viewPath: __dirname + '/views',
  extname: '.html'
}));
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
