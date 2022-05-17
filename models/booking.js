'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ ads }) {
      this.hasOne(ads, { foreignKey: 'id', sourceKey: 'adId' })
    }
  }
  Booking.init(
    {
      userId: DataTypes.INTEGER,
      adId: DataTypes.INTEGER,
      phone: DataTypes.INTEGER,
      name: DataTypes.STRING,
      status: DataTypes.ENUM('pending', 'accept', 'reject'),
      description: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Booking'
    }
  )
  return Booking
}
