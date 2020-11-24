'use strict';
const { Model, Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject() {
      const { id, username, email, firstName, lastName, helpType, zipCode } = this; // context will be the User instance
      return { id, username, email, firstName, lastName, helpType, zipCode };
    }
    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }
    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }
    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential,
          },
        },
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    }
    static async signup({ username, email, password, helpType, avatar, bio, firstName, lastName, zipCode }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        username,
        email,
        zipCode,
        hashedPassword,
        firstName,
        lastName,
        helpType,
        avatar,
        bio
      });
      return await User.scope('currentUser').findByPk(user.id);
    };
    static associate(models) {
      User.belongsToMany(models.User, {through: "Tasks", as: "helperTask", foreignKey: "helpeeId", otherKey: "helperId"});
      User.belongsToMany(models.User, {through: "Tasks", as: "helpeeTask", foreignKey: "helperId", otherKey: "helpeeId" });
      User.belongsToMany(models.User, {through: "Testimonies", as: "helperTestimony", foreignKey: "helpeeId", otherKey: "helperId"});
      User.belongsToMany(models.User, {through: "Testimonies", as: "helpeeTestimony", foreignKey: "helperId", otherKey: "helpeeId" });
      User.belongsToMany(models.User, {through: "helpingHands", as: "helperHand", foreignKey: "helpeeId", otherKey: "helperId"});
      User.belongsToMany(models.User, {through: "helpingHands", as: "helpeeHand", foreignKey: "helperId", otherKey: "helpeeId"});
    }
  };
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
        },
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
      helpType: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      zipCode: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      avatar: {
        type: DataTypes.STRING
      },
      bio: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"],
        },
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassword"] },
        },
        loginUser: {
          attributes: {},
        },
      },
    }
  );
  return User;
};