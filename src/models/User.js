const crypto = require('crypto');
const mongoose = require('mongoose');

function hashPassword(password, salt) {
  return crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
}

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required.',
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address.'],
  },
  password: {
    type: String,
    required: 'The password is required.',
    minlength: [6, 'Password is too short.'],
  },
  salt: String,
});

userSchema.methods.hashPassword = function () {
  this.salt = crypto.randomBytes(16).toString('hex'); // Generate salt
  this.password = hashPassword(this.password, this.salt);
};

userSchema.methods.verifyPassword = function (loginPassword) {
  const loginPasswordHash = hashPassword(loginPassword, this.salt);
  return this.password === loginPasswordHash;
};


module.exports = mongoose.model('User', userSchema);
