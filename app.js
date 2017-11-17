const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const path = require('path')
const koaNunjucks = require('koa-nunjucks-2');
const session = require("koa-session2");
const Store = require("./store.js");
const cors = require('koa2-cors');

app.use(cors());
//const Store = require("koa-session2/libs/store");

//app.use(session({
//  key: "koa:sess",   //default "koa:sess"
//  store: new Store()
//}));

//app.use(ctx => {
//  let user = ctx.session.user;
//  ctx.session.view = "login";
//});

app.use(koaNunjucks({
  ext: 'html',
  path: path.join(__dirname, 'app/views'),
  nunjucksConfig: {
    trimBlocks: true
  }
}));

// const index = require('./app/routes/index')
// const users = require('./app/routes/users')
const mount = require('mount-koa-routes'); // 在动挂载路由
const multer = require('koa-multer'); // 文件上传

// error handler
onerror(app)


const upload = multer({ dest: 'uploads/' });

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/app/views', {
  extension: 'njk'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
// app.use(index.routes(), index.allowedMethods())
// app.use(users.routes(), users.allowedMethods())
mount(app, __dirname + '/app/routes', true)


module.exports = app
