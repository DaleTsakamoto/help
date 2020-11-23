'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo_helper',
        helpType: true,
        hashedPassword: bcrypt.hashSync('password'),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: faker.image.avatar(),
        bio: faker.lorem.paragraph(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: 'demo@user2.io',
        username: 'Demo_helpee',
        helpType: false,
        hashedPassword: bcrypt.hashSync('password'),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: faker.image.avatar(),
        bio: faker.lorem.paragraph(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        helpType: false,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: faker.image.avatar(),
        bio: faker.lorem.paragraph(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        helpType: false,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: faker.image.avatar(),
        bio: faker.lorem.paragraph(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        helpType: false,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: faker.image.avatar(),
        bio: faker.lorem.paragraph(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        helpType: false,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: faker.image.avatar(),
        bio: faker.lorem.paragraph(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        helpType: true,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: faker.image.avatar(),
        bio: faker.lorem.paragraph(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        helpType: true,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: faker.image.avatar(),
        bio: faker.lorem.paragraph(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        helpType: false,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: faker.image.avatar(),
        bio: faker.lorem.paragraph(),
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        email: faker.internet.email(),
        username: faker.internet.userName(),
        helpType: true,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: faker.image.avatar(),
        bio: faker.lorem.paragraph(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        helpType: true,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: faker.image.avatar(),
        bio: faker.lorem.paragraph(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        helpType: false,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: faker.image.avatar(),
        bio: faker.lorem.paragraph(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        helpType: false,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: faker.image.avatar(),
        bio: faker.lorem.paragraph(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        helpType: true,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: faker.image.avatar(),
        bio: faker.lorem.paragraph(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        helpType: false,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: faker.image.avatar(),
        bio: faker.lorem.paragraph(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        helpType: true,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: faker.image.avatar(),
        bio: faker.lorem.paragraph(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        email: faker.internet.email(),
        username: faker.internet.userName(),
        helpType: true,
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatar: faker.image.avatar(),
        bio: faker.lorem.paragraph(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo_helper', 'Demo_helpee'] }
    }, {});
  }
};