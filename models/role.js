'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ user }) {
      // define association here
      this.belongsToMany(user, { through: 'userRoles', foreignKey: 'roleId' })
    }
  }
  role.init(
    {
      title: { type: DataTypes.STRING, unique: true, allowNull: false },
      isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false }
    },
    {
      sequelize,
      modelName: 'role'
    }
  )
  return role
}
