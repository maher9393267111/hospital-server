const doctorModel = require('../models/doctors');
const cloudinary = require('cloudinary');
const sectionModel = require('../models/section');
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
// multer
const multer = require('multer');
const upload = multer({ dest: "uploads/" });

const express = require('express');
const router = express.Router();



// create  doctor model date theat avaliable to make appointment





    







