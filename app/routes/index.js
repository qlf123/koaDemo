const router = require('koa-router')()
const controller = require('../controllers');

// 渲染登录页
router.get('/', async (ctx, next) => {
  await ctx.render('login', {
  })
})
// TODO:登录 POST
router.post('login', controller.login.login)

router.get('string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})


// 获取图集列表
router.get('api/albums', controller.album.list)
// 新增图集 + 更新图集
router.post('api/albums', controller.album.save)
// 删除图集
router.del('api/albums', controller.album.del)
// 渲染图集页
router.get('album', controller.album.render)

// 上传本地文件
router.get('upload', async (ctx, next) => {
  await ctx.render('upload', {
    postUrl: 'upload'
  })
});
router.post('upload', controller.album.uploadFile);

// 上传文件到七牛云
router.get('uploadQiniu', async (ctx, next) => {
  await ctx.render('upload', {
    postUrl: 'qiniu'
  })
});
router.post('qiniu', controller.qiniu.uploadQiniu)

// POST demo
router.post('post', async (ctx,next) => {
  let id =ctx.request.body.id || 0;
  ctx.body = "you post data:"+JSON.stringify({id:id});
});
// delete demo
router.del('del', async (ctx,next) => {
  let id =ctx.request.body.id || 0;
  ctx.body = "you post data:"+JSON.stringify({id:id});
})

module.exports = router
