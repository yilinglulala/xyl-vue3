/*
 * @FilePath: \tools\server\src\webApp.js
 * @Description: webApp 相关功能
 * 1. cookie
 * 2. 表单
 * 3. 上传
 */
// 中间件合成
const os = require('os');
const compose = require('koa-compose'); 
const setCookie = function (ctx, next) {
  if (ctx.request.path === '/cookie') {
    const n = Number(ctx.cookies.get('view') || 0) + 1 // 获取cookie
    ctx.cookies.set('view', n) // 设置cookie
    ctx.response.body = n + ' views'
  }
  next()
}
const getForm = function (ctx, next) {
  console.log(1, ctx.request.path)
  if (ctx.request.path === '/form') {
    console.log(ctx.request)
    const body = ctx.request.body;
    if (!body.name) ctx.throw(400, '.name required');
    ctx.body = { name: body.name };
  }
  next()
}
const upload = async function(ctx) {
  const tmpdir = os.tmpdir();
  const filePaths = [];
  const files = ctx.request.body.files || {};

  for (let key in files) {
    const file = files[key];
    const filePath = path.join(tmpdir, file.name);
    const reader = fs.createReadStream(file.path);
    const writer = fs.createWriteStream(filePath);
    reader.pipe(writer);
    filePaths.push(filePath);
  }

  ctx.body = filePaths;
};
const webAppCompose = compose([setCookie, getForm]);
module.exports = {
  webAppCompose,
  setCookie,
  getForm,
  // upload,
}
