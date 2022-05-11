import express from 'express'
const router = express.Router()

import { getNearestTourist } from '../controller/tourist.mjs'
import { authorizeTourist } from '../middleware/token.mjs'
router.get('/', authorizeTourist, getNearestTourist)

export default router
