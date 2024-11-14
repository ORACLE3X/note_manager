const { Schema, model } = require("mongoose");

const AccountSchema = new Schema ({
    name :{
        type: String,
        require: true,
    },
    gender: {
        type:String,
        require: true,
        enum:["male", "female"],
    },
    track:{
        type: String,
    },
    email:{
        type: String,
        required : true,
        trim : true,  
    },
    password:{
        type :String,
        required : true ,
        trim : true,
    },
    refreshToken :{
        type :[]
    },
},
 {timestamps: true}
);

const AccountModel = model("Account", AccountSchema);
module.exports = AccountModel;