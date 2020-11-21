'use strict';
module.exports = (sequelize, DataTypes) => {
  const HelpingHand = sequelize.define('HelpingHand', {
    hands: DataTypes.INTEGER,
    helperId: DataTypes.INTEGER,
    helpeeId: DataTypes.INTEGER
  }, {});
  HelpingHand.associate = function(models) {
    // associations can be defined here
  };
  return HelpingHand;
};