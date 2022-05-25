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
    let avg = 0
    await Promise.all(result.rows.map((row) => (avg += row.rating)))
    result.avg = avg
    res.success({ data: result })
  } catch (error) {
    httpError(error.message)
  }
}

async function getReviewByID(req, res, next) {
  try {
    const { adId, userId } = req.query
    let result = await adsReview.findOne({
      where: { addId: adId, userId }
    })
    res.success({ data: result })
  } catch (error) {
    httpError(error.message)
  }
}

export { getReview, getReviewByID }
