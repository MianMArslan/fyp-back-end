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

const router = express.Router()
router.get(
  '/notification',
  authorizeAdmin,
  validateGetNotification,
  getNotificationForAdmin
)
router.put(
  '/notification',
  authorizeAdmin,
  validateUpdateNotificationStatus,
  updateNotificationStatus
)
router.delete('/notification', authorizeAdmin, deleteReadNotification)

export default router
