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
    }).catch(next('hihi-hahu'));
  },
  login: (req, res, next) => {
    // const credentials = req.body;

    jwt.sign('id').then((token) => {
      console.log(token);
      res.status(200);
    }).catch(next);
  },
};
