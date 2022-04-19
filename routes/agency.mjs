import express from 'express'
import {
  createAd,
  getAds,
  markUnActive,
  deleteAds,
  updateAd
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
router.put('/active', authorizeAgency, validateMarkUnActive, markUnActive)
router.put('/', authorizeAgency, validateUpdateAd, updateAd)
router.delete('/:id', authorizeAgency, validateDelateAds, deleteAds)

export default router
