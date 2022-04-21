
const path = require('path')
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const { readdirSync } = require("fs");
require("dotenv").config();

// app
const app = express();

const uploadRoute =require('./routes/one.js')
const cloudinary =require('./routes/cloudinary.js')
const authRoute = require('./routes/auth')
const AdminRoutes = require('./routes/admin')
const sectionRoutes = require('./routes/section')
const DoctorRoutes = require('./routes/doctor')

const dateRoutes = require('./routes/date')





// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb" }));
app.use(cors());
app.use(express.static("public"));





// routes middleware

 app.use('/api',cloudinary)
 app.use('/api',uploadRoute)
 app.use('/api',authRoute)
 app.use('/api/sections', sectionRoutes)
 app.use('/api/doctors', DoctorRoutes)
  app.use('/api/date', dateRoutes)


 


// admin Routes
app.use('/api',AdminRoutes)

mongoose
    .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
     
    })
    .then(() => console.log('DB Connected'));


    

// --------------------------deployment------------------------------
//  const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/mern-2/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}
// --------------------------deployment------------------------------






//PORT 

const PORT = process.env.PORT || 5000
app.listen(PORT, () =>{
    console.log('Server is running on port', PORT)
})