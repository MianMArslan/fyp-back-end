'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ roles }) {
      // define association here
      this.belongsToMany(roles, { through: 'userRoles', foreignKey: 'userId' })
    }
    toJSON() {
      return {
        ...this.get(),
        id: undefined,
        password: undefined,
        isDeleted: undefined
      }
    }
  }
  users.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: { type: DataTypes.STRING, unique: true, allowNull: false },
      password: DataTypes.STRING,
      isVerified: {
        type: DataTypes.ENUM,
        values: ['no', 'email', 'admin'],
        defaultValue: 'no'
      },
      isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false }
    },
    {
      sequelize,
      modelName: 'users'
    }
  )
  return users
}
