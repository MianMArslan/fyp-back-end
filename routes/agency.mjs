import express from 'express'
import {
  createAd,
  getAds,
  markUnActive,
  deleteAds
} from '../controller/agency/ads.mjs'
import { verificationImage } from '../middleware/uploader.mjs'
import { pinataUpload } from '../middleware/pinata.mjs'
import { authorizeAgency } from '../middleware/token.mjs'
import {
  validateMarkUnActive,
  validateCreateAd,
  validateDelateAds
} from '../middleware/agency.mjs'
const router = express.Router()

router.post(
  '/',
  authorizeAgency,
  verificationImage,
  pinataUpload,
  validateCreateAd,
  createAd
)
router.get('/', authorizeAgency, getAds)
router.put('/active', authorizeAgency, validateMarkUnActive, markUnActive)
router.delete('/', authorizeAgency, validateDelateAds, deleteAds)

export default router
