import express from 'express'
const router = express.Router()

import { getNearestTourist, getAds } from '../controller/tourist.mjs'
import { authorizeTourist } from '../middleware/token.mjs'
import { getNotification } from '../controller/notification.mjs'
import { getUserBYid } from '../controller/users.mjs'

router.get('/', authorizeTourist, getNearestTourist)
router.get('/ads', authorizeTourist, getAds)
router.get('/id', authorizeTourist, getUserBYid)
router.get('/notification', authorizeTourist, getNotification)

export default router
