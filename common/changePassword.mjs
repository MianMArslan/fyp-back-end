import bcrypt from 'bcrypt'
import db from '../models/index.js'
import { sendEmail } from '../middleware/common.mjs'
import { httpError } from '../common/httpError.mjs'
import ejs from 'ejs'
import path from 'path'
const { user, sequelize, location, locationLog } = db

async function changePassword(req, res) {
  const { oldpassword, newpassword } = req.body
  let newHashPassword
  try {
    const userId = req.session.userRecord.userId
    newHashPassword = await bcrypt.hash(newpassword, process.env.SALT)
    let hashPassword = await bcrypt.hash(oldpassword, process.env.SALT)
    const record = await user.findOne({
      where: { id: userId, password: hashPassword }
    })
    if (!record) return res.fail({ error: { message: 'Invalid password' } })

    await user.update(
      {
        password: newHashPassword
      },
      { where: { id: userId } }
    )
    const to = req.session.userRecord.email
    const subject = 'Password Change'
    const __dirname = path.resolve()
    const resetPasswordTemplate = `${__dirname}/views/template.ejs`
    const logoLink = `./banner.png`
    let html = await ejs.renderFile(resetPasswordTemplate, {
      token: `http://localhost:3000/Login`,
      logoLink,
      user: 'aaa',
      header: 'Trouble signing in?',
      button: `Login`,
      hiddenHeader: 'abc',
      footer: `You received this email because you requested to create account. If you did not,please contact`
    })
    await sendEmail(to, subject, html)
    const status = 200
    const message = 'Password Change Successfully'
    return res.status(200).success({ status, message })
  } catch (error) {
    return httpError(error.message)
  }
}

export { changePassword }
