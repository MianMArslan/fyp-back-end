import multer from 'multer'
import { httpError } from '../common/httpError.mjs'

const imageStorage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'public/uploads/')
  },
  filename: (req, file, callback) => {
    let name = `${Date.now()}_${file.originalname}`
    req.imageName = name
    callback(null, name)
  }
})
const imageFileFilter = function (req, file, callback) {
  if (
    !file.originalname.match(
      /\.(jpg|jpeg|png|JPG|JPEG|PNG|P60|P45|P11D|p60|p45|p11D)$/
    )
  ) {
    return callback(
      httpError('Only (jpg|jpeg|png) files formats are allowed!'),
      false
    )
  }
  callback(null, true)
}

const uploadImage = multer({
  storage: imageStorage
  //   ,
  //   fileFilter: imageFileFilter
})

const verificationImage = uploadImage.single('image')

export { verificationImage }
