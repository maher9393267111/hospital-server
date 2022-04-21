const doctorModel = require('../models/doctors');
const cloudinary = require('cloudinary');
const sectionModel = require('../models/section');
const dateModel = require('../models/date');
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



// create avaliabledate for all specefic doctor to make appointment


router.post('/create', upload.single('image'), async (req, res) => {


    const{day,time,doctor,time2,time3}=req.body;

dayTimes= []

// push times in array

dayTimes.push(time,time2,time3)

    // doctor his id


    const newDate = new dateModel({

        dayTimes:dayTimes,
        day:day,
    
        doctor

    });

  
        const savedDate = await newDate.save();

  
 //   const doctorData = await doctorModel.findById(doctor);



console.log(savedDate,'savedDate')







const doctorUp= await doctorModel.updateOne({_id:doctor},{ $push: { dates: newDate._id } })

console.log(doctorUp,'doctorUp')


   //const updadetDoctor=  await doctorModel.updateOne( {_id:doctor},{ $push: { dates:savedDate._id } } );
       


   const changeStream = doctorModel.watch().on('change', change => console.log(change));

        


 



 
    res.status(200).json({

        message: 'date created successfully',

        data: savedDate,
        

    });


});





module.exports = router;









