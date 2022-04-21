 const sectionModel = require('../models/section')
const {cloudinary } = require('../middleware/cloudinary')


 // create section

 exports.createSection = async (req, res) => {
    const {name,title,description} = req.body

// section image

const image = req.file
console.log('image--->',image)

let result = await cloudinary.uploader.upload(image, { 
    public_id: `${Date.now()}`,
    resource_type: "auto", // jpeg, png



  });

console.log('setion image------>',result.secure_url)




    const newPostMessage = new PostMessage({ ...req.body, ...result.secure_url, createdAt: new Date().toISOString() })

    try {
        await newPostMessage.save();

        res.status(201).json(newPostMessage);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}






 // update  sectionModel






 // all sections get




 // specefic section get



 // delete section