/**
 * Created by qinlifang on 2017/6/29.
 */
//const multer = require('koa-multer');
//const upload = multer({ dest: 'uploads/' });

const inspect = require('util').inspect
const path = require('path')
const os = require('os')
const fs = require('fs')
const Busboy = require('busboy')
const qiniu = require('qiniu')
const config = require('../../config')

let serverFilePath = path.join( __dirname, '../../file' )


exports.uploadQiniu = async (ctx, next) => {
  //await uploadFile(ctx, {
  //  fileType: 'upload',
  //  path: serverFilePath
  //}).then((res) => {
  //  ctx.body = {
  //    data: res
  //  }
  //})
  console.log('config---', config.qiniu.ak)
  let result = await uploadFile(ctx, next)
  return result
}

/**
 * 同步创建文件目录
 * @param  {string} dirname 目录绝对地址
 * @return {boolean}        创建目录结果
 */
function mkdirsSync( dirname ) {
  if (fs.existsSync( dirname )) {
    return true
  } else {
    if (mkdirsSync( path.dirname(dirname)) ) {
      fs.mkdirSync( dirname )
      return true
    }
  }
}

/**
 * 获取上传文件的后缀名
 * @param  {string} fileName 获取上传文件的后缀名
 * @return {string}          文件后缀名
 */
function getSuffixName( fileName ) {
  let nameList = fileName.split('.')
  return nameList[nameList.length - 1]
}

/**
 * 上传文件
 * @param  {object} ctx     koa上下文
 * @param  {object} options 文件上传参数 fileType文件类型， path文件存放路径
 * @return {promise}
 */
function uploadFile( ctx, options) {
  let req = ctx.req
  let res = ctx.res
  let busboy = new Busboy({headers: req.headers})
  // 获取类型
  //let fileType = options.fileType || 'common'
  //let filePath = path.join( options.path,  fileType)
  //let mkdirResult = mkdirsSync( filePath )

  return new Promise((resolve, reject) => {
    console.log('文件上传中...')
    let result = {
      success: false,
      formData: {}
    }

    // 解析请求文件事件
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
      //let fileName = Math.random().toString(16).substr(2) + '.' + getSuffixName(filename)
      //let _uploadFilePath = path.join( filePath, fileName )
      //let saveTo = path.join(_uploadFilePath)
      let fileSuffix = getSuffixName(filename)

      // 文件保存到制定路径
      //file.pipe(fs.createWriteStream(saveTo))

      // 解析流文件-文件上传到七牛云
      file.on('data', function(data) {
        console.log(`File [${fieldname}] got ${data.length} bytes`)
        let result = uploadToQiniu(data, filename)
        ctx.body = result
      })

      // 文件写入事件结束
      file.on('end', function() {
        result.success = true
        result.message = '文件上传成功'
        console.log('文件上传成功！')
        resolve(result)
      })
    })

    // 解析表单中其他字段信息
    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
      console.log('表单字段数据 [' + fieldname + ']: value: ' + inspect(val));
      result.formData[fieldname] = inspect(val);
    });

    // 解析结束事件
    busboy.on('finish', function( ) {
      console.log('文件上结束')
      resolve(result)
    })

    // 解析错误事件
    busboy.on('error', function(err) {
      console.log('文件上出错')
      reject(result)
    })

    req.pipe(busboy)
  })
}

function uploadToQiniu(file, filename) {
  const config = require('../../config')
  //console.log('file----' + file)
  //let suffixFile = fileSuffix
  //let key = raw.toString('hex') + '.' + suffixFile
  let key = new Date().getTime() + filename

  let mac = new qiniu.auth.digest.Mac(config.qiniu.ak, config.qiniu.sk);
  let options = {
    scope: config.qiniu.bucket
  };
  let putPolicy = new qiniu.rs.PutPolicy(options);
  let uploadToken = putPolicy.uploadToken(mac);

  let configNew = new qiniu.conf.Config()
  configNew.zone = qiniu.zone.Zone_z0
  let formUploader = new qiniu.form_up.FormUploader(configNew);
  let putExtra = new qiniu.form_up.PutExtra();
  // 文件上传 use 数据流上传（表单方式）
  formUploader.put(uploadToken, key , file, putExtra, function(respErr, respBody, respInfo) {
    if (respErr) {
      console.log('err')
      //throw respErr;
    }
    if (respInfo.statusCode == 200) {
      //resolve(respBody.key);
      console.log('成功---', respInfo)
      let data = {
        requestUrls: respInfo.requestUrls,
        key: respInfo.data.key
      }
      return data
    } else {
      console.log(respInfo.statusCode, respBody);
    }
  });
}