const router = require('koa-router')()
// const albumRouter = require('../controllers/album')
// const userRouter = require('../controllers/user')
const controller = require('../controllers');


router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('albums', controller.album.list);

router.get('users', controller.user.list);

module.exports = router
