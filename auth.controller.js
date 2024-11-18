const { compareSync } = require("bcryptjs");
const AccountModel = require("./Account.models");
const { APIError } = require("./apiError");

exports.login= async (req, res, next )=>{
    try {
        const {email, password}= req.body;
        if(!email) return next(APIError.badRequest("Email is required"));
        if(!password) return next (APIError.badRequest("Password is required"));
        const userExist = await AccountModel.findOne({email});
        if(!userExist) return next (APIError.notFound("Account does not exist"));
        if(!compareSync(password,userExist.password)) return next (APIError.badRequest("Incorrect password"));
        res.status(201).json({message : " Login sucessful"});
    } catch (error) {
        next(error);
    }
}