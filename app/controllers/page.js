/*
 * Created by qinlifang on 2017/7/7.
*/
const page = require('../service/page');

exports.pageList = async (ctx, next) => {
  console.log('进入controllers-pages')
  let pages = await page.pageList();
  ctx.body = pages;
}
