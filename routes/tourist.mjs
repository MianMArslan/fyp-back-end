import express from 'express'
const router = express.Router()

import { getNearestTourist } from '../controller/tourist.mjs'
import { authorizeTourist } from '../middleware/token.mjs'
import { getNotification } from '../controller/notification.mjs'

router.get('/', authorizeTourist, getNearestTourist)
router.get('/notification', authorizeTourist, getNotification)

export default router
