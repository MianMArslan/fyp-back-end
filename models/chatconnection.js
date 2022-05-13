'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class chatConnection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  chatConnection.init(
    {
      senderId: DataTypes.INTEGER,
      receiverId: DataTypes.INTEGER,
      roomId: DataTypes.INTEGER,
      status: DataTypes.ENUM('pending', 'completed')
    },
    {
      sequelize,
      modelName: 'chatConnection'
    }
  )
  return chatConnection
}
