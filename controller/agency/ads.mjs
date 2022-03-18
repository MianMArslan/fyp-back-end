import db from '../../models/index.js'

async function createAd(req, file, next) {
  console.log(process.env.PINATA_DISPLAY + req.IpfsHash)
}

export { createAd }
