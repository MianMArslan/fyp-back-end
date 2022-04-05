import db from '../../models/index.js'
import { httpError } from '../../common/httpError.mjs'
const { ads } = db
async function createAd(req, res, next) {
  let imageUrl = process.env.PINATA_DISPLAY + req.IpfsHash
  try {
    const userId = req.session.userRecord.userId
    let record = await ads.create({
      userId,
      imageUrl
    })
    res.success()
  } catch (error) {
    httpError(error.message)
  }
}

async function getAds(req, res, next) {
  try {
    const userId = req.session.userRecord.userId
    let record = await ads.findAll({ where: { userId, isDeleted: false } })
    res.success({ message: 'Successful', data: record })
  } catch (error) {
    httpError(error.message)
  }
}

export { createAd, getAds }
