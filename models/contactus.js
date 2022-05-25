'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class contactUs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  contactUs.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      suggestion: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'contactUs'
    }
  )
  return contactUs
}
