import db from '../models/index.js'
import { httpError } from '../common/httpError.mjs'
import { createNotification } from './notification.mjs'
import { distance } from '../common/distance.mjs'

const { user, role, location, Sequelize, ads, chatRoom, chatConnection } = db
const Op = Sequelize.Op

async function getNearestTourist(req, res, next) {
  try {
    let currentUserLocation = await location.findOne({
      where: { userId: req.session.userRecord.userId }
    })
    const { latitude, longitude } = currentUserLocation
    let otherUsersLocation = []
    let value = await user.findAll({
      where: {
        isVerified: 'email',
        id: { [Op.ne]: req.session.userRecord.userId }
      },
      include: [
        { model: role, where: { title: 'tourist' } },
        { model: location }
      ]
    })
    await Promise.all(
      value.map(async (e) => {
        let othersRecord = distance(
          latitude,
          longitude,
          e.location.latitude,
          e.location.longitude,
          'K'
        )
        let distanceInKm = Number(othersRecord.toFixed(1))
        if (distanceInKm < 5) {
          otherUsersLocation.push({
            id: e.id,
            firstName: e.firstName,
            lastName: e.lastName,
            distance: distanceInKm
          })
        }
      })
    )
    res.success({ data: otherUsersLocation })
  } catch (error) {
    httpError(error.message)
  }
}

async function getAds(req, res, next) {
  try {
    let record = await ads.findAll({ where: { isDeleted: false } })
    res.success({ message: 'Successful', data: record })
  } catch (error) {
    httpError(error.message)
  }
}

async function generateRoom(req, res, next) {
  try {
    const roomId = Math.floor(Math.random() * 10000000) + 1
    let record = await chatRoom.findOne({
      where: { userId: req.session.userRecord.userId }
    })
    let value = null
    if (!record)
      value = await chatRoom.create({
        roomId,
        userId: req.session.userRecord.userId
      })
    else value = record
    res.success({ message: 'Successful', data: value })
  } catch (error) {
    httpError(error.message)
  }
}

async function sendNotificationForChat(req, res, next) {
  try {
    const { id } = req.body
    let value = createNotification(
      'Chat Request',
      'message',
      'tourist',
      id,
      req.session.userRecord.userId
    )
    if (value) res.success({ message: 'Request Send Successful', data: value })
  } catch (error) {
    httpError(error.message)
  }
}

async function sendChatRequest(req, res, next) {
  try {
    const { receiverId, roomId } = req.body
    const { userId } = req.session.userRecord
    let value = await chatConnection.findOne({
      where: { receiverId, roomId, senderId: userId, status: 'pending' }
    })
    if (value) {
      res.success({ data: record })
    } else {
      let record = await chatConnection.create({
        senderId: userId,
        receiverId,
        status: 'pending',
        roomId
      })
      if (record) res.success({ data: record })
    }
  } catch (error) {
    httpError(error.message)
  }
}

async function checkChatRequest(req, res, next) {
  try {
    const { userId } = req.session.userRecord
    let value = await chatConnection.findOne({
      where: {
        [Op.or]: [{ senderId: userId }, { receiverId: userId }],
        status: 'pending'
      }
    })
    if (value) res.success({ data: value })
    else res.success({ data: null })
  } catch (error) {
    httpError(error.message)
  }
}

async function closeChat(req, res, next) {
  try {
    const { userId } = req.session.userRecord
    let value = await chatConnection.update(
      { status: 'completed' },
      {
        where: { [Op.or]: [{ senderId: userId }, { receiverId: userId }] }
      }
    )
    if (value) res.success({ data: value })
  } catch (error) {
    httpError(error.message)
  }
}
export {
  getNearestTourist,
  getAds,
  generateRoom,
  sendNotificationForChat,
  sendChatRequest,
  checkChatRequest,
  closeChat
}
