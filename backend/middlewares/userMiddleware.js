const jwt = require("jsonwebtoken");
const User = require('../models/Users');

const requireSignIn = async (req, res, next) => {
    try {
        const decode = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
        req.user = await User.findById(decode._id).select("-password");
        next();
    } catch (error) {
        // console.log(`Error in Middleware: ${error}`);
    }
}

module.exports = requireSignIn;