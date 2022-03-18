'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class locationLog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  locationLog.init(
    {
      ipAddress: DataTypes.STRING,
      long: DataTypes.STRING,
      lat: DataTypes.STRING,
      userId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'locationLog'
    }
  )
  return locationLog
}
