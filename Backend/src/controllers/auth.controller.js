const userModel = require('../models/user.model');
const foodVendorModel = require('../models/foodvendor.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function registerUser(req, res) {
    const { fullname, email, password } = req.body;

    const isUserAlreadyExists = await userModel.findOne({ email });

    if (isUserAlreadyExists) {
        return res.status(400).json({
            message: "User Already Exists"
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        fullname,
        email,
        password: hashedPassword
    });

    const token = jwt.sign(
        { id: user._id },
        'f61d8e2c4156dbd6dec575af71bd2e8c7f55b449619f396ae03364a226dbe099'
    );

    res.cookie("token", token, {
        httpOnly: true
    });

    return res.status(201).json({
        message: "User Registered Successfully",
        user: {
            _id: user._id,
            email: user.email,
            fullname: user.fullname
        }
    });
}

async function loginUser(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(400).json({
            message: "Invalid Email or Password"
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid Email or Password"
        });
    }

    const token = jwt.sign(
        { id: user._id },
        'f61d8e2c4156dbd6dec575af71bd2e8c7f55b449619f396ae03364a226dbe099'
    );

    res.cookie("token", token, {
        httpOnly: true
    });

    return res.status(200).json({
        message: "User Logged In Successfully",
        user: {
            _id: user._id,
            email: user.email,
            fullname: user.fullname
        }
    });
}

function logoutUser(req, res) {
    res.clearCookie("token");
    return res.status(200).json({
        message: "User Logged Out Successfully"
    });
}


async function registerFoodVendor(req , res) {
    
    const { name, email, password } = req.body;

    const isAccountAlreadyExist = await foodVendorModel.findOne({
        email
    })

    if (isAccountAlreadyExist) {
        return res.status(400).json({
            message: "Food Vendor Account Already Exist"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const foodVendor = await foodVendorModel.create({
        name,
        email,
        password: hashedPassword
    })

    const token = jwt.sign({
        id: foodVendor._id,

    }, 'f61d8e2c4156dbd6dec575af71bd2e8c7f55b449619f396ae03364a226dbe099')
    res.cookie("token", token)

    res.status(201).json({
        message: "Food Vendor Registered Successfully",
        foodVendor: {
            _id: foodVendor._id,
            email: foodVendor.email,
            name: foodVendor.name
        }
    })
}

async function loginFoodVendor(req , res) {

    const { email , password } = req.body;

     const foodVendor = await foodVendorModel.findOne({
        email
     })

     if(!foodVendor) {
        res.status(400).json ({
            message: "Invalid Email or Password"
        })
     }

     const isPasswordValid = await bcrypt.compare(password , foodVendor.password);

     if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid Email or Password"
        })
     }

     
         const token = jwt.sign({
            id: foodVendor._id
         }, 'f61d8e2c4156dbd6dec575af71bd2e8c7f55b449619f396ae03364a226dbe099')

            res.cookie("token", token)

            res.status(200).json({
                message: "Food Vendor Logged In Successfully",
                foodVendor: {
                    _id: foodVendor._id,
                    email: foodVendor.email,
                    fullname: foodVendor.fullname
                }
            })
}

function logoutFoodVendor(req, res) {
        res.clearCookie("token");
        res.status(200).json ({
            message: "Food Vendor Logged Out Successfully"
        });
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodVendor,
    loginFoodVendor,
    logoutFoodVendor

};
