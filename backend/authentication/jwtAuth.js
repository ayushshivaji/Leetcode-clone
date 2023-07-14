const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET = process.env.SECRET;

const jwtAuth = (req,res,next) => {
    const authHeader = req.headers.authorization;
    if(authHeader){
        const token = authHeader.split(' ')[1];
        jwt.verify(token,SECRET,(err,user)=>{
            if(err){
                res.status(403).json({"message": "Invalid jwt token"});
            }
            else{
                console.log("User Authenticated");
                req.user = user;
                next();
            }
        }); 
    }
    else{
        res.status(403).json({"message": "Supply jwt token in the headers."});
    }
}

module.exports = { jwtAuth,SECRET }