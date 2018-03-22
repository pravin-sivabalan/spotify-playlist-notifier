let express = require('express');
let request = require('request');
let router = express.Router();

router.use((req, res, next) => {
  if(!req.session.user) return res.redirect('/');
  next();
});

let carrierAddresses = {
  'Verizon': 'vtext.com',
  'T-Mobile': 'tmomail.net',
  'AT&T': 'mobile.att.net',
  'Sprint': 'messaging.sprintpcs.com'
}

router.post('/', (req, res) => {
  let user = req.session.user;
  res.sendStatus(200);
});

module.exports = router
