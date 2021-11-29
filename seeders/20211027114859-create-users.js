'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     */ Example: await queryInterface.bulkInsert(
      'users',
      [
        {
          firstName: 'M',
          lastName: 'Arslan',
          email: 'mian.m.arslan@hotmail.com',
          password:
            '$2b$10$dX9jrxWEv8VQQn82uaowKeZiW4sMBGBAyi5y2oUX9O.A0Iy4g.lhu',
          isVerified: 'email',
          isDeleted: false,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     */ Example: await queryInterface.bulkDelete('users', null, {})
  }
}
