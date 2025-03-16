const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String, 
        required: true,
        trim: true
    },
    email: {
        type: String, 
        required: true, 
        unique: true, 
        match: [/^\S+@\S+\.\S+$/, "Please Enter a valid email."]
    },
    phone: {
        type: Number, 
        required: true, 
        unique: true
    },
    state: {
        type: String, 
        required: true
    },
    district: {
        type: String, 
        required: true
    },
    address: {
        type: String, 
        required: true
    },
    pincode: {
        type: Number, 
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    photo: {
        data: Buffer,
        contentType: String
    } 
},
{timestamps: true}
);

const User = mongoose.model("User", userSchema);

module.exports = User;