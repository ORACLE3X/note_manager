require("dotenv").config();
const jwt = require("jsonwebtoken");
exports.userIsRequired = (req, res, next)=>{
    try {
        console.log(req.headers.authorization);
        let token = req.headers.cookie.split("=")[1];
        console.log(token);
        const checkToken = jwt.verify(token, process.env.ACESS_TOKEN_SECRET)
        console.log(checkToken)
    } catch (error) {
        next(error);
    }
}