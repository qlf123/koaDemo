/**
 * Created by qinlifang on 2017/7/7.
 */
"use strict";
const Sequelize = require('sequelize');
const {INTEGER, STRING, DATE} = Sequelize;

module.exports = function (sequelize, Sequelize) {
  const Admin = sequelize.define("admin", {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_name: {
      type: STRING,
      defaultValue: '',
      comment: '”√ªß√˚'
    },
    password: {
      type: STRING,
      defaultValue: '',
      comment: ' √‹¬Î'
    },
    createdAt: {
      type: DATE
    },
    updatedAt: {
      type: DATE
    }
  });

  return Admin;
};