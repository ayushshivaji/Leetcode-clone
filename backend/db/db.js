const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    token: String
})

const adminSchema = new Schema({
    username: String,
    password: String,
    token: String
})

const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin',adminSchema);

module.exports = { User,Admin }