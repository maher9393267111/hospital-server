const router = require("express").Router();
const CourseModel = require('../models/some')
 const cloudinary = require("../config");

 const multer = require("multer");
 const upload = multer({ dest: "uploads/" });
// const streamifier = require("streamifier");

// router.use(upload.single("video"));


const createCourse = async (req, res) => {
const {title,name,description}  = req.body
  const images = req.files
  console.log('images',images)

  try {
  
      const uploadedImages = []
      for (let i = 0; i < images.length; i++) {
         const element = images[i];
         const uploaded = await cloudinary.uploader.upload(element.path)
         uploadedImages.push(uploaded.secure_url)
      }
      if (uploadedImages) {
         console.log(uploadedImages)

const newData ={

name,
title,
description,
images:uploadedImages

}

const creeateCourses = new CourseModel(newData)

creeateCourses.save()

         res.json({creeateCourses,uploadedImages, success: 'Multiple Files Successfully Uploaded'})
   }
  } catch (err) {

      res.send({error: "Some thing was wrong"})

  }



    
};


router.post("/create",upload.array('images'), createCourse );



  module.exports = router;
  