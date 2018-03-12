let express = require('express');
let request = require('request');
let router = express.Router();
let User = require('../models/user-model');


router.get('/login', (req, res) => {
  return res.redirect('https://accounts.spotify.com/authorize?client_id=' + process.env.CLIENT_ID + '&response_type=code&redirect_uri=' + process.env.CALLBACK + '&scope=user-modify-playback-state,playlist-read-private,playlist-read-collaborative');
});

router.get('/callback', (req, res) => {
  let options = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        'grant_type': 'authorization_code',
        'code': req.query.code,
        'redirect_uri': process.env.CALLBACK
      },
      headers: {
        Authorization: 'Basic ' + new Buffer(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64')
      }
  }
  request.post(options, (error, response, body) => {
    if(response.statusCode !== 200) return res.redirect('/error?message=' + response.statusCode);
    body = JSON.parse(body);
    options = {
      url: 'https://api.spotify.com/v1/me',
      headers: {
        Authorization: 'Bearer ' + body.access_token
      }
    }
    request.get(options, (error, response, userInfo) => {
      if(response.statusCode !== 200) return res.redirect('/error?message=' + response.statusCode);
      userInfo = JSON.parse(userInfo);
      let user = new User({
        username: userInfo.id,
        profile_pic: userInfo.images[0].url,
        access_token: body.access_token,
        refresh_token: body.refresh_token
      });
      // TODO: handle exisiting users
      user.save((err, user) => {
          if(err) return res.redirect('/error?message=' + err);
          req.session.user = user;
          return res.redirect('/user/dash');
      });
    });
  });
});

module.exports = router

// {
//   "error": {
//     "status": 401,
//     "message": "The access token expired"
//   }
// }
