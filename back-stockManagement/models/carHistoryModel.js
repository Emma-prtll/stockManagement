const mongoose = require('mongoose')

// Set the schema for the cars historic
const carHistorySchema = mongoose.Schema({
    carId: {
        // Link with the car schema to get the car id
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car",
        required: true,
    },
    currentStock: {
        type: Number,
        required: true,
    },

}, {timestamps: true})



module.exports = mongoose.model(
    "CarStockHistory",
    carHistorySchema
);