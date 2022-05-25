import express from 'express'
import { authorizeAdmin } from '../middleware/token.mjs'

import {
  getNotificationForAdmin,
  deleteReadNotification,
  updateNotificationStatus
} from '../controller/notification.mjs'
import {
  validateGetNotification,
  validateUpdateNotificationStatus
} from '../middleware/notification.mjs'
import {
  getNewJoinTourists,
  updateUser,
  deleteUser
} from '../controller/users.mjs'
import { getNewAds } from '../controller/agency/ads.mjs'
import { getAllBooking } from '../controller/booking.mjs'
import { getAllAgencies } from '../controller/users.mjs'
import { getContactUs } from '../controller/contactUs.mjs'
import { updateValidation } from '../middleware/users.mjs'

const router = express.Router()
router.get(
  '/notification',
  authorizeAdmin,
  validateGetNotification,
  getNotificationForAdmin
)
router.get('/contactUs', authorizeAdmin, getContactUs)
router.put(
  '/notification',
  authorizeAdmin,
  validateUpdateNotificationStatus,
  updateNotificationStatus
)
router.put('/user', authorizeAdmin, updateValidation, updateUser)
router.get('/newJoin', authorizeAdmin, getNewJoinTourists)
router.get('/newAds', authorizeAdmin, getNewAds)
router.get('/booking', authorizeAdmin, getAllBooking)
router.get('/agency', authorizeAdmin, getAllAgencies)
router.delete('/notification', authorizeAdmin, deleteReadNotification)
router.delete('/user', authorizeAdmin, deleteUser)

export default router
