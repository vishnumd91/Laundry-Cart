const express = require("express");
const {registerController, loginController, testController, getUserDetailsController, updateUserPhotoController, sendRecoveryEmailController, getUserPhotoController} = require("../controllers/userController");
const requireSignIn = require("../middlewares/userMiddleware");
// const formidable = require('express-formidable');

const router = express.Router();

router.post('/register', registerController);

router.post('/login', loginController);

router.get('/test', requireSignIn, testController);

router.get('/', requireSignIn, getUserDetailsController);

// router.put('/update/:id', requireSignIn, formidable(), updateUserPhotoController)
router.put('/update/:id', requireSignIn, updateUserPhotoController)

router.post('/send-recovery-email', sendRecoveryEmailController);

router.get('/auth-user', requireSignIn, (req, res) => {
    res.status(200).send({ok:true});
})



module.exports = router;