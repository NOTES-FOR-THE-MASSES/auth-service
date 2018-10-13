const User = require('../models/User');

module.exports = {
  register: (req, res, next) => {
    const user = req.body;

    const email = user.email;
    const password = user.password;

    let newUser = new User(user); //eslint-disable-line 
    console.log(password);
    newUser.setPassword(password);
    console.log(newUser);
    newUser.save().then(() => {
      res.status(201).send(newUser);
    }).catch(next);
  },
  getAllUsers: (req, res, next) => {
    User.find({}).then((users) => {
      res.status(200).json(users);
    }).catch(next);
  },
};
