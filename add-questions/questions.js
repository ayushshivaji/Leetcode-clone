// const dotenv = require('dotenv');
// require('dotenv').config();

// const dburl = process.env.DATABASE_URL;
// const mongoose = require('mongoose');
// const { Question } = require('../backend/db/db')

// await mongoose.connect('mongodb+srv://mongodbuser:mongodbpass@cluster0.nojfpsb.mongodb.net/?retryWrites=true&w=majority');

// mongoose.connect(dburl).then((dbo)=>{
//     console.log("Database connected now.")
// },(err)=>{
//     console.log("Error"+ err);
// })

// const questions = new Question({
//     problemStatement: "Add two numbers",
//     difficulty: "easy"
// })
// let problem = "Add 3 numbers";
// let difficulty = "easy";

// const newQuestion = new Question({ problem, difficulty });

// newQuestion.save();

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

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://mongodbuser:mongodbpass@cluster0.nojfpsb.mongodb.net/?retryWrites=true&w=majority');
  console.log("Now connected to the database.");
  let problemStatement = "testuser";
  let difficulty = "testpass";
  let token = "token";
  const newVar = new Question({ problemStatement, difficulty })
  await newVar.save();
  await Question.insertMany([{ "problemStatement": problemStatement, "difficulty": difficulty, "problemId": 1 },
                             { "problemStatement": problemStatement+`1`, "difficulty": difficulty+`1`, "problemId": 2 },
                             { "problemStatement": problemStatement+`2`, "difficulty": difficulty+`2`, "problemId": 3 }
                            ]);
  console.log("Added variables.")
}