import bcrypt from 'bcrypt'
import db from '../models/index.js'
import _ from 'lodash'
import { sendEmail } from '../middleware/common.mjs'
import { getAuthToken, getToken } from '../middleware/token.mjs'
import { httpError } from '../common/httpError.mjs'
import { isVerified, auth, Email } from '../common/constants.mjs'
import jwtDecode from 'jwt-decode'
import { accessToken } from '../middleware/token.mjs'
import ejs from 'ejs'
import path from 'path'
import { createNotification } from './notification.mjs'
const { user, sequelize, location, locationLog } = db

async function registration(req, res) {
  const { firstname, lastname, email, password, roleId, interest } = req.body
  let hashPassword
  const t = await sequelize.transaction()
  try {
    const checker = await user.findOne({ where: { email: email } })
    if (_.isEmpty(checker)) {
      hashPassword = await bcrypt.hash(password, process.env.SALT)
      const record = await user.create(
        {
          firstName: firstname,
          lastName: lastname,
          email: email,
          password: hashPassword,
          interest
        },
        { transaction: t }
      )
      const role = await record.addRoles([roleId], { transaction: t })
      if (!_.isEmpty(role) && !_.isEmpty(record)) {
        const token = getAuthToken(email)
        const to = email
        const subject = 'Verify Your Email'
        const __dirname = path.resolve()
        const resetPasswordTemplate = `${__dirname}/views/template.ejs`
        const logoLink = `./banner.png`
        let html = await ejs.renderFile(resetPasswordTemplate, {
          token: `http://localhost:3000/emailMessage?token=${token}`,
          logoLink,
          user: 'aaa',
          header: 'Trouble signing in?',
          button: `Verify Email`,
          hiddenHeader: 'abc',
          footer: `You received this email because you requested to create account. If you did not,please contact`
        })
        await sendEmail(to, subject, html)
        await t.commit()
        await createNotification(
          'New User register',
          'newUser',
          'admin',
          record.id
        )
        const status = 200
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

async function login(req, res) {
  const { email, password, latitude, longitude } = req.body
  // console.log(req.body)
  // return
  let userData = {}
  try {
    let hashPassword = await bcrypt.hash(password, process.env.SALT)
    const record = await user.findOne({
      where: { email: email, password: hashPassword }
    })
    if (!record) return res.fail({ error: { message: auth.inValid } })
    if (record.isVerified == isVerified.NO) return httpError(auth.notVerified)
    userData.UserRecord = {
      userId: record.id,
      firstName: record.firstName,
      lastName: record.lastName,
      email: record.email
    }
    const userRecord = await record.getRoles()
    userData.userRole = { title: userRecord[0].title }
    const token = await accessToken(record.id, record.email)
    res.cookie('accessToken', token)

    const locationRecord = await location.findOne({
      where: { userId: record.id }
    })

    const { ip } = req.locationDetail

    if (!locationRecord)
      await location.create({ userId: record.id, latitude, longitude })
    else
      await location.update(
        { latitude, longitude },
        { where: { userId: record.id } }
      )
    await locationLog.create({
      userId: record.id,
      lat: latitude,
      long: longitude,
      ipAddress: ip
    })
    return res.success({
      status: auth.status,
      message: auth.message,
      data: userData
    })
  } catch (error) {
    return res.error({ error })
  }
}

async function forgotPassword(req, res) {
  const { email } = req.body
  const token = getToken(email)
  const to = `${email}`
  const __dirname = path.resolve()
  const resetPasswordTemplate = `${__dirname}/views/template.ejs`
  const logoLink = `./banner.png`
  let html = await ejs.renderFile(resetPasswordTemplate, {
    token: `http://localhost:3000/resetPassword?token=${token}`,
    logoLink,
    user: 'We receive your request to Reset Password.',
    header: 'Trouble signing in?',
    button: `Reset Password`,
    hiddenHeader: 'abc',
    footer: `You received this email because you requested to create account. If you did not,please contact`
  })
  try {
    await sendEmail(to, auth.subjectForgotPassword, html)
    return res.success({
      message: auth.messageForgotPassword
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
  const subject = 'Activate Your Account'
  const __dirname = path.resolve()
  const resetPasswordTemplate = `${__dirname}/views/template.ejs`
  const logoLink = `./banner.png`
  let html = await ejs.renderFile(resetPasswordTemplate, {
    token: `http://localhost:3000/emailMessage?token=${token}`,
    logoLink,
    user: 'aaa',
    header: 'Trouble signing in?',
    button: `Verify Email`,
    hiddenHeader: 'abc',
    footer: `You received this email because you requested to create account. If you did not,please contact`
  })
  try {
    await sendEmail(to, auth.subjectResend, html)
    return res.success({ message: auth.messageResend })
  } catch (error) {
    return httpError(auth.messageForgotPassword)
  }
}
async function logout(res) {
  const cookieConfiguration = {}
  cookieConfiguration.httpOnly = true
  cookieConfiguration.secure = false
  cookieConfiguration.SameSite = 'none'
  cookieConfiguration.path = '/'

  res.clearCookie('accessToken', cookieConfiguration)
}
export { registration, login, forgotPassword, resetPassword, resendEmailLink }
