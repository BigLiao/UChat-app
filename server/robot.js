var request = require('request');
var KEY = '150122ce9fbb4afc9508a9498adeb566';
var API = 'http://www.tuling123.com/openapi/api';

function postRobot (id, msg) {
  var data = {
    key: KEY,
    info: msg,
    userid: id
  }
  var options = {
    method: 'POST',
    url: API,
    json: true,
    body: data
  }
  return new Promise((resolve, reject) => {
    request(options, (err, res) => {
      if (err) {
        reject(err)
      } else {
        resolve(res.body)
      }
    })
  })
  
}

module.exports = postRobot;
