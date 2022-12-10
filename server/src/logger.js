/*
 * @FilePath: \tools\server\src\logger.js
 * @Description: 日志中间件
 * 像下面代码中的logger函数就叫做"中间件"（middleware），因为它处在 HTTP Request 和 HTTP Response 中间，用来实现某种中间功能。app.use()用来加载中间件。
 */

const logger = async (ctx, next) => {
  console.log(`${Date.now()} ${ctx.request.method} ${ctx.request.url}`)
  await next()
}
module.exports = { logger }
