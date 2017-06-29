
const models = require('../models');

exports.albumList = async(page, count) => {
  const ablums = await models.album.findAndCount({
    attributes: ['id', 'title', 'created_at', 'visit_count', 'thumbup_count', 'cover', 'max_pos'],
    order: [['created_at', 'DESC']],
    // where: {user_id: user_id},
    include: [{
      model: models.photo,
      as: 'photos',
      attributes: ['image']
    }],
    distinct: true,
    offset: count * (page - 1),
    limit: count
  });

  return ablums;

};

exports.albumSave = async(title, song_id, photos, cover, user_id) => {
  console.log(photos)
  const photo = eval(photos)
  console.log('photo------' + photo)
  await models.album.create({
    title: title,
    song_id: song_id,
    user_id: user_id,
    cover: cover
  }).then((res) => {
    console.log('res------' + res.id)
    for(var i = 0; i < photo.length; i++) {
      models.photo.create({
        caption: photo[i].caption,
        image: photo[i].image,
        album_id: res.id
      })
    }
  });
};

exports.albumDel = async(id) => {
  await models.album.destroy({
    where:{
      id:{
        $like:id
      }
    }
  }).then((result) => {
    console.log('destroy album');
    console.log(result);
    models.photo.destroy({
      where:{
        album_id:{
          $like:id
        }
      }
    }).then((res) => {
      console.log('destroy photos');
      console.log(res);
    })
  });
}