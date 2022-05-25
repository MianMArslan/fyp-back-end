import express from 'express'
import {
  createAd,
  getAds,
  markUnActive,
  deleteAds,
  updateAd,
  getCount,
  getBookingCount,
  getBooking,
  updateBookingStatus
} from '../controller/agency/ads.mjs'
import { verificationImage } from '../middleware/uploader.mjs'
import { pinataUpload } from '../middleware/pinata.mjs'
import { authorizeAgency } from '../middleware/token.mjs'
import {
  validateMarkUnActive,
  validateCreateAd,
  validateDelateAds,
  validateUpdateAd
} from '../middleware/agency.mjs'
import { changePassword } from '../common/changePassword.mjs'
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
import { getReview, getReviewByID } from '../controller/review.mjs'

const router = express.Router()

router.post(
  '/',
  authorizeAgency,
  verificationImage,
  pinataUpload,
  validateCreateAd,
  createAd
)
router.post('/changePassword', authorizeAgency, changePassword)
router.get('/', authorizeAgency, getAds)
router.get('/count', authorizeAgency, getCount)
router.get('/orderCount', authorizeAgency, getBookingCount)
router.get('/orders', authorizeAgency, getBooking)
router.post('/orderStatus', authorizeAgency, updateBookingStatus)
router.put('/active', authorizeAgency, validateMarkUnActive, markUnActive)
router.put('/', authorizeAgency, validateUpdateAd, updateAd)
router.get(
  '/notification',
  authorizeAgency,
  validateGetNotification,
  getNotification
)
router.get('/review', authorizeAgency, getReview)
router.get('/review/id', authorizeAgency, getReviewByID)
router.get('/id', authorizeAgency, getUserBYid)

router.put(
  '/notification',
  authorizeAgency,
  validateUpdateNotificationStatus,
  updateNotificationStatus
)
router.delete(
  '/notification',
  authorizeAgency,
  validateDeleteNotification,
  deleteReadNotification
)
router.delete('/:id', authorizeAgency, validateDelateAds, deleteAds)

export default router
