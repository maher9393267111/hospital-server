
const User =require('../models/user')
const admin = require("../firebase/index");

exports.authCheck = async (req, res, next) => {
   console.log(req.headers); // token
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken); // authToken  property from req.header
     console.log("FIREBASE USER IN AUTHCHECK", firebaseUser);

// user info that come from user info after send his token ///////
console.log(firebaseUser);
    req.user = firebaseUser;
    next();
  } catch (err) {
    res.status(401).json({
      err: "Invalid or expired token",
    });
  }
};



// admin check


// check admin  with maher gomeh email startSession

exports.adminCheck = async (req, res, next) => {
    const { email } = req.user;
  
    if (email.startWith('mahergomeh')) {
    console.log('hello admin bey')
  
    const adminUser = await adminModel.findOne({ email }).exec();
  
    if (adminUser.role !== "admin") {
      res.status(403).json({
        err: "Admin resource. Access denied.",
      });
    }
    } else {
      next();
    }
  };



  // docto r check



  exports.doctorCheck = async (req, res, next) => {
    const { email } = req.user;
  
    if (email.startWith('doctor')) {
    console.log('hello admin bey')
  
    const adminUser = await DocotorModel.findOne({ email }).exec();
  
    if (adminUser.role !== "admin") {
      res.status(403).json({
        err: "Doctor resource. Access denied.",
      })
    }
    } else {
      next();
    }
  };

