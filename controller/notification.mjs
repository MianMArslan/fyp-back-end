import db from '../models/index.js'
import { httpError } from '../common/httpError.mjs'

const { notification } = db

async function createNotification(message, type, receiverType, userId) {
  try {
    let result = await notification.create(message, type, receiverType, userId)
    if (result) return true
  } catch (error) {
    httpError(error.message)
  }
}

async function getNotification(req, res, next) {
  try {
    const { isRead } = req.query
    const userId = req.session.userRecord.userId
    const receiverType = req.session.userRole.title
    let result = await notification.findAndCountAll({
      where: { receiverType, userId, isRead }
    })
    res.success({ message: true, data: result })
  } catch (error) {
    httpError(error.message)
  }
}

async function updateNotificationStatus(req, res, next) {
  try {
    const { id } = req.body
    const userId = req.session.userRecord.userId
    let result = await notification.update(
      { isRead: true },
      {
        where: { id, userId }
      }
    )
    res.success({ message: true, data: result })
  } catch (error) {
    httpError(error.message)
  }
}

async function deleteReadNotification(req, res, next) {
  try {
    const receiverType = req.session.userRole.title
    const userId = req.session.userRecord.userId
    let result = await notification.update(
      { isDeleted: true },
      {
        where: { receiverType, userId, isRead: true }
      }
    )
    if (result) return true
  } catch (error) {
    httpError(error.message)
  }
}

export {
  createNotification,
  getNotification,
  updateNotificationStatus,
  deleteReadNotification
}
