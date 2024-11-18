const { compareSync } = require("bcryptjs");
const AccountModel = require("./Account.models");
const { APIError } = require("./apiError");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
exports.login= async (req, res, next )=>{
    try {
        const {email, password}= req.body;
        if(!email) return next(APIError.badRequest("Email is required"));
        if(!password) return next (APIError.badRequest("Password is required"));
        const userExist = await AccountModel.findOne({email});
        // console.log(userExist);
        if(!userExist) return next (APIError.notFound("Account does not exist"));
        if(!compareSync(password,userExist.password)) return next (APIError.badRequest("Incorrect password"));
        const accessToken = jwt.sign({id:userExist._id, email:userExist.email}, process.env.ACESS_TOKEN_SECRET,{expiresIn:"30s"});
        // console.log(acessToken);
        const refreshToken = jwt.sign({id:userExist._id, email:userExist.email}, process.env.REFRESH_TOKEN_SECRET,{expiresIn: "5m"});
        userExist.refreshToken = refreshToken;
        userExist.save();
        res.clearCookie("note_app")
        res.cookie("note_app", accessToken, {
            httpOnly : false,
            sameSite: "none",
        })
        res.status(200).json({messge: "Login sucessfull",accessToken, refreshToken})
    } catch (error) {
        next(error);
    }
}