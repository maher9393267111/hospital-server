const mongoose = require('mongoose');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
  },
  email: {
    type: String,
    unique: [true, 'Email already exists'],
    required: [true, 'Please enter email'],
  },
  image:{type:String},
  password: {
    type: String,
    required: [true, 'Please enter password'],
  },
  phone: {
    type: String,
  },
  address: {
    type: String,
  },
  gender: {
    type: String,
  },
  birthdate: {
    type: String,
  },
  age: {
    type: String,
  },
  role:{
    type: String,
    default:'patient'
      },
  bloodgroup: {
    type: String,
  },
});
patientSchema.pre('save', async function (next) {
  const salt = await bycrypt.genSalt(10);
  this.password = await bycrypt.hash(this.password, salt);
  next();
});
patientSchema.methods.checkPassword = async function (password) {
  const isMatch = await bycrypt.compare(password, this.password);
  return isMatch;
};
patientSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, role: 'patient', name: this.name },
    process.env.JWT_KEY,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
  return token;
};






module.exports = mongoose.model('Patient', patientSchema);