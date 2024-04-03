const { error } = require('console')
const fs = require('fs')

const makeDirectory = (path)=>{
 let dir = process.cwd()+"/uploads/"+path
 fs.mkdir(dir,{recursive:true},(error,success)=>{
  if(error){
   console.log(error,"Desired directory could not be reated");

  }
 })
}

module.exports = {makeDirectory}