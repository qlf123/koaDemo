/*
 * Created by qinlifang on 2017/7/7.
*/
const Album = require('../service/album');
const Admin = require('../service/login');

exports.login = async (ctx, next) => {
  console.log('login-ctx', ctx)
  let user_name = ctx.request.body.user_name || ''
  let password = ctx.request.body.password || ''
  console.log('user_name-----------' + ctx.query.user_name)
  console.log('password-----------' + password)
  let page = ctx.query.page || 1;
  let count = ctx.query.count || 10;
  if (user_name === '' || password === '') {
    console.log('没有用户名和密码')
    await ctx.render('login', {
      error_message: '请输入用户名或密码'
    })
  } else {
    console.log('准备进入登录')
    let admin = await Admin.login(ctx)
  }
  //let albums = await Album.albumList(page, count);
  //let totalPages = Math.ceil(albums.count / count);
  //await ctx.render('album/album', {
  //  page: 1,
  //  count: 10,
  //  total_pages: totalPages,
  //  date: albums.rows
  //})
}
