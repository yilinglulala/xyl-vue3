/*
 * @FilePath: \tools\server\app.js
 * 阮一峰教程 https://www.ruanyifeng.com/blog/2017/08/koa.html
 */
const Koa = require('koa')
const path = require('path');
const fs = require('fs')
const route = require('koa-route')
const Router = require('koa-router')
const koaStatic = require('koa-static'); // 静态资源

const router = new Router()
const app = new Koa()

const static = koaStatic(path.join(__dirname, '/static'));
app.use(static)

// Context 对象
const main = (ctx) => {
  console.log(ctx.request.path)
  /**1 */
  // if (ctx.request.accepts('xml')) {
  //   // text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9
  //   ctx.response.type = 'xml';
  //   ctx.response.body = '<data>Hello World</data>';
  // } else if (ctx.request.accepts('json')) {
  //   ctx.response.type = 'json';
  //   ctx.response.body = { data: 'Hello World' };
  // } else if (ctx.request.accepts('html')) {
  //   ctx.response.type = 'html';
  //   ctx.response.body = '<p>Hello World</p>';
  // } else {
  //   ctx.response.type = 'text';
  //   ctx.response.body = 'Hello World';
  // }
  /**2 读取html*/
  // ctx.response.type = 'html';
  // ctx.response.body = fs.createReadStream('../index.html');
  /**3 路由*/
  if (ctx.request.path !== '/') {
    ctx.response.type = 'html';
    ctx.response.body = '<a href="/">Index Page</a>';
  } else {
    ctx.response.body = 'Hello World';
  }
}
app.use(main)

/**4 koa-route路由*/
const about = (ctx) => {
  ctx.response.type = 'html'
  ctx.response.body = '<a href="/">about page</a>'
}
const home = (ctx) => {
  ctx.response.body = 'home page'
}
app.use(route.get('/home', home))
app.use(route.get('/about', about))

// /**5 koa-router 路由*/
router.get('/', (ctx) => {
  ctx.body = 'use koa-router'
})
app.use(router.routes())



app.listen(3000)
console.log(`监听端口：3000`)
