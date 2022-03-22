import axios from 'axios'
import { httpError } from '../common/httpError.mjs'

// const options = {
//   method: 'GET',
//   url: 'https://find-any-ip-address-or-domain-location-world-wide.p.rapidapi.com/iplocation',
//   params: {apikey:'873dbe322aea47f89dcf729dcc8f60e8' },
//   headers: {
//     'x-rapidapi-host': 'find-any-ip-address-or-domain-location-world-wide.p.rapidapi.com',
//     'x-rapidapi-key': '741db68c1cmsh6f4ab9f7c819db1p1f2e2ajsn36d44c7235b4'
//   }
// };

// axios.request(options).then(function (response) {
// 	console.log(response.data);
// }).catch(function (error) {
// 	console.error(error);
// });

async function getUserLocationData(req, res, next) {
  const options = {
    method: 'GET',
    url: 'https://find-any-ip-address-or-domain-location-world-wide.p.rapidapi.com/iplocation',
    params: { apikey: process.env.Rapid_Api_IP },
    headers: {
      'x-rapidapi-host':
        'find-any-ip-address-or-domain-location-world-wide.p.rapidapi.com',
      'x-rapidapi-key': '741db68c1cmsh6f4ab9f7c819db1p1f2e2ajsn36d44c7235b4'
    }
  }
  const value = await axios.request(options)
  if (value) {
    req.locationDetail = value.data
    next()
  } else httpError('Error Occur While Getting User location detail')
}

async function getUserLocationDetails(req, res, next) {
  const { ip } = req.locationDetail
  const options = {
    method: 'GET',
    url: `https://api.ipinfodb.com/v3/ip-city/?key=b52e5a56515e87a549252be9ed20be7002a73dfa9af29f242f860817ccb5cab3&ip=${ip}&format=json`,
    headers: {
      'Content-Type': 'application/json'
    }
  }
  const value = await axios.request(options)
  if (value) {
    req.locationDetails = value.data
    next()
  } else httpError('Error Occur While Getting User location detail')
}

export { getUserLocationData, getUserLocationDetails }
