const User = require('../models/User');

module.exports = {
    register: (req, res) => {
        const user = req.body;

        User.create(user).then(() => {
            console.log('The user was created');
            console.log(user);
            res.sendStatus(200);
        });
    },
    getAllUsers: (req, res) => {
        User.find({}).then((organizations) => {
            res.status(200).json(organizations);
        });
    }
};
