import db from '../models/index.js'
import { httpError } from '../common/httpError.mjs'

const { notification, user, role } = db

async function createNotification(
  message,
  type,
  receiverType,
  receiverId,
  userId
) {
  try {
    let result = await notification.create({
      message,
      type,
      receiverType,
      userId,
      receiverId,
      isRead: false
    })
    if (result) return true
  } catch (error) {
    httpError(error.message)
  }
}

async function getNotification(req, res, next) {
  try {
    const { isRead } = req.query
    const receiverId = req.session.userRecord.userId
    const receiverType = req.session.userRole.title
    let result = await notification.findAndCountAll({
      where: { receiverType, receiverId, isRead },
      include: { model: user }
    })
    res.success({ data: result })
  } catch (error) {
    httpError(error.message)
  }
}

async function updateNotificationStatus(req, res, next) {
  try {
    const { id } = req.body
    let result = await notification.update(
      { isRead: true },
      {
        where: { id }
      }
    )
    res.success({ data: result })
  } catch (error) {
    httpError(error.message)
  }
}

async function deleteReadNotification(req, res, next) {
  try {
    const receiverType = req.session.userRole.title
    const { receiverId } = req.query
    let where = { isRead: true, receiverType }
    if (receiverId) where.receiverId = receiverId
    let result = await notification.destroy({
      where
    })
    if (result) res.success({ message: true, data: true })
  } catch (error) {
    httpError(error.message)
  }
}

async function getNotificationForAdmin(req, res, next) {
  try {
    const { isRead } = req.query
    const receiverType = req.session.userRole.title
    let result = await notification.findAndCountAll({
      where: { receiverType, isRead },
      include: { model: user, include: { model: role } }
    })
    res.success({ data: result })
  } catch (error) {
    httpError(error.message)
  }
}

export {
  createNotification,
  getNotification,
  updateNotificationStatus,
  deleteReadNotification,
  getNotificationForAdmin
}
