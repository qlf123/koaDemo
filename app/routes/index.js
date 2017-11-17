const router = require('koa-router')()
const controller = require('../controllers');
const https = require('https');
const querystring = require('querystring');
var crypto = require('crypto');
//发送请求
function getWechatAccessToken(options) {
  console.log('--------------------------2')
  return new Promise((resolve, reject) => {
    var req = https.request(options, function(res) {
      console.log('--------------------------3')
      res.setEncoding('utf8');
      res.on('data',function(chunk){
        var returnData = JSON.parse(chunk); // 如果服务器传来的是json字符串，可以将字符串转换成json
        console.log(returnData);
        resolve(returnData);
      });
    });
    //如果有错误会输出错误
    req.on('error', function(e){
      reject(e);
      console.log('-------------------------6666')
      console.log('错误：' + e.message);
    });
    req.end();
  });
}
function getWechatTicket(access_token) {
  const datas = querystring.stringify({
    access_token: access_token,
    type: 'jsapi'
  })
  const optionsT = {
    hostname: 'api.weixin.qq.com',
    path: '/cgi-bin/ticket/getticket?' + datas,
    method: 'GET'
  }
  return new Promise((resolve, reject) => {
    var req = https.request(optionsT, function(res) {
      console.log('--------------------------4')
      res.setEncoding('utf8');
      res.on('data',function(chunk){
        var returnData = JSON.parse(chunk);//如果服务器传来的是json字符串，可以将字符串转换成json
        console.log(returnData);
        resolve(returnData);
      });
    });
    //如果有错误会输出错误
    req.on('error', function(e){
      reject(e);
      console.log('-------------------------6666')
      console.log('错误：' + e.message);
    });
    req.end();
  });
}

router.get('/', async (ctx, next) => {
  console.log('time-------------' + ctx.query.time)
  console.log('--------------------------1')
  var data = querystring.stringify({
    grant_type: 'client_credential',
    appid: 'wx8b5172846a8c980e',
    secret: '280958f54f7ae725c7dba8de738c98d1'
  });
  console.log(data)
  var options = {
    hostname: 'api.weixin.qq.com',
    path: '/cgi-bin/token?' + data,
    method: 'GET'
  };
  const dataAccessToken = await getWechatAccessToken(options)
  const dataJson = await getWechatTicket(dataAccessToken.access_token)
  console.log(Date.parse(new Date()))
  if (dataJson) {
    // TODO:加密
    var timestamp = ctx.query.time
    var url = ctx.query.url
    console.log('dataJson.ticket--------------------' + dataJson.ticket)
    var content = 'jsapi_ticket=' + dataJson.ticket + '&noncestr=123456&timestamp=' + timestamp + '&url=' + url; // 加密的明文；
    console.log('console.log-----------------' + content)
    var shasum = crypto.createHash('sha1');
    shasum.update(content);
    var d = shasum.digest('hex');
    ctx.body = {
      return_code: 0,
      data: d
    }
  }
  //try{
  //
  //} catch (e) {
  //  console.log('-------------------------888')
  //  console.error(e);
  //}
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

// 获取page列表
router.get('api/page', controller.page.pageList)

// 获取图集列表
router.get('api/albums', controller.album.list)
router.get('api/albumsAll', controller.album.albumAll)
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
