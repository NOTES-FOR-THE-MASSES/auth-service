const crypto = require('crypto');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: String,
  password: String,
  salt: String,
});

userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.password = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

module.exports = mongoose.model('User', userSchema);
