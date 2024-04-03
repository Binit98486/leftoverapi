const mongoose = require("mongoose")


const RoleSchemaDef = new mongoose({
 name: {
  type: String,
  unique: true,
  required: true
 }

}, { timestamps: true })
const RoleModel = mongoose.model('Role', RoleSchemaDef)


module.exports = RoleModel 