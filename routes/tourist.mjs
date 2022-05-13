import express from 'express'
const router = express.Router()

import {
  getNearestTourist,
  getAds,
  generateRoom,
  sendNotificationForChat,
  sendChatRequest,
  checkChatRequest,
  closeChat
} from '../controller/tourist.mjs'
import { authorizeTourist } from '../middleware/token.mjs'
import { getNotification } from '../controller/notification.mjs'
import { getUserBYid } from '../controller/users.mjs'

router.get('/', authorizeTourist, getNearestTourist)
router.get('/ads', authorizeTourist, getAds)
router.get('/id', authorizeTourist, getUserBYid)
router.get('/notification', authorizeTourist, getNotification)
router.get('/chatRequest', authorizeTourist, checkChatRequest)
router.post('/generateRoom', authorizeTourist, generateRoom)
router.post('/chatNotification', authorizeTourist, sendNotificationForChat)
router.post('/chatRoom', authorizeTourist, sendChatRequest)
router.post('/chatRoomClose', authorizeTourist, closeChat)

export default router
