const handler = require('express-async-handler')
const carModel = require('../models/carModel')
const Car = require('../models/carModel')
const carHistory = require("../models/carHistoryModel");

// @route Route Car (POST)
// @desc Route to add a new item (Form in frontend)
// @access Private (admin & manager)
const addItem = handler (async (req, res) => {
    // Stock datas from frontend | destructure to not have to write individually for each field of the form.
    const {brand, model, type, year, currentStock, wishStock, dangerStock} = req.body

    // Check if "required" fields are respected
    if(!brand || !model || !type || !year || currentStock === undefined || wishStock === undefined || dangerStock === undefined) {
        return res.status(400).json({message: "You need to fill all the fields !"})
    }

    // Form correctly filled | check if car already exists
    const carExists = await Car.findOne({model, year})
    if(carExists){
        return res.status(400).json({message: "This car already exists ! Please update it instead of creating a new one."})
    }

    // Everything is correct | Save the new car
    const car = await Car.create({
        brand,
        model,
        type,
        year,
        currentStock,
        wishStock,
        dangerStock
    })

    await carHistory.create({
        carId: car._id,
        currentStock: car.currentStock,
    });

    // Notification to frontend for the user
    if(car){
        return res.status(201).json({message: `The car has been correctly created.`, car})
    } else {
        return res.status(400).json({message: "Something went wrong!"})
    }
})

// @route Route Car (PUT)
// @desc Route to update an item infos (Form in frontend)
// @access Private (admin & manager)
const updateItem = handler (async (req, res) => {
    // Check if the item already exists
    const car = await Car.findById(req.params.id)

    // Check if item exists
    if(!car) {
        return res.status(400).json({message: "There is no car with this ID !"})
    }

    const oldStock = car.currentStock;

    // Everything is correct | Update the car
    car.brand = req.body.brand ? req.body.brand : car.brand
    car.model = req.body.model ? req.body.model : car.model
    car.type = req.body.type ? req.body.type : car.type
    car.year = req.body.year ? req.body.year : car.year
    car.currentStock = req.body.currentStock ? req.body.currentStock : car.currentStock
    car.wishStock = req.body.wishStock ? req.body.wishStock : car.wishStock
    car.dangerStock = req.body.dangerStock ? req.body.dangerStock : car.dangerStock

    // Save the new informations
    const updatedCar = await car.save()

    // Historic update
    if (
        req.body.currentStock !== undefined &&
        oldStock !== updatedCar.currentStock
    ) {
        await carHistory.create({
            carId: updatedCar._id,
            currentStock: updatedCar.currentStock,
        })
    }

    res.status(200).json({
        _id: updatedCar._id,
        brand: updatedCar.brand,
        model: updatedCar.model,
        type: updatedCar.type,
        year: updatedCar.year,
        currentStock: updatedCar.currentStock,
        wishStock: updatedCar.wishStock,
        dangerStock: updatedCar.dangerStock,
        message: `${car.brand} ${car.model} has been update successfully!`
    })
})

// @route Route Car (DELETE)
// @desc Route to delete an item (Button in frontend)
// @access Private (admin & manager)
const deleteItem = handler(async (req, res) => {
    const car = await carModel.findById(req.params.id)

    // Check if item exists
    if(!car) { return res.status(400).json({message: "No car found with this ID."})
    }

    await car.deleteOne()
    res.status(200).json({
        message: `The car has been deleted successfully`,
    })
})

// @route Route Car (GET)
// @desc Route to get ALL items
// @access Private (everyone when logged in)
const getCars =  handler (async (req, res) => {
    // Sorted by date (newest first)
    const cars = await Car.find().sort({createdAt: -1})

    res.status(200).json(cars)
})

// @route Route Car (GET)
// @desc Route to get ONE item
// @access Private (everyone when logged in)
const getACar = handler (async (req, res) => {
    // Check if item exists
    const car = await Car.findById(req.params.id)

    if(car) {
        // Everything is correct | Send the car to the frontend
        res.status(200).json({
            _id: car._id,
            brand: car.brand,
            model: car.model,
            type: car.type,
            year: car.year,
            currentStock: car.currentStock,
            wishStock: car.wishStock,
            dangerStock: car.dangerStock
        })
    } else {
        // The car doesn't exist'
        res.status(400)
        throw new Error("There is no car with this ID.")
    }

})

module.exports = {
    addItem,
    updateItem,
    deleteItem,
    getCars,
    getACar
}