import express from 'express'
import { createAd } from '../controller/agency/ads.mjs'
import { verificationImage } from '../middleware/uploader.mjs'
import { pinataUpload } from '../middleware/pinata.mjs'
const router = express.Router()

router.post('/', verificationImage, pinataUpload, createAd)

export default router
