import bcrypt from 'bcrypt'
import db from '../models/index.js'
import _ from 'lodash'
import common from '../middleware/common.mjs'
import authToken from '../middleware/token.mjs'
import { httpError } from '../common/httpError.mjs'
import { isVerified, auth, Email } from '../common/constants.mjs'
import jwtDecode from 'jwt-decode'

const { getAuthToken, getToken } = authToken
const { sendEmail } = common
const { user, sequelize } = db

async function registration(req, res) {
  const { firstName, lastName, email, password, roleId } = req.body
  let hashPassword
  const t = await sequelize.transaction()
  try {
    const checker = await user.findOne({ where: { email: email } })
    if (_.isEmpty(checker)) {
      hashPassword = await bcrypt.hash(password, process.env.SALT)
      const record = await user.create(
        {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: hashPassword
        },
        { transaction: t }
      )
      const role = await record.addRoles([roleId], { transaction: t })
      if (!_.isEmpty(role) && !_.isEmpty(record)) {
        const token = getAuthToken(email)
        const to = email
        const subject = 'Verify Your Email'
        const html = ' Hello '
          .concat(` , <br /></br > We receive your request for Signup. 
                    <br /> Here is the link for Verification :
                    <a href="http://localhost:400/verify?token=${token}"> 
                    Click here to verify your email </a> <br />
                    This link is expire after 15 minutes<br /> Best Regards.`)
        await sendEmail(to, subject, html)
        await t.commit()
        const status = 201
        const message =
          'Email is Successfully send kindly verify your email with in 15 minutes '
        return res.status(200).success({ status, message })
      } else {
        await t.rollback()
        return httpError('An Error Occur While Registering New User')
      }
    } else {
      return httpError('Email Is already Exist!')
    }
  } catch (error) {
    return httpError(error.message)
  }
}

async function verifyUser(req, res) {
  const { token } = req.body
  const decode = jwtDecode(token)
  const html = ' Hello Admin'
    .concat(`New User Signup Successfully with this email: ${decode.email}  <br />kindly Verification this user and update his/her verification status
     <br /><br /> Best Regards.`)
  try {
    await sendEmail(Email.toAdmin, Email.subjectToAdmin, html)
    return res.success({ status: 200, message: Email.sendToAdmin, data: null })
  } catch (err) {
    return res.error({ error: { message: Email.verification } })
  }
}

async function login(req, res) {
  const { email, password } = req.body
  try {
    let hashPassword = await bcrypt.hash(password, process.env.SALT)
    const verification = await user.findOne({
      where: { email: email, password: hashPassword }
    })
    if (!verification) return res.fail({ error: auth.inValid })
    if (verification.isVerified == isVerified.NO)
      return res.fail({ error: { message: auth.notVerified } })
    if (verification.isVerified == isVerified.EMAIL)
      return res.fail({ error: { message: auth.emailVerified } })
    if (verification.isVerified == isVerified.ADMIN)
      return res.success({
        status: auth.status,
        message: auth.message,
        data: auth.data
      })
  } catch (error) {
    return res.error({ error })
  }
}

async function forgotPassword(req, res) {
  const { email } = req.body
  const token = getToken(email)
  const to = `${email}`
  const html = ' Hello '
    .concat(` , <br /></br > We receive your request to Reset Password. <br /> Here is the link for resetting your password :
      <a href="http://localhost:400/verify?token=${token}"> Click here to reset your password </a> <br /><br /> Best Regards.`)
  try {
    await sendEmail(to, auth.subjectForgotPassword, html)
    return res.success({
      status: 201,
      message: auth.messageForgotPassword,
      data: null
    })
  } catch (err) {
    return res.error({ error: { message: auth.errorForgotPassword } })
  }
}

async function resetPassword(req, res, next) {
  const { token, password } = req.body
  const decode = jwtDecode(token)
  try {
    const hashPassword = await bcrypt.hash(password, process.env.SALT)
    const verify = await user.update(
      { password: hashPassword },
      { where: { email: decode.email } }
    )
    if (_.isEmpty(verify)) return httpError(auth.errorReset)
    return res.success({ status: 200, message: auth.messageReset, data: null })
  } catch (err) {
    return httpError(auth.errorReset)
  }
}

async function resendEmailLink(req, res, next) {
  const { email } = req.body
  const token = getAuthToken(email)
  const to = email
  const html = ' Hello '
    .concat(` , <br /></br > We receive your request for generating verification link. 
                    <br /> Here is the link for Verification :
                    <a href="http://localhost:400/verify?token=${token}"> 
                    Click here to verify your email </a> <br />
                    This link is expire after 15 minutes<br /> Best Regards.`)
  try {
    await sendEmail(to, auth.subjectResend, html)
    return res
      .status(200)
      .success({ status: 200, message: auth.messageResend, data: null })
  } catch (error) {
    return httpError(auth.messageForgotPassword)
  }
}

export default {
  registration,
  verifyUser,
  login,
  forgotPassword,
  resetPassword,
  resendEmailLink
}
