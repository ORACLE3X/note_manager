const fs = require("fs");
const { v4: uuidv4 } = require('uuid');
const { getFileContent, buildAccount } = require("./utils");
const { APIError } = require("./apiError");
const AccountModel = require("./Account.models");
const { default: mongoose } = require("mongoose");
const NoteModel = require("./note.model");
exports.creatUser= async(req,res,next)=>{
    try{
        const{name, track, gender, email, password}=req.body;
        //data validation
        if(!name)return next (APIError.badRequest("Name is required"));
        if(!track)return next (APIError.badRequest("Track is required"));
        if(!gender)return next (APIError.badRequest("Gender is required"));
        if(!email)return next (APIError.badRequest("Email is required"));
        if(!password)return next (APIError.badRequest("Password is required"));
        if(gender!=="male" && gender !=="female") throw new Error("invalid gender");
     const createdAt = Date.now();
    const newUser = {
    name,
    gender,
    track,
    // createdAt,
    // updatedAt: createdAt,
    // id:uuidv4(),
    }
    const createAccount = await AccountModel.create({...newUser})
    // if(fs.existsSync("account.json")){
    // fs.readFile("account.json", "utf-8",(err, data)=>{
    //         if (err)return next (APIError.notFound(err));
    //         const existingUsers =JSON.parse(data);
    //         existingUsers.push(newUser);
    //         const result = fs.writeFileSync("account.json",JSON.stringify(existingUsers));
    //         if(result)return next (APIError.customError(result,400));
    //     })
    // }
    // else{
    //     //create the file write to it;
    //     const users=[newUser];
    //     const result = fs.writeFileSync("account.json",JSON.stringify(users));
    //     if(result)throw new Error(result);
    // }
    res.status(201).json({message: "Account created successfully"})
    }catch(error){
        // res.status(400).json({error: error.message});
        next(error)
    }
}

exports.getAccounts= async(req,res) => {
    try{
        const account = await AccountModel.find({}).select("-__v")
            if(!account || account.length === 0 )
                return  res.status(404).json({message:"No record found"})

        const newBook = account.map((cur) => {
            return buildAccount(cur.toObject())
        })
         res.status(200).json({message: "Account found", account:newBook})
        // if(fs.existsSync("account.json")){
        //     const users=fs.readFileSync("account.json","utf-8");
        //     if(users.error) throw new Error(err);
        //     res.status(200).json({message: "Accounts found", account: JSON.parse(users)})
        //     console.log(users)
        // }else{
        //     res.status(404).json({message:"No record found"})
        // }
    } catch(error){
        res.status(error.status|| 400).json({error:error.message});
    }
}

exports.updateAccount = async (req,res,next)=>{
    try {
        // const {name} = req.body;
        // if(!name)throw new Error("name is required");
        const {id}= req.body;
        if(!id)return next (APIError.badRequest("Account ID is required"));
        const info ={};
        delete req.body.id;

        for(let key in req.body){
            info[key] = req.body[key];
        }
        // const userExist = await AccountModel.findById({id})
        const newId = new mongoose.Types.ObjectId(id);
        console.log(newId);
        const userExist = await AccountModel.findByIdAndUpdate({newId}, {...info})
        if(!userExist) return next (APIError.notFound("User does not exist"))
        // console.log(info);
        //check if file exist
        // if(fs.existsSync("account.json")){
        //     //read the file
        //     let allUsers = fs.readFileSync("account.json","utf-8");
        //     if (allUsers.error) throw new Error(err);
        //     allUsers =JSON.parse(allUsers);

        //     //find a particular user to update
        //     const userExist = allUsers.find(y => y.id === id);
        //     if(!userExist) return res.status(404).json({message: "user does not exist"})
        //         // console.log(userExist);
        //     for(let key in info){
        //         userExist[key] = info[key];
        //         userExist.updatedAt = Date.now();
        //     }
        //     const otherUsers = allUsers.filter(user => user.id !== id);
        //     otherUsers.push(userExist);
        //     //write data back to file
        //     const result = fs.writeFileSync("account.json",JSON.stringify(otherUsers));
        //     if(result)throw new Error(result);
        //     res.status(200).json({message: "account updated successfully"})  
        // }else{
            res.status(200).json({message:"Account updated successfully"})
        // }
        }
    catch (error) {
        // res.status(error.status|| 400 ).json ({error:error.message});
        next(error)
    }}

    exports.getAccountByID = async(req,res, next) => {
        try{
            const {id} = req.query;
            if(!id) return next (APIError.badRequest( " ID is required"));
            // if(fs.existsSync("account.json")){
            //  const users =getFileContent("account.json");
            //  if(users?.error) throw new Error(users.error);
            //  const user = users.find(x=> x.id === id);
            const user = await AccountModel.findOne({_id: id}).select("-__V")
             if(!user)return res.status(404).json({error: "Account does not Exist"})
                res.status(200).json({message: "found", user});
        } catch(error){
            res.status(error.status|| 400).json({error:error.message});
        }
    }

    exports.deleteAccount = (req, res) =>{
        try {
            const{id} = req.query;
            if(!id) throw new Error("ID is required");
            const users = getFileContent("account.json");
            if(users?.error) res.status(400).json({error: users.error});
            const userExist = users.find( user => user.id=== id);
            if(!userExist) throw new Error ("Account does not exist");
            const others = users.filter(x => x.id !==id);
            const save = fs.writeFileSync("account.json", JSON.stringify(others))
            if(save) throw new Error (save);
            res.status(200).json({message:"Account deleted successfully"})
        } catch (error) {
            res.status(error.status|| 400).json({error: error.message});            
        }
    }
    
    exports.createNote = async(req, res, next)=>{ 
        try {
            const {accountId, title, text}= req.body;
            if(!accountId) return next(APIError.badRequest("Account ID is required"));
            if(!title) return next (APIError.badRequest("Title is required"));
            if(!text) return next(APIError.badRequest("Text is required"));
            const createdAt = Date.now;
            const newNote ={
                title,
                text,
               account:accountId,
            }
            const userExist = await AccountModel.findById(accountId);
            if (!userExist) return next (APIError.badRequest("Invalid Account ID"));
            const createNote = await NoteModel.create({...newNote})
            // if (fs.existsSync("note.json")) {
            //     fs.readFile("note.json", "utf-8", (err, data) =>{
            //         if(err) throw new Error (err)
            //         const availableBooks =JSON.parse(data);
            //       availableBooks.push(newNote);
            //       const result = fs.writeFileSync("note.json",JSON.stringify(availableBooks));
            //     if(result)throw new Error(result);
            //     })
            // } else {
                res.status(201).json({message: "Note created successfully"})
            // }
        } catch (error) {
            res.status(error.status || 400).json({error: error.message})
        
    }}
    exports.getNote = async (req, res , next)=>{
        try {
            const note = await NoteModel.find({}).select("-__v")
            if(!note || note.length === 0 )
                return  res.status(404).json({message:"No record found"})

        const newBook = note.map((cur) => {
            return buildAccount(cur.toObject())
        })
         res.status(200).json({message: "Note found", account:newBook})
        } catch (error) {
           next(error);
        }
    }
    exports.getNoteByTitle = async (req, res, next )=> {
        try {
            const {search} = req.query;
            let query = search
            if(!search) query = ""
            const notes = await NoteModel.find({title:query}).populate("account").select("-__v")
            res.status(200).json({message: "Found", notes});
        } catch (error) {
            next(error)
        }
    }