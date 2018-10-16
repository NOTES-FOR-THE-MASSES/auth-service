const fs = require('fs');
const jwt = require('jsonwebtoken');

const privateKey = fs.readFileSync('./keys/private.key', 'utf8');

module.exports = {
  sign: userId => new Promise((resolve, reject) => {
    jwt.sign({}, privateKey,
      {
        issuer: 'notes-for-the-masses', subject: userId, expiresIn: '24h', algorithm: 'HS256',
      },
      (err, token) => {
        if (err !== null) reject(err);
        else resolve(token);
      });
  }),
};
