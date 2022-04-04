import db from '../../models/index.js'
import { httpError } from '../../common/httpError.mjs'
const { ads } = db
async function createAd(req, res, next) {
  let imageUrl = process.env.PINATA_DISPLAY + req.IpfsHash
  const userId = req.session.userRecord.userId
  // let record = await ads.create({
  //   discountamount: discount,
  //   phonenumber: phone,
  //   userId,
  //   imageUrl
  // })
  res.success({ data: record })
}

export { createAd }
