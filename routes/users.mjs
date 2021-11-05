import express from 'express'
const router = express.Router()

import validation from '../middleware/validation.mjs'
import users from '../controller/users.mjs'
import common from '../middleware/common.mjs'
import user from '../middleware/users.mjs'

const { validate } = validation
const { getUsers, updateUser, deleteUser } = users
const { findUser, verifyRoles } = common
const { updateValidation } = user

router.get('/', validate, getUsers)
router.put('/', updateValidation, findUser, verifyRoles, updateUser)
router.delete('/', deleteUser)
export default router
