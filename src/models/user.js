let mongoose = require('mongoose');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcrypt');
let Schema = mongoose.Schema;

let UserSchema = new Schema({
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
});

UserSchema.methods.generateJWT = () => {
    let expire = new Date();
    expire.setDate(expire.getDate() + 7);
    return jwt.sign({
        id: this._id,
        email: this.email,
        name: this.firstName,
        exp: expire.getTime() / 1000
    }, process.env.SECRET);
};

let User = mongoose.model('User', UserSchema, 'user');

module.exports = User;
