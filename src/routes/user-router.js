let express = require('express');
let request = require('request');
let router = express.Router();

router.use((req, res, next) => {
  if(!req.session.user) return res.redirect('/');
  next();
});

router.get('/dash', (req, res) => {
  let user = req.session.user;
  res.render('dashboard', { username: user.username, profile_pic: user.profile_pic });
});

router.get('/create', (req, res) => {
  let user = req.session.user;
  let options = {
    url: 'https://api.spotify.com/v1/users/psivabalan/playlists?limit=30',
    headers: {
      Authorization: 'Bearer ' + user.access_token
    }
  }
  request.get(options, (error, response, body) => {
    if(response.statusCode !== 200) return res.redirect('/error?message=' + response.statusCode);
    body = JSON.parse(body);
    res.render('create', { playlists: body.items });
  });
});

router.get('/settings', (req, res) => {
  res.render('settings');
});

router.get('/logout', (req, res) => {
    delete req.session.user;
    res.redirect('/');
});

module.exports = router
