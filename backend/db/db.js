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

const questionSchema = new Schema({
    problemStatement: String,
    difficulty: String,
    problemId: String
})

const User = mongoose.model('User', userSchema);
const Admin = mongoose.model('Admin',adminSchema);
const Question = mongoose.model('Question',questionSchema);

module.exports = { User,Admin,Question }