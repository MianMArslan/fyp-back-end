import db from '../models/index.js'
import { httpError } from '../common/httpError.mjs'

const { user, role, location, Sequelize } = db
const Op = Sequelize.Op
import { distance } from '../common/distance.mjs'

async function getNearestTourist(req, res, next) {
  try {
    let currentUserLocation = await location.findOne({
      where: { userId: req.session.UserRecord.userId }
    })
    const { latitude, longitude } = currentUserLocation
    let otherUsersLocation = []
    let value = await user.findAll({
      where: {
        isVerified: 'email',
        id: { [Op.ne]: req.session.UserRecord.userId }
      },
      include: [
        { model: role, where: { title: 'tourist' } },
        { model: location }
      ]
    })
    await Promise.all(
      value.map(async (e) => {
        let othersRecord = distance(
          latitude,
          longitude,
          e.location.latitude,
          e.location.longitude,
          'K'
        )
        let distanceInKm = Number(othersRecord.toFixed(1))
        if (distanceInKm < 5) {
          otherUsersLocation.push({
            id: e.id,
            firstName: e.firstName,
            lastName: e.lastName,
            distance: distanceInKm
          })
        }
      })
    )
    res.success({ data: otherUsersLocation })
  } catch (error) {
    httpError(error.message)
  }
}

export { getNearestTourist }
