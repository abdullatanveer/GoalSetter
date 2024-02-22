const express = require('express');

const router = express.Router();
const {registerUser, loginUser,getUserProfile}=require("../controller/userController");
const {protect}=require("../middleware/authMiddleware")

router.route('/').post(registerUser);
router.route('/login').post(loginUser);
router.get('/profile',protect,getUserProfile)

module.exports = router;