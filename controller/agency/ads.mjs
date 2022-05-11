import db from '../../models/index.js'
import { httpError } from '../../common/httpError.mjs'
import { createNotification } from '../notification.mjs'
const { ads, Sequelize, user, role } = db
const Op = Sequelize.Op

async function createAd(req, res, next) {
  let imageUrl = process.env.PINATA_DISPLAY + req.IpfsHash
  try {
    const {
      briefdescription,
      actualamount,
      discountamount,
      phonenumber,
      Destination
    } = req.body
    const userId = req.session.userRecord.userId
    let record = await ads.create({
      userId,
      imageUrl,
      active: true,
      amount: actualamount,
      description: briefdescription,
      discount: discountamount,
      phone: phonenumber,
      destination: Destination,
      isDeleted: false
    })
    await createNotification('New ad created', 'adsCreate', 'admin', userId)
    res.success({ message: 'Successful', data: record })
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

async function markUnActive(req, res, next) {
  try {
    const { active, id } = req.body
    const userId = req.session.userRecord.userId
    let record = await ads.update(
      { active: !active },
      { where: { userId, isDeleted: false, id } }
    )
    res.success({ message: 'Status Update Successfully', data: record })
  } catch (error) {
    httpError(error.message)
  }
}

async function deleteAds(req, res, next) {
  try {
    const { id } = req.query
    const userId = req.session.userRecord.userId
    let record = await ads.update(
      { isDeleted: true },
      { where: { userId, id } }
    )
    res.success({ message: 'Successful', data: record })
  } catch (error) {
    httpError(error.message)
  }
}

async function updateAd(req, res, next) {
  try {
    const { amount, description, discount, phone, id } = req.body
    const userId = req.session.userRecord.userId
    let record = await ads.update(
      {
        amount,
        description,
        discount,
        phone
      },
      { where: { id, userId } }
    )
    res.success({ message: 'Successful', data: record })
  } catch (error) {
    httpError(error.message)
  }
}

async function getCount(req, res, next) {
  try {
    let countActive = {}
    let count = {}
    const userId = req.session.userRecord.userId
    let record = await ads.count({
      where: { userId, isDeleted: false, active: true }
    })
    let recordFalse = await ads.count({
      where: { userId, isDeleted: false, active: false }
    })
    countActive.active = record
    count.inActive = recordFalse
    res.success({ message: 'Successful', data: [countActive, count] })
  } catch (error) {
    httpError(error.message)
  }
}

async function getNewAds(req, res) {
  try {
    const record = await ads.findAll({
      limit: 4,
      order: [['createdAt', 'DESC']],
      where: { isDeleted: false }
    })
    return res.success({ data: record })
  } catch (error) {
    return httpError(error.message)
  }
}

export {
  createAd,
  getAds,
  markUnActive,
  deleteAds,
  updateAd,
  getCount,
  getNewAds
}
