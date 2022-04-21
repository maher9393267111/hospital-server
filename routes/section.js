const express = require("express");
const router = express.Router();
const multer = require("multer");
const sectionModel = require("../models/section");
//const cloudinary = require('../middleware/cloudinary')
const upload = multer({ dest: "uploads/" });
const cloudinary = require("cloudinary");
const adminMiddleware = require("../middleware/admin");
const auth = require("../middleware/auth");
//const {createSection} = require('../controllers/sections');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createSection = async (req, res) => {
  const { name, title, description } = req.body;
  console.log(req.body);

  // section image

  const image = req.file;
  console.log("image--->", image);

  let result = await cloudinary.uploader.upload(req.file.path, {
    public_id: `${Date.now()}`,
    resource_type: "auto", // jpeg, png
  });

  console.log("setion image------>", result.secure_url);

  const newSection = new sectionModel({
    ...req.body,
    image: result.secure_url,
    createdAt: new Date().toISOString(),
  });

  try {
    await newSection.save();

    res.status(201).json(newSection);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// update section

const updateSection = async (req, res) => {
  const { id } = req.params;
  const { name, title, description } = req.body;
  console.log(req.body);


  try {
    const section = await sectionModel.findById(id);

    // delete image from cloudinary
//  const destroImage = await cloudinary.uploader.destroy(section.imag);

console.log(section.image, "section image");


    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }

    // section image

    const image = req.file;
    console.log("image--->", image);

    let result = await cloudinary.uploader.upload(req.file.path, {
      public_id: `${Date.now()}`,
      resource_type: "auto", // jpeg, png
    });

    console.log("setion image------>", result.secure_url);

    const updatedSection = await sectionModel.findByIdAndUpdate(
      id,
      {
        ...req.body,
        image: result.secure_url,
        updatedAt: new Date().toISOString(),
      },
      { new: true }
    );

    res.status(200).json(updatedSection);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }



};


// delete sectionModel


const deleteSection = async (req, res) => {

    const { id } = req.params;

    try {

        const section = await sectionModel.findById(id);

        if (!section) {
            return res.status(404).json({ message: "Section not found" });
        }

        const destroImage = await cloudinary.uploader.destroy(section.image);

        const deletedSection = await sectionModel.findByIdAndDelete(id);

        res.status(200).json(deletedSection);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }


};



//  get all sections

const AllSections = async (req, res) => {
  try {

    const sections = await sectionModel.find();

    res.status(200).json(sections);


  } catch (error) {

    res.status(409).json({ message: error.message });

  }


};




// section by id find

const getSectionById = async (req, res) => {


    const { id } = req.params;

    try {



        const section = await sectionModel.findById(id).populate("sectionDoctors");

        if (!section) {

            return res.status(404).json({ message: "Section not found" });

        }

        res.status(200).json(section);

    } catch (error) {

        res.status(409).json({ message: error.message });

    }


};





// all section doctors found

const getSectionDoctors = async (req, res) => {

    const { id } = req.params;

    try {

        const section = await sectionModel.findById(id);

        if (!section) {

            return res.status(404).json({ message: "Section not found" });

        }



        // sectionDoctors and populate docotors

        const sectionDoctors = await sectionModel.findById(id).populate("sectionDoctors");
        

        res.status(200).json(sectionDoctors);

    } catch (error) {

        res.status(409).json({ message: error.message });

    }


};




router.post("/", upload.single("image"), createSection);
router.put("/:id", upload.single("image"), updateSection);

router.delete("/:id", deleteSection);


// alls sections

router.get("/allSections", AllSections);

// section by id

router.get("/:id", getSectionById);


// get all section getDoctors
// sectionid then all doctors
router.get("/:id/doctors", getSectionDoctors);




module.exports = router;

