const mongoose = require("mongoose");

/* ====================================
  SCHEMA
====================================*/

// dateSchema = new Schema({
//   dd: { type: String, required: true },
//   mm: { type: String, required: true },
//   yyyy: { type: String, required: true },
//   hh: { type: String, required: true },

//   startmin: { type: String, required: true },

//   endmin: { type: String, required: true },

//   doctor: { type: Schema.Types.ObjectId, ref: "doctor" },

//   // All one day have multipetimes date

//   // All one day have multipetimes date
// });

// dateSchema.pre("save", function (next) {
//   if (!this.dd || !this.mm || !this.yyyy) {
//     next(new Error('date should be {dd:"xx", mm:"xx", yyyy:"xxxx"}'));
//   } else {
//     next();
//   }
// });

//-----------------------------------------------//

// -------------------------------------------------//

dateDaySchema = new mongoose.Schema({
  day: { type: String, required: true },

  dayTimes:
    //[

    {
      type: Array,
      time: { type: Date, required: true },

  
    },
  //]

  hello: {
    type: String,

    required: [true, "Please enter your hello"],

    default: "maher",

  },

  doctor: { type: mongoose.Types.ObjectId, ref: "doctor" },
});

module.exports = mongoose.model("date", dateDaySchema);
