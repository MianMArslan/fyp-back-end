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
import { getNewJoinTourists } from '../controller/users.mjs'
import { getNewAds } from '../controller/agency/ads.mjs'

const router = express.Router()
router.get(
  '/notification',
  authorizeAdmin,
  validateGetNotification,
  getNotificationForAdmin
)
router.put(
  '/notificationStatus',
  authorizeAdmin,
  validateUpdateNotificationStatus,
  updateNotificationStatus
)
router.delete('/notification', authorizeAdmin, deleteReadNotification)
router.get('/newJoin', authorizeAdmin, getNewJoinTourists)
router.get('/newAds', authorizeAdmin, getNewAds)

export default router
