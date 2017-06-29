"use strict";
const moment = require('moment');
const Sequelize = require('sequelize');
const {INTEGER, STRING, DATE} = Sequelize;

module.exports = function (sequelize, Sequelize) {
  const Album = sequelize.define('album', {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: STRING,
      defaultValue: '',
      comment: '图集标题'
    },
    cover: {
      type: STRING,
      defaultValue: '',
      comment: '图集封面'
    },
    user_id: {
      type: INTEGER,
      allowNull: false,
      comment: ' 用户ID'
    },
    song_id: {
      type: INTEGER,
      defaultValue: 0,
      comment: ' 背景音乐ID'
    },
    visit_count: {
      type: INTEGER,
      defaultValue: 0,
      comment: ' 浏览数'
    },
    thumbup_count: {
      type: INTEGER,
      defaultValue: 0,
      comment: ' 点赞数'
    },
    max_pos: {
      type: INTEGER,
      defaultValue: 0,
      comment: '图片内容集数量'
    },
    created_at: {
      type: DATE,
      get() {
        let created_at = this.getDataValue('created_at');
        created_at = moment(created_at).format('YYYY-MM-DD HH:mm:ss');
        return created_at
      },
      set(created_at) {
        return this.setDataValue('created_at', created_at)
      }
    },
    updated_at: {
      type: DATE
    }
  }, {
    timestamps: true,
    createAt: 'created_at',
    updateAt: 'updated_at',
    underscored: true,
    index: [
      {
        fields: ['user_id']
      }
    ]
  });

  Album.associate = function(models) {
    Album.hasMany(models.photo, {foreignKey: 'album_id'});
  };

  return Album;
};