const User = require('../models/User');

module.exports = {
  register: (req, res, next) => {
    const user = req.body;

    const email = user.email;
    const password = user.password;

    const newUser = new User(user);

    newUser.setHashedPassword(password);

    newUser.save().then(() => {
      res.status(201).send(newUser);
    }).catch((err) => {
      res.status(400).send(err);
    });
  },
  getAllUsers: (req, res, next) => {
    User.find({}).then((users) => {
      res.status(200).json(users);
    }).catch(next);
  },
};
