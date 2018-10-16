const User = require('../models/User');
const jwt = require('../utils/jwt');

module.exports = {
  register: (req, res, next) => {
    const user = req.body;

    const newUser = new User(user);

    newUser.validate()
      .then(() => {
        // Update the password
        newUser.hashPassword();
        // Save the user
        return newUser.save({ validateBeforeSave: false });
      }).then((finalUser) => {
        res.status(201).send(finalUser); // To do: remove the response with that contains the user object
      })
      .catch(next);
  },
  getAllUsers: (req, res, next) => {
    User.find({}).then((users) => {
      res.status(200).json(users);
    }).catch(next);
  },
  login: (req, res, next) => {
    const credentials = req.body;
    User.findOne({ email: credentials.email }).then((user) => {
      if (!user) {
        next('Email not found.');
      }
      // Compare hashes
      if (!user.verifyPassword(credentials.password)) {
        next('Password is incorrect.');
      }
      // Pass user id as a part of the generation of the token
      return jwt.sign(user._id.toString());
    }).then((token) => {
      res.status(200).send({ token });
    }).catch(next);
  },
};
