const crypto = require('crypto');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required.',
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address.'],
  },
  password: {
    type: String,
    required: 'The password is required.',
    min: [6, 'Password is too short.'],
    salt: String,
  },
});

userSchema.methods.setHashedPassword = function (password) {
  if (password !== undefined) {
    this.salt = crypto.randomBytes(16).toString('hex'); // Generate salt
    this.password = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex'); // Hash
  }
};

module.exports = mongoose.model('User', userSchema);
