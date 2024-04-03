const mongoose = require("mongoose")
const AddressSchemaDef = new mongoose.Schema({
 address: String,
 house_no: String
})
const UserSchemaDef = new mongoose.Schema({
 name: {
  type: String,
  required: true,
  trim: true

 },
 email: {
  type: String,
  required: true,
  unique: true,
  trim: true
 },
 password: {
  type: String,
  required: true,
  trim: true
 },
 image: {
  type: String,
  default: ""
 },
 phone: {
  type: String,
  trim: true
 },
 status: {
  type: String,
  enum: ['active', 'inactive'],
  default: "inactive"
 },
 role: [{
  type: String,
  enum: ['user', 'customer', 'admin'],
  default: "customer"
 }],
 role_id: [{
  type: mongoose.Types.ObjectId,
  ref: "Role",
  default: ""

 }],
 address: {
  shipping: AddressSchemaDef,
  billing: AddressSchemaDef
 }
}, {
 timeStamps: true,
 autoCreate: true,
 autoIndex: true
})
const UserModel = mongoose.model('User', UserSchemaDef)
module.exports = UserModel