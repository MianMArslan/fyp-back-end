// const fs = require('fs');
import fs from 'fs'
import pinataSdk from '@pinata/sdk'
import { httpError } from '../common/httpError.mjs'
const pinata = pinataSdk(
  process.env.pinata_api_key,
  process.env.pinata_secret_api_key
)

export function pinataUpload(req, res, next) {
  pinata
    .testAuthentication()
    .then((result) => {
      if (!result.authenticated)
        httpError('Error occur while connecting to pinata')
      const readableStreamForFile = fs.createReadStream(
        `public/uploads/${req.imageName}`
      )
      const options = {
        pinataOptions: {
          cidVersion: 0
        }
      }
      pinata
        .pinFileToIPFS(readableStreamForFile, options)
        .then((result) => {
          console.log(result)
          req.IpfsHash = result.IpfsHash
          next()
        })
        .catch((err) => {
          //handle error here
          res.fail({ status: 400, error: { message: err.message } })
        })
    })
    .catch((err) => {
      //handle error here
      res.fail({ status: 400, error: { message: err.message } })
    })
}
