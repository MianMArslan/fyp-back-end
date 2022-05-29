'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.user, { foreignKey: 'userId', sourceKey: 'id' })
    }
  }
  notification.init(
    {
      message: DataTypes.STRING,
      type: DataTypes.ENUM(
        'newUser',
        'adsCreate',
        'booking',
        'documents',
        'message'
      ),
      receiverType: DataTypes.ENUM('admin', 'agency', 'tourist'),
      userId: DataTypes.INTEGER,
      receiverId: DataTypes.INTEGER,
      isRead: DataTypes.BOOLEAN
    },
    {
      sequelize,
      modelName: 'notification'
    }
  )
  return notification
}
