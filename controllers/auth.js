const Admin = require("../models/admin");
const Doctor = require("../models/doctors");
const Patient = require("../models/Patient");

// verify token

const jwt = require('jsonwebtoken')


const { StatusCodes } = require("http-status-codes");
const Login = async (req, res) => {
  var { email, password } = req.body;
  console.log(req.body);

  // split email @
// substring first 5 char of email
var emailSplit = email.substring(0, 5);
console.log(emailSplit, 'emailSplit');



  if (!email || !password) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Please enter email and password" });
  }
  let currModel;

  //console.log(email.startWith'mahergomeh');


  if (emailSplit === "gomem") {
    console.log('admin',emailSplit);
    currModel = Admin;
  } else if (emailSplit === "docto") {
    currModel = Doctor;
  } else {
    currModel = Patient;
  }

  //delete cerrlypracice from {currModel}
// const newone = await currModel.split("{}");
// console.log(newone, 'newone');

  
  const user = await currModel.findOne({ email: email });
  if (!user) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: "User noooot found" });
  }

console.log(user, 'user');

  const isCorrect = await user.checkPassword(password);

  if (isCorrect) {
    const token = user.generateAuthToken();


    const tokenVerify =  jwt.verify(token, process.env.JWT_KEY);
    console.log(tokenVerify, '<-------------tokenVerify');


    res.status(StatusCodes.OK).json({ token, role:user.role });
  } else {
    res.status(StatusCodes.UNAUTHORIZED).json({ error: "Incorrect password" });
  }
};



// Register


const SignUp = async (req, res) => {
  const { role, name, email, password,  } = req.body;
  console.log(req.body);

  
// substring first 5 char of email
  var emailSplit = email.substring(0, 5);
  console.log(emailSplit, 'emailSplit');

  

  let currModel;
  if (emailSplit === "gomem") {
    currModel = Admin;
  } else if (emailSplit === "docto") {
    currModel = Doctor;
  } else {
    currModel = Patient;
  }
  const savedUser = await currModel.create({ ...req.body });

  if (savedUser) {
    const token = savedUser.generateAuthToken();
    res.status(StatusCodes.OK).json({ savedUser, token ,role:savedUser.role });
  } else {
    res.status(StatusCodes.BAD_REQUEST).json({ error: "User not saved" });
  }
};


module.exports = { Login, SignUp };
