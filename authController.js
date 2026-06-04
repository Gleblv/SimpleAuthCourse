const User = require('./models/User.js');
const Role = require('./models/Role.js');
const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator');

class AuthController {
    async register(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                res.status(400).json({message: 'register error', errors})
            }

            const {username, password} = req.body;
            const candidate = await User.findOne({username});

            if (candidate) {
                return res.status(400).json({message: 'user already exist'});
            } 

            const hashPassword = bcrypt.hashSync(password, 7);

            const userRole = await Role.findOne({value: 'USER'});
            const user = new User({username, password: hashPassword, roles: [userRole.value]});

            await user.save();

            return res.json('user successfuly registred');
        } catch (err) {
            console.log(err);

            res.status(400).json({message: 'register error'})
        }
    }

    async login(req, res) {
        try {

        } catch (err) {
            console.log(err);

            res.status(400).json({message: 'login error'})
        }
    }

    async getUsers(req, res) {
        try {
            res.json('server work');
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new AuthController();