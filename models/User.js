var mongoose = require('mongoose');
var UserSchema = require('../schemas/UserSchema');
var userSchema = new mongoose.Schema(UserSchema);

const User = mongoose.model('User', userSchema, 'user');

module.exports = User;