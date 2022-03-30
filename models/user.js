'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ role }) {
      // define association here
      this.belongsToMany(role, { through: 'userRoles', foreignKey: 'userId' })
    }
    toJSON() {
      return {
        ...this.get(),
        password: undefined,
        isDeleted: undefined
      }
    }
  }
  user.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: { type: DataTypes.STRING, unique: true, allowNull: false },
      password: DataTypes.STRING,
      interest: {
        type: DataTypes.STRING,
        defaultValue: 'Others',
        allowNull: false
      },
      isVerified: {
        type: DataTypes.ENUM,
        values: ['no', 'email'],
        defaultValue: 'no'
      },
      isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false }
    },
    {
      sequelize,
      modelName: 'user'
    }
  )
  return user
}
