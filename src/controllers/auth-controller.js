const User = require('../models/User');

module.exports = {
  register: (req, res, next) => {
    const user = req.body;

    User.create(user).then(() => {
      res.sendStatus(201);
    }).catch(next);
  },
  getAllUsers: (req, res, next) => {
    User.find({}).then((users) => {
      res.status(200).json(users);
    }).catch(next);
  },
};
