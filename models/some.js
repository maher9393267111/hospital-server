const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    //unique: true,
    
    trim: true,
    required: [true, "Please add a course title"],
  },
  description: {
    type: String,
    required: [true, "Please add a description"],
  },
  name: {
    type: String,
   // required: [true, "Please add name of course"],
  },

  images:{

type: Array
  },
 

  createdAt: {
    type: Date,
    default: Date.now,
  },
 
  



});

const course = mongoose.model("course", CourseSchema);
//Video.createIndexes();
module.exports = course;
