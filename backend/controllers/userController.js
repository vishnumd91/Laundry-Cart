const { hashPassword, comparePassword } = require("../helpers/userHelper");
const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const nodemailer = require("nodemailer");

const registerController = async (req, res) => {
  try {
    const { name, email, phone, state, district, address, pincode, password } =
      req.body;

    // Helper function to validate required fields
    const validateFields = (fields) => {
      for (const [key, value] of Object.entries(fields)) {
        if (!value) {
          return `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
        }
      }
      return null;
    };

    // Validate required fields
    const errorMessage = validateFields({
      name,
      email,
      phone,
      state,
      district,
      address,
      pincode,
      password,
    });
    if (errorMessage) {
      return res.send({ message: errorMessage });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "Already registered, Please login!",
      });
    }

    // Hash password and create new user
    const hashedPassword = await hashPassword(password);
    const user = new User({
      name,
      email,
      phone,
      state,
      district,
      address,
      pincode,
      password: hashedPassword,
    });
    await user.save();

    res.status(201).send({
      success: true,
      message: "User Registered Successfully",
      user,
    });
  } catch (error) {
    console.log(`Error in Registration: ${error}`);
    res.status(500).send({
      success: false,
      message: "Error in Registration",
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { credential, password } = req.body;

    if (!credential || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid Credentials or Password",
      });
    }

    let user = await User.findOne({ email: credential });
    if (!user) {
      user = await User.findOne({ phone: credential });
    }
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User is not registered",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login Successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        photo: user.photo,
      },
      token,
    });
  } catch (error) {
    // console.log(`Error in login: ${error}`);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

const testController = (req, res) => {
  res.send({
    success: true,
    message: "Protected Route",
  });
};

const getUserDetailsController = async (req, res) => {
  try {
    const userProfileDetails = await User.find({ _id: req.user._id });
    res.status(200).send({
      success: true,
      data: userProfileDetails,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting user details",
      error,
    });
  }
};

//not working
const updateUserPhotoController = async (req, res) => {
  try {
    const { photo } = req.files;
    if (photo && photo.size > 1000000) {
      return res.status(500).send({
        error: "photo is Required and should be less then 1mb",
      });
    }
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        photo: fs.readFileSync(photo.path),
      },
      { new: true }
    );

    // const user = await User.find({_id: req.params.id});

    // if (photo) {
    //     user.photo.data = fs.readFileSync(photo.path);
    //     user.photo.contentType = photo.type;
    // }

    await user.save();

    res.status(201).send({
      success: true,
      message: "Profile Updated Successfully",
      products,
    });
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while updating user details",
      error,
    });
  }
};

const sendRecoveryEmailController = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      //Node Mailer to send mail Functionality not available

      /*
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: process.env.MY_EMAIL,
                  pass: process.env.MY_PASSWORD
                }
              });
              
              var mailOptions = {
                from: process.env.MY_EMAIL,
                to: email,
                subject: 'OTP for Password Reset',
                text: `Here is your OTP: ${OTP}`
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                  return res.status(500).send({
                    success: false,
                    message: "Could not send Email"
                  })
                } else {
                  console.log('Email sent: ' + info.response);
                  return res.status(200).send({
                    success: true,
                    message: "Email sent successfully"
                  })
                }
              });
            */

      return res.status(200).send({
        success: true,
        message: "Feature is not available yet",
      });
    } else {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    // console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating Password",
    });
  }
};

module.exports = {
  registerController,
  loginController,
  testController,
  getUserDetailsController,
  updateUserPhotoController,
  sendRecoveryEmailController,
};
