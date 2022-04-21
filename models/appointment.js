const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  doctor_id: {
    type: mongoose.Types.ObjectId,
    ref: 'admin',
  },
  patient_id: {
    type: mongoose.Types.ObjectId,
    ref:'Patient',
  },
  patient_name: {
    type: String,
  },
  doctor_name:{
    type:String
  },
  description: {
    type: String,
  },
  date: {
    type: String,
  },
reason:{type:String},
  phone: {
    type: String,
  },
  prescription: {
    type: String,
  },
});

module.exports = mongoose.model('appointment', appointmentSchema);


