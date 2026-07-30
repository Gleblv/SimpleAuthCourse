const User = require('./models/User.js');
const Role = require('./models/Role.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }

    const secret = process.env.TOKEN_SECRET;

    console.log(secret);

    const token = jwt.sign(payload, secret, {expiresIn: '24h'});

    return token;
}

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

            const userRole = await Role.findOne({value: 'User'});
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
            const {username, password} = req.body;

            const candidate = await User.findOne({username});

            if (!candidate) {
                return res.status(400).json({message: 'Not find user with this username'});
            }

            const validPassword = bcrypt.compareSync(password, candidate.password);

            if (!validPassword) {
                return res.status(400).json({message: 'Invalid password'});
            }

            const token = generateAccessToken(candidate._id, candidate.roles);

            return res.json({token});
        } catch (err) {
            console.log(err);

            res.status(400).json({message: 'login error'})
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find();

            res.json(users)
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new AuthController();