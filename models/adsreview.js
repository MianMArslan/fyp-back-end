'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class adsReview extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.user, { foreignKey: 'id', sourceKey: 'userId' })
    }
  }
  adsReview.init(
    {
      comment: DataTypes.STRING,
      rating: DataTypes.FLOAT,
      addId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'adsReview'
    }
  )
  return adsReview
}
