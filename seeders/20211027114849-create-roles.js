'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     */ Example: await queryInterface.bulkInsert(
      'roles',
      [
        {
          title: 'admin',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          title: 'default',
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
     */ Example: await queryInterface.bulkDelete('roles', null, {})
  }
}
