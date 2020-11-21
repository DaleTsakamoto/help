'use strict';
module.exports = (sequelize, DataTypes) => {
  const Testimony = sequelize.define('Testimony', {
    comment: DataTypes.STRING,
    helperId: DataTypes.INTEGER,
    helpeeId: DataTypes.INTEGER
  }, {});
  Testimony.associate = function(models) {
    // associations can be defined here
  };
  return Testimony;
};