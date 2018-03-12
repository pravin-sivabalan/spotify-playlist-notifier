let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: {
      type: String,
      required: true
    },
    profile_pic: {
      type: String,
      required: true
    },
    access_token: {
      type: String,
      required: true
    },
    refresh_token: {
      type: String,
      required: true
    }
});

let User = mongoose.model('User', UserSchema, 'user');

module.exports = User;
