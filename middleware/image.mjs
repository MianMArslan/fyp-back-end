import axios from 'axios'
export function uploadImage(req, res, next) {
  var config = {
    method: 'post',
    url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
    headers: {
      pinata_api_key: '2a8446d47ddb68b1d351',
      pinata_secret_api_key:
        'f3434ad5f49106af94d1c9ca5f03a0d43c33c7fd02025a58e4eaa2de59a741e5',
      'Content-Type': 'application/json'
    },
    data: './banner.png'
  }

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data))
    })
    .catch(function (error) {
      console.log(error)
    })
}
