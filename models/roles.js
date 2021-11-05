'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ users }) {
      // define association here
      this.belongsToMany(users, { through: 'userRoles', foreignKey: 'roleId' })
    }
  }
  roles.init(
    {
      title: { type: DataTypes.STRING, unique: true, allowNull: false },
      isDeleted: { type: DataTypes.BOOLEAN, defaultValue: false }
    },
    {
      sequelize,
      modelName: 'roles'
    }
  )
  return roles
}
