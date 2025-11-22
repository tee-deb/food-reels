const express = require('express')

const router = express.Router();


router.post('/user/register', authController.registerUser)


module.exports = router;