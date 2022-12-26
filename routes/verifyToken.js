const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const verifyToken = (res,req,next)=>{
    const authHeader = req.headers.token;
    if(authHeader){
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWTKEY, (err,user)=>{
            if(err){
                res.status(403).json("Token not valid!")
            }
            req.user = user;
            next();
        });
    }
    else{
        return res.status(401).json("Authentication Unsuccessful!");
    }
};

const verifyTokenAndAuth = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
        next();
        }
        else{
            res.status(403).json("Not Allowed!!")
        }
    });
};

module.exports = {verifyToken, verifyTokenAndAuth};