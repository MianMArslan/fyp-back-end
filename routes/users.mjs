import express from 'express'
const router = express.Router()

import { validate } from '../middleware/validation.mjs'
import { getUsers, updateUser, deleteUser } from '../controller/users.mjs'
import { findUser, verifyRoles } from '../middleware/common.mjs'
import user from '../middleware/users.mjs'

const { updateValidation } = user

router.get('/', validate, getUsers)
router.put('/', updateValidation, findUser, verifyRoles, updateUser)
router.delete('/', deleteUser)
export default router
