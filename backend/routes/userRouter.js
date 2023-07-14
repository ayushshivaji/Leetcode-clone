const express = require('express');
const router = express.Router();
// const bcrypt = require('bcryptjs');
const { User } = require('../db/db')
const { SECRET } = require('../authentication/jwtAuth')
const jwt = require('jsonwebtoken')

router.post('/signup', async (req,res)=>{
    const { username, password } = req.body;
    if (!username || !password){
        res.status(400).send("Please provide email and password.")
    }
    const findUser = await User.findOne({username});
    if(findUser){
        res.status(400).send("User already exists");
    }
    else{
        const token = jwt.sign(
            { username: username },
            SECRET,
            {
              expiresIn: "2h",
            }
          );
        const newUser = new User({ username, password, token });
        newUser.save();
        res.status(200).json({message: "User added successfully",token})
    }
})  

router.post('/login', async (req,res)=>{
    const { username, password } = req.body;
    if (!username || !password){
        res.status(400).send("Please provide email and password.")
    }
    const findUser = await User.findOne({username});
    if(findUser && findUser.password === password){
        const token = jwt.sign(
            { username: username },
            SECRET,
            {
              expiresIn: "2h",
            }
          );
        res.status(200).json({message: "User logged in successfully",token});
    }
    else{
        res.status(403).json({message: "Incorrect credentials"})
    }
})  

module.exports = router