/**
 * Created by qinlifang on 2017/7/7.
 */
const models = require('../models');
//const admin = require('../models/admin');
//const page = require('../models/page');
exports.login = async(ctx) => {
  console.log("==============",ctx.request.body)
  let user_name = ctx.query.user_name
  console.log('进入登录查询 user_name----', user_name)
  //console.log(JSON.stringify(models))
  return await models.admin.findAll({
    where: {
      user_name: user_name
    }
  })
};
