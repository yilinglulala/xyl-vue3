/*
 * @FilePath: \tools\server\src\error.js
 * @Description: 错误处理
 */
// 抛出500错误
const main500 = ctx => {
  ctx.throw(500);
};

// 抛出404
// 如果将ctx.response.status设置成404，就相当于ctx.throw(404)，返回404错误。请看下面的例子（完整代码看这里）。
// demos/15.js
const main404 = ctx => {
  ctx.response.status = 404;
  ctx.response.body = 'Page Not Found';
};

// 处理错误的中间件
const handler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500;
    ctx.response.body = {
      message: err.message
    };
  }
};

const main = ctx => {
  ctx.throw(500);
};

app.use(handler);
app.use(main);

// error 事件的监听
app.on('error', (err, ctx) =>
  console.error('server error', err)
);

// 手动触发error 事件
// 如果错误被try...catch捕获，就不会触发error事件。这时，必须调用ctx.app.emit()
const handler1 = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500;
    ctx.response.type = 'html';
    ctx.response.body = '<p>Something wrong, please contact administrator.</p>';
    ctx.app.emit('error', err, ctx); // 手动触发
  } 
};

const main1 = ctx => {
  ctx.throw(500);
};

app.on('error', function(err) {
  console.log('logging error ', err.message);
  console.log(err);
});