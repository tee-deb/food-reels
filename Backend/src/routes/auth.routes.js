const express = require('express')
const authController = require('../controllers/auth.controller');

const router = express.Router();

// user auth routes

router.post('/user/register', authController.registerUser)
router.post('/user/login', authController.loginUser)
router.get('/user/logout', authController.logoutUser)


// food vendor auth routes

router.post('/food-vendor/register', authController.registerFoodVendor)
router.post('/food-vendor/login', authController.loginFoodVendor)
router.get('/food-vendor/logout', authController.logoutFoodVendor)


module.exports = router;