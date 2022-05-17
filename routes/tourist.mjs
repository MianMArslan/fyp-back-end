import express from 'express'
const router = express.Router()

import {
  getNearestTourist,
  getAds,
  generateRoom,
  sendNotificationForChat,
  sendChatRequest,
  checkChatRequest,
  closeChat,
  CreateBooking,
  GetBooking,
  getDiscountedAds
} from '../controller/tourist.mjs'
import { authorizeTourist } from '../middleware/token.mjs'
import {
  getNotification,
  deleteReadNotification,
  updateNotificationStatus
} from '../controller/notification.mjs'
import {
  validateGetNotification,
  validateUpdateNotificationStatus,
  validateDeleteNotification
} from '../middleware/notification.mjs'
import { getUserBYid } from '../controller/users.mjs'
import { changePassword } from '../common/changePassword.mjs'
import {
  validateChangePassword,
  validateCreateBooking
} from '../middleware/tourist.mjs'

router.get('/', authorizeTourist, getNearestTourist)
router.get('/ads', authorizeTourist, getAds)
router.get('/id', authorizeTourist, getUserBYid)
router.get('/notification', authorizeTourist, getNotification)
router.get('/chatRequest', authorizeTourist, checkChatRequest)
router.get('/booking', authorizeTourist, GetBooking)
router.get('/discountedAds', authorizeTourist, getDiscountedAds)
router.post('/generateRoom', authorizeTourist, generateRoom)
router.post('/chatNotification', authorizeTourist, sendNotificationForChat)
router.post('/chatRoom', authorizeTourist, sendChatRequest)
router.post('/chatRoomClose', authorizeTourist, closeChat)
router.post(
  '/createBooking',
  authorizeTourist,
  validateCreateBooking,
  CreateBooking
)
router.put(
  '/notification',
  authorizeTourist,
  validateUpdateNotificationStatus,
  updateNotificationStatus
)
router.put(
  '/changePassword',
  authorizeTourist,
  validateChangePassword,
  changePassword
)
router.delete(
  '/notification',
  authorizeTourist,
  validateDeleteNotification,
  deleteReadNotification
)
export default router
