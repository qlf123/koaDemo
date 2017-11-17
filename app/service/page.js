/**
 * Created by qinlifang on 2017/7/13.
 */
const models = require('../models');

exports.pageList = async() => {
  return await models.page.findAll()
};