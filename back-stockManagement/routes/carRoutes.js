const express = require('express')
const router = express.Router()
const carController = require('../controllers/carController')

// @route Route Car (POST)
// @desc Route to add a new item (Form in frontend)
// @access Private (admin & manager)
router.route('/addItem').post(carController.addItem)

// @route Route Car (PUT)
// @desc Route to update an item infos (Form in frontend)
// @access Private (admin & manager)
router.route('/updateItem/:id').put(carController.updateItem)

// @route Route Car (DELETE)
// @desc Route to delete an item (Button in frontend)
// @access Private (admin & manager)
router.route('/deleteItem/:id').delete(carController.deleteItem)

// @route Route Car (GET)
// @desc Route to get ALL items
// @access Private (everyone when logged in)
router.route('/getCars').get(carController.getCars)

// @route Route Car (GET)
// @desc Route to get ONE item
// @access Private (everyone when logged in)
router.route('/getACar/:id').get(carController.getACar)

module.exports = router