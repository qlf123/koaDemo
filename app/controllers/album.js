'use strict';

const Album = require('../service/album');

exports.list = async (ctx, next) => {
  let page = ctx.query.page || 1;
  let count = ctx.query.count || 10;
  page = parseInt(page);
  count = parseInt(count);
  let albums = await Album.albumList(page, count);
  ctx.body = albums;
}

exports.add = async (ctx, next) => {
  console.log(ctx)
  let title = ctx.request.body.title
  console.log(title)
  let song_id = ctx.request.body.song_id
  let photos = ctx.request.body.photos || []
  let cover = ctx.request.body.cover
  let user_id = ctx.request.body.user_id
  if (!title || title == '' || !user_id || user_id == '') {
    console.log('POST albums')
    ctx.body = {
      status: {
        code: -2,
        message: '用户信息验证失败'
      }
    }
  } else {
    let albums = await Album.albumSave(title, song_id, photos, cover, user_id);
    ctx.body = {
      status: {
        code: 1,
        message: 'Success'
      },
      data: {
        id: 1
      }
    }
  }
}

exports.del = async (ctx, next) => {
  console.log('进入del')
  let id = ctx.request.body.id
  if (!id || id == '') {
    console.log('del albums')
    ctx.body = {
      status: {
        code: -2,
        message: '用户信息验证失败'
      }
    }
  } else {
    let albums = await Album.albumDel(id);
    ctx.body = {
      status: {
        code: 1,
        message: 'Success'
      },
      data: {
        id: 1
      }
    }
  }
}