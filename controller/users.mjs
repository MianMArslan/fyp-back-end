import bcrypt from 'bcrypt'
import db from '../models/index.js'
import _ from 'lodash'
import jwt_decode from 'jwt-decode'
import { users } from '../common/constants.mjs'
import { httpError } from '../common/httpError.mjs'

const { user, sequelize } = db

async function createUsers(req, res, next) {
  const { firstName, lastName, email, password, roleId } = req.body
  let hashPassword
  try {
    const checker = await user.findOne({ where: { email: email } })
    if (_.isEmpty(checker)) {
      hashPassword = await bcrypt.hash(password, process.env.SALT)
      const t = await sequelize.transaction()
      const user = await user.create(
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: hashPassword,
          isVerified: 'email'
        },
        { transaction: t }
      )
      const role = await user.addrole({ roleId }, { transaction: t })
      if (!_.isEmpty(role) && !_.isEmpty(user)) {
        await t.commit()
        return res.status(201).success({
          state: 201,
          message: 'User Created Successfully'
        })
      } else {
        await t.rollback()
        return httpError('An Error Occur While Registering New User')
      }
    } else httpError('Email Is already Exist!')
  } catch (error) {
    return res.error({ error })
  }
}

async function getUsers(req, res) {
  const { limit, offset, isDeleted } = req.query
  let object = {},
    where = {}
  if (isDeleted || isDeleted == false) {
    where.isDeleted = isDeleted
    object.where = where
  }
  if (limit) object.limit = limit
  if (offset || offset == 0) object.offset = offset
  console.log('==================')
  // console.log(req.session.user)
  return
  try {
    const records = await user.findAndCountAll()
    return res.success({ data: records })
  } catch (error) {
    return httpError(error.message)
  }
}

async function updateUser(req, res) {
  const { id, firstName, lastName, roleIds } = req.body
  let object = {},
    where = {}
  if (firstName) object.firstName = firstName
  if (lastName) object.lastName = lastName
  where.id = id
  if (object) {
    try {
      await user.update(object, { where })
      return res.status(201).success({
        status: users.status,
        message: users.userUpdated,
        data: users.data
      })
    } catch (error) {
      return httpError(error)
    }
  }
}

async function deleteUser(req, res) {
  const { id } = req.body
  try {
    await user.update({ isDeleted: true }, { where: { id } })
    return res.success({
      status: 202,
      message: 'User Deleted Successfully!',
      data: null
    })
  } catch (error) {
    return res.fail({ error })
  }
}

async function verifyRole(req, res, next) {
  const { token } = req.body
  const decode = jwt_decode(token)
  const verify = await user.update(
    { isVerified: 'email' },
    { where: { email: decode.email } }
  )
  return res.success({ message: 'Email verify Successfully', data: verify })
}

export { createUsers, verifyRole, getUsers, updateUser, deleteUser }
