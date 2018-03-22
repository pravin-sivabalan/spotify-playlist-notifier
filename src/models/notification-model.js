let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let NotificationSchema = new Schema({
    _user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    playlist: {
      type: String,
      required: true
    },
    songs: {
      type: [String],
      required: true
    } 
});

let Notification = mongoose.model('Notification', NotificationSchema, 'notification');

module.exports = Notification;
