const mongoose = require('mongoose')

// Set the schema for the cars
const carShema = mongoose.Schema({
    brand: {
        type: String,
        trim: true,
        required: true,
    },
    model: {
        type: String,
        trim: true,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    currentStock:{
        type: Number,
        required: true,
    },
    wishStock:{
        type: Number,
        required: true,
    },
    dangerStock:{
        type: Number,
        required: true,
    }
}, {timestamps: true})

module.exports = mongoose.model('Car', carShema)
