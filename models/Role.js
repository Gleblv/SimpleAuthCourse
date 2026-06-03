const {Schema, Model} = require('mongoose');

const Role = new Schema({
    value: {type: String, unique: true, default: 'USER'},
})

module.exports = new Model('Role', Role);