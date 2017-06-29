const router = require('koa-router')()
const controller = require('../controllers');
const multer = require('koa-multer');
const upload = multer({ dest: 'uploads/' });

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
// 获取图集列表
router.get('albums', controller.album.list)
// 新增图集
router.post('albums', controller.album.add)
// 删除图集
router.del('albums', controller.album.del)

// 上传本地文件
router.get('upload', (ctx, next) => {
  ctx.body = '<form method="POST" action="/profile" enctype="multipart/form-data">请选择上传的文件：<input type="file" name="upfiles"> <input type="submit" value="OK"> </form>';
});
router.post('profile', upload.single('upfiles'),function (ctx, next){
  ctx.body = {
    path: ctx.req.file
  }
});


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
