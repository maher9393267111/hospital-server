const mongoose = require("mongoose");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Schema = mongoose.Schema;
const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
    unique: [true, "Email already exists"],
  },
  role: {
    type: String,
    default: "doctor",
  },
  phone: {
    type: String,
    // unique: false,
  },
  image: {
    public_id: String,

    secure_url: String,
  },

  section: {
    type: mongoose.Types.ObjectId,
    ref: "Section",
  },
  address: {
    type: String,
  },
  appointments: [
    {
      patientId: {
        type: mongoose.Types.ObjectId,
        ref: "patient",
      },
      name: {
        type: String,
      },
      description: {
        type: String,
        maxlength: [5000, "Description is too long"],
        maxlength: [true, "Description must be less than 100 characters"],
      },
     
      
      phone: {
        type: String,
      },
      image: {
        public_id: String,
        secure_url: String,
      },

  

   avaliableDates: {  type:Array ,dateId:{  type: mongoose.Types.ObjectId, ref: "date" }},
      reference: {
        type: String,
      },


dates: [{ 
  
    type: mongoose.Types.ObjectId,
    ref: "date",
  
  }],




      inwork: {
        type: Boolean,

        default: false 
      },

      hello: {
        type: String,
required: [true, "Please enter your hello"],
        default: 'maher'
      },

    },
  ],
});
doctorSchema.pre("save", async function (next) {
  const salt = await bycrypt.genSalt(10);
  this.password = await bycrypt.hash(this.password, salt);
  next();
});
doctorSchema.methods.checkPassword = async function (password) {
  const isMatch = await bycrypt.compare(password, this.password);
  return isMatch;
};
doctorSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, role: "doctor", name: this.name },
    process.env.JWT_KEY,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
  return token;
};

module.exports = mongoose.model("doctor", doctorSchema);
