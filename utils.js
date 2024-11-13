const fs = require("fs"); 
const path = require("path")
exports.getFileContent = (filePath) =>{
  try {
    //check if file exist 
    if(fs.existsSync(filePath) ){
      const fileData =  fs.readFileSync(filePath, "utf-8");
      return JSON.parse(fileData);
    }else{
      return {error: "file does not exist"}
    }
  } catch (error) {
    return {error}
  }
}

exports.createFile =(filename) =>{
  try {
      const create = fs.writeFile(filename, data, "utf-8");
      if (create) throw new Error (create)
        return{sucess:true}
  } catch (error) {
      return {error: error.message}
  }
}
exports.buildAccount = (account) => {
  const {_id,...data} = account;
  data.id = _id;
  return data
}