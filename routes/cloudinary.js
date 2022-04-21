const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const router = require("express").Router();


  
  



const cloudinary = require("cloudinary");


// config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// req.files.file.path
const upload1 = async (req, res) => {
  try {
    // save image in cloudinary

    let result = await cloudinary.uploader.upload(req.file.path, {
      public_id: `${Date.now()}`,
      resource_type: "auto", // jpeg, png
      folder: "favorite",
      upload_perset: "vxyk3kr9",
    });

    // ------------

    //console.log(req.body.image)
    console.log("file---->", req.file);
    console.log("heloooo>>>>>>>>>>>>> image * _ * ");

    res.json({
      // response this data in react
      public_id: result.public_id, // public key of image that saved in cloudinary storage
      url: result.secure_url, // images coming from cloudinary after post it from form in reactjs
    });
  } catch (err) {
    console.log(err);

    console.log("whatssssss happpend >>>> here");
    res.status(400).json({ message: err });
  }
};

const remove = (req, res) => {
  let image_id = req.body.public_id;

  cloudinary.uploader.destroy(image_id, (err, result) => {
    if (err) return res.json({ success: false, err });
    res.send("ok");
  });
};


// -------------upload array of images----------- 
const uploadArray = async (req, res) => {

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
           res.send({uploadedImages, success: 'Multiple Files Successfully Uploaded'})
     }
    } catch (err) {

        res.send({error: "Some thing was wrong"})

    }
  

  
      
  };


router.post("/uploadimages", upload1);
router.post("/removeimage", remove);

//-------- array of images upload to cloudinary----

// upload.any()
//upload.array('images')


router.post("/uploadimagesArray",upload.array('images'), uploadArray);

module.exports = router;
