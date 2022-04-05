import express from 'express'
import { createAd, getAds } from '../controller/agency/ads.mjs'
import { verificationImage } from '../middleware/uploader.mjs'
import { pinataUpload } from '../middleware/pinata.mjs'
import { authorizeAgency } from '../middleware/token.mjs'

const router = express.Router()

router.post('/', authorizeAgency, verificationImage, pinataUpload, createAd)
router.get('/', authorizeAgency, getAds)

export default router
