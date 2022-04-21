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

const createDoctor = async (req, res) => {

    const { name, password,hello, email, phone, address, section,description,reference,inwork } = req.body;


const image = req.file.path;

// update image to cloudinary

const result = await cloudinary.uploader.upload(image, {
    public_id: `${Date.now()}`,
    resource_type: "auto", // jpeg, png
    });

console.log("setion image------>", result.secure_url);

    
    console.log( "hello",hello);

      


    const newDoctor = new doctorModel({
        hello,
        name,
        password,
        email,
        phone,
        description,
        address,
        reference,
        inwork,
        image:{
            public_id: result.public_id,
            secure_url: result.secure_url,
        },
        section,
        createdAt: new Date().toISOString(),
        dates:[],
        inwork
    });

    try {
        await newDoctor.save();

        console.log("new doctor created", newDoctor);

        // section findone and update push doctor id

const section1 = await sectionModel.updateOne({ _id: section }, { $push: { sectionDoctors: newDoctor._id } });

 

        const sectionUpdated = await sectionModel.findById(section);

        console.log("section updated", sectionUpdated);


      

       // await section.save();
  


        res.status(201).json({newDoctor,  message: 'Doctor created successfully'} );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


// doctor update

const updateDoctor = async (req, res) => {
    const { name, password, email, phone, address, section,description,reference,inwork } = req.body;

    const doctorId = req.params.id;

    const doctor = await doctorModel.findById(doctorId);

// delet old image from cloudinary

const oldImage = doctor.image.public_id;

cloudinary.v2.uploader.destroy(oldImage, function(error, result) {

    console.log(result, error);

    });





    if (!doctor) {

        return res.status(404).json({ message: 'Doctor not found' });
    }

    const image = req.file.path;

    // update image to cloudinary

    const result = await cloudinary.uploader.upload(image, {
        public_id: `${Date.now()}`,
        resource_type: "auto", // jpeg, png
        });

    console.log("setion image------>", result.secure_url);










    doctor.name = name;
    doctor.password = password;
    doctor.email = email;
    doctor.phone = phone;
    doctor.address = address;
    doctor.reference = reference;
    doctor.inwork = inwork;
    doctor.dates = [];

    doctor.description = description;
    doctor.image = {
        public_id: result.public_id,
        secure_url: result.secure_url,
    };
    doctor.section = section;
  


    try {
        await doctor.save();

        console.log("doctor updated", doctor);

        // section findone and update push doctor id

        const section1 = await sectionModel.updateOne({ _id: section }, { $push: { sectionDoctors: doctor._id } });

        const sectionUpdated = await sectionModel.findById(section);

        console.log("section updated", sectionUpdated);

        res.status(201).json({ doctor, message: 'Doctor updated successfully' });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}


// delete doctor by id

const deleteDoctor = async (req, res) => {

    const doctorId = req.params.id;

    const doctor = await doctorModel.findById(doctorId);

    if (!doctor) {

        return res.status(404).json({ message: 'Doctor not found' });

    }

    try {

        await doctor.remove();


        // when remove doctor remove it from section model doctors array

        const section = await sectionModel.findById(doctor.section);

        section.sectionDoctors.pull(doctor._id);

        await section.save();



        res.status(200).json({ message: 'Doctor deleted successfully' });

    } catch (error) {   


        res.status(409).json({ message: error.message });

    }
}


// find 8 doctor from doctors models


// find only 5 doctor from docrtors models

const getAllDoctorsonlyFive = async (req, res) => {

   


    const allData = await doctorModel.find();

    const doctors = allData.slice(0, 8);
    res.status(200).json( doctors );



    

}






 // get all doctors


 
    const getAllDoctors = async (req, res) => {

        const doctors = await doctorModel.find();

        res.status(200).json({ doctors });

    }



    // get doctor by id

    const getDoctorById = async (req, res) => {

        const doctorId = req.params.id;

        const doctor = await doctorModel.findById(doctorId).populate('section','name');

        if (!doctor) {

            return res.status(404).json({ message: 'Doctor not found' });

        }

        res.status(200).json({ doctor });

    }



    // get doctor by section id all section doctors

    const getDoctorBySectionId = async (req, res) => {

        const sectionId = req.params.id;

        const doctor = await doctorModel.find({ section: sectionId });


        if (!doctor) {

            return res.status(404).json({ message: 'Doctor not found' });

        }

        res.status(200).json({ doctor });

    }



    // search doctor by  regex

    const searchDoctor = async (req, res) => {



        console.log('--------------->',req.params.name);

        typeof req.params.name === 'string' ? console.log('string') : console.log('not string');

        const regex = new RegExp(req.params.name, 'i');




        const doctor = await doctorModel.find({ name: regex }).select('-section');

        if (!doctor) {

            return res.status(404).json({ message: 'Doctor not found' });


        }

        res.status(200).json({ doctor });

    }









router.post('/',upload.single('image'), createDoctor);

router.put('/:id',upload.single('image'), updateDoctor);

// delete doctor


router.delete('/:id', deleteDoctor);


// get all getDoctor

router.get('/allDoctors', getAllDoctors);

router.get('/allDoctors5', getAllDoctorsonlyFive);




// get doctor by id

    router.get('/:id', getDoctorById);


// get doctor by section id


    router.get('/section/:id', getDoctorBySectionId);




// search doctor by name

    router.get('/search/:name', searchDoctor);




module.exports = router