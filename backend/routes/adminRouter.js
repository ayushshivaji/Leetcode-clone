const express = require('express');
const router = express.Router();
const { Admin, Question } = require('../db/db')
const { SECRET, jwtAuth } = require('../authentication/jwtAuth')
const jwt = require('jsonwebtoken')

router.post('/signup', async (req,res)=>{
    const { username, password } = req.body;
    if (!username || !password){
        res.status(400).send("Please provide email and password.")
    }
    const findUser = await Admin.findOne({username});
    if(findUser){
        res.status(400).send("Admin already exists");
    }
    else{
        const token = jwt.sign(
            { username: username },
            SECRET,
            {
              expiresIn: "2h",
            }
          );
        const newAdmin = new Admin({ username, password, token });
        newAdmin.save();
        console.log('Added the admin');
        res.status(200).json({message: "Admin added successfully",token})
    }
})  

router.post('/login', async (req,res)=>{
    const { username, password } = req.body;
    if (!username || !password){
        res.status(400).send("Please provide email and password.")
    }
    const findUser = await Admin.findOne({username});
    if(findUser && findUser.password === password){
        const token = jwt.sign(
            { username: username },
            SECRET,
            {
              expiresIn: "2h",
            }
          );
        res.status(200).json({message: "Admin logged in successfully",token});
    }
    else{
        res.status(403).json({message: "Incorrect credentials"})
    }
})  

router.get('/questions', jwtAuth ,async (req,res)=>{
    const questions = await Question.find();
    res.status(200).json({"message": questions})
})  

router.post('/questions/:questionNumber', jwtAuth ,async (req,res)=>{
    const questions = await Question.find({"problemId":req.params.questionNumber});
    const { solution } = req.body;
    // const result = await runTest(solution);
    const result = false;
    res.status(200).json({"result": result, "solution-submitted": solution});
})  

module.exports = router