const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

// @route Route User (POST)
// @desc Route to add a new user (Form in frontend)
// @access Private (admin)
router.route('/register').post(userController.register)

// @route Route User (POST)
// @desc Route to connect the user (Form in frontend)
// @access Public
router.route('/login').post(userController.login)

// @route Route User (POST)
// @desc Route to log out (Button in frontend)
// @access Public
router.route('/logout').post(userController.logout)

// @route Route User (GET)
// @desc Route to get ONE user
// @access Private (everyone when logged in | own profile)
router.route('/profile:_id').get(userController.getProfile)

// @route Route User (PUT)
// @desc Route to update profile's infos (Form in frontend)
// @access Private (everyone when logged in | own profile)
router.route('/profile').put(userController.updateProfile)

// @route Route User (PUT)
// @desc Route to update a user's infos (Form in frontend)
// @access Private (admin)
router.route('/updateUser/:id').put(userController.updateUser)

// @route Route User (GET)
// @desc Route to get ALL user
// @access Private (admin)
router.route('/getUsers').get(userController.getUsers)

// @route Route User (GET)
// @desc Route to get ONE user
// @access Private (admin)
router.route('/getAUser/:id').get(userController.getAUser)

// @route Route User (DELETE)
// @desc Route to delete ONE user
// @access Private (admin)
router.route('/deleteUser/:id').delete(userController.deleteUser)


//Export des routes
module.exports = router