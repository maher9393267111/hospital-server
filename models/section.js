const mongoose = require('mongoose');
const sectionSchema = new mongoose.Schema({
  name: {
    type: String,
  },

title:{
    type: String
},
  description: {
    type: String,
  },
  image:{
type: String

  },
  slugify:{
      type: String
  },

  sectionDoctors:[

{
    type: mongoose.Types.ObjectId,
    ref: 'doctor',

}

  ]


});

module.exports = mongoose.model('Section', sectionSchema);