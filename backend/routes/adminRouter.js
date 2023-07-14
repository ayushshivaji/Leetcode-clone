const express = require('express');
const router = express.Router();
const { Admin } = require('../db/db')


router.post('/signup', (req,res)=>{
    const { username, password } = req.body;
    const newAdmin = new Admin({ username, password });

    newAdmin.save();
    res.status(200).send("Admin added successfully")
})

module.exports = router