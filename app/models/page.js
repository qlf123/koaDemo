'use strict';
const Sequelize = require('sequelize');
module.exports = function(sequelize, Sequelize) {
  const Page = sequelize.define('pages', {
    name: Sequelize.STRING,
    text: Sequelize.TEXT,
    url: Sequelize.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Page;
};