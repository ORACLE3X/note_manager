const { APIError } = require("./apiError");
const { login } = require("./auth.controller");
const { creatUser, getAccounts, updateAccount, getAccountByID, deleteAccount, createNote, getNote, getNoteByTitle,  } = require("./handlers");
const router= require("express").Router();
router.post("/account", creatUser);
router.get("/account", getAccounts);
router.put("/updateAccount", updateAccount)
router.get("/account_id", getAccountByID)
router.delete("/account_id", deleteAccount)
//createNote route
router.post("/Note", createNote);
router.get("/Note", getNote)
router.get("/note_id", getNoteByTitle).post("/auth/login", login)
router.use("*", APIError.notFound) 
module.exports = router;