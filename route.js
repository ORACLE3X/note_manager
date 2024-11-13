const { APIError } = require("./apiError");
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
router.get("/note_id", getNoteByTitle)
router.use("*", APIError.notFound) 
module.exports = router;