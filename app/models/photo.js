"use strict";
const Sequelize = require('sequelize');
const {INTEGER, STRING, DATE} = Sequelize;

module.exports = function (sequelize, Sequelize) {
  const Photo = sequelize.define("photo", {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    album_id: {
      type: INTEGER,
      allowNull: false,
      comment: '图集ID'
    },
    image: {
      type: STRING,
      defaultValue: '',
      comment: ' 图片'
    },
    caption: {
      type: STRING,
      defaultValue: '',
      comment: ' 图片描述'
    },
    pos: {
      type: INTEGER,
      defaultValue: 0,
      comment: ' 图片排序位置'
    },
    created_at: {
      type: DATE
    },
    updated_at: {
      type: DATE
    },
    section_id: {
      type: INTEGER,
      comment: '段落ID',
    },
    filter: {
      type: STRING,
      comment: '图片滤镜名称 客户端根据名称渲染图片',
      defaultValue: ''
    }
  }, {
    timestamps: true,
    createAt: 'created_at',
    updateAt: 'updated_at',
    underscored: true
  });

  Photo.associate = function(models) {
    Photo.belongsTo(models.album);
  };
  return Photo;
};