import axios from 'axios'

export async function getIp(req, res, next) {
  var config = {
    method: 'GET',
    url: 'https://api64.ipify.org?format=json',
    headers: {
      'Content-Type': 'application/json'
    }
  }
  let ip
  await axios(config)
    .then(function (response) {
      console.log(response)
      res.ip = response.data
      next()
    })
    .catch(function (error) {
      console.log(error)
    })
}
