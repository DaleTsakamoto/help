'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('HelpingHands', [
      {
        likerId: 1,
        userId: 18,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        likerId: 7,
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        likerId: 8,
        userId: 19,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        likerId: 11,
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        likerId: 20,
        userId: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        likerId: 20,
        userId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        likerId: 4,
        userId: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        likerId: 13,
        userId: 16,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        likerId: 4,
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        likerId: 5,
        userId: 19,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        likerId: 14,
        userId: 9,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        likerId: 14,
        userId: 15,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        likerId: 1,
        userId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        likerId: 2,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        likerId: 18,
        userId: 13,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        likerId: 12,
        userId: 15,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        likerId: 11,
        userId: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        likerId: 16,
        userId: 13,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        likerId: 3,
        userId: 17,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        likerId: 15,
        userId: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        likerId: 11,
        userId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        likerId: 9,
        userId: 13,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('HelpingHands', {});
  }
};
