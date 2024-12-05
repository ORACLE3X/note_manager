const { compareSync } = require("bcryptjs");
const AccountModel = require("./Account.models");
const { APIError } = require("./apiError");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
exports.login= async (req, res, next )=>{
    try {
        let token = req.headers?.cookie?.split("=")[1]; 
        if(!token) token = req.headers.authorization?.split(" ")[1];
        if(token){
            const check = jwt.decode(token, process.env.ACESS_TOKEN_SECRET);
            if(check) return res.status(403).json({message: "Yes you have an active session"})
        }
        const {email, password}= req.body;
        if(!email) return next(APIError.badRequest("Email is required"));
        if(!password) return next (APIError.badRequest("Password is required"));
        const userExist = await AccountModel.findOne({email});
        // console.log(userExist);
        if(!userExist) return next (APIError.notFound("Account does not exist"));
        if(!compareSync(password,userExist.password)) return next (APIError.badRequest("Incorrect password"));
        const accessToken = jwt.sign({id:userExist._id, email:userExist.email}, process.env.ACESS_TOKEN_SECRET,{expiresIn:"10m"});
        // console.log(acessToken);
        const refreshToken = jwt.sign({id:userExist._id, email:userExist.email}, process.env.REFRESH_TOKEN_SECRET,{expiresIn: "30m"});
        userExist.refreshToken = refreshToken;
        userExist.save();
        res.clearCookie("note_app");
        res.cookie("note_app", accessToken, {
            httpOnly : false,
            secure: false,
            sameSite: "none",
        })
        res.status(200).json({message: "Login sucessfull",accessToken, refreshToken});
    } catch (error) {
        next(error);
    }
};
exports.logout = async (req, res, next )=>{
    try {
        let token = req.headers?.cookie?.split("=")[1]; 
        if(!token) token = req.headers.authorization?.split(" ")[1];
        let user={};
        if(token){
            jwt.verify(token, process.env.ACESS_TOKEN_SECRET, (err, decoded)=>{
                if(err){
                    return next (APIError.unauthenticated("Login to have access"))
                }
                user.id = decoded.id;
                user.email = decoded.email;
            });
        };
        const userExist = await AccountModel.findOne({email: user.email});
        // console.log(userExist);
        if(!userExist) return next (APIError.notFound("Account does not exist"));
        userExist.refreshToken = [];
        userExist.save();
        res.clearCookie("note_app")
        res.status(200).json({messge: "Logout sucessfull"})
    } catch (error) {
        next(error);
    }
};
exports.refreshToken = async (req, res , next)=>{
    try {
        let token = req.headers?.cookie?.split("=")[1]; 
        if(!token) token = req.headers.authorization?.split(" ")[1];
        let {refreshToken} = req.body;
        if(!refreshToken) return next (APIError.badRequest("Refresh token is required"));
        const found = await AccountModel.findOne({refreshToken});
        console.log(found);
        if(!found){
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decode) =>{
                if (err){
                    // const user = AccountModel.findOne({_id: decode.id});
                    // user.refreshToken = [];
                    // user.save();
                    return res.status(403).json({message: "Login to have access"})
                }
            })
            return res.status(403).json({message : " Login to have access"})
        }
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decode) =>{
            if (err){
                const user = AccountModel.findOne({_id: decode.id});
                user.refreshToken = [];
                user.save();

                return res.status(403).json({message : " Login to have access"})
            }
        })
         
        const accessToken = jwt.sign({id:found._id, email:found.email}, process.env.ACESS_TOKEN_SECRET,{expiresIn:"5m"});
        // console.log(acessToken);
        const newRefreshToken = jwt.sign({id:found._id, email:found.email}, process.env.REFRESH_TOKEN_SECRET,{expiresIn: "10m"});
        found.refreshToken = newRefreshToken;
        found.save();
        res.clearCookie("note_app");
        res.cookie("note_app", accessToken, {
            httpOnly : false,
            secure: false,
            sameSite: "none",
        })
        res.status(200).json({messge: "Token created",accessToken, refreshToken:newRefreshToken});
    } catch (error) {
        next(error);
    }
}