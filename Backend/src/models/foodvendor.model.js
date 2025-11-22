const mongoose = require('mongoose');


const foodVendorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
        
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const foodVendorModel = mongoose.model('FoodVendor', foodVendorSchema);

module.exports = foodVendorModel;