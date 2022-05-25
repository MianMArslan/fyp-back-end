import db from '../models/index.js'
import { httpError } from '../common/httpError.mjs'

const { adsReview, Sequelize, user } = db
const Op = Sequelize.Op

async function getReview(req, res, next) {
  try {
    const { adId } = req.query
    let result = await adsReview.findAndCountAll({
      where: { addId: adId },
      include: [{ model: user }]
    })
    res.success({ data: result })
  } catch (error) {
    httpError(error.message)
  }
}

export { getReview }
