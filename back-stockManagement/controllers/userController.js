const handler = require('express-async-handler')
const User = require('../models/userModel')
const {generateToken} = require('../utils/generateToken')
const bcrypt = require('bcrypt')
const userModel = require("../models/userModel");

// @route Route User (POST)
// @desc Route to add a new user (Form in frontend)
// @access Private (admin)
const register = handler(async (req, res) => {
    // Stock datas from frontend | destructure to not have to write individually for each field of the form.
    const {firstName, lastName, email, password, role, sector} = req.body

    // Check if "required" fields are respected
    if(!email || !password || !firstName || !lastName || !role || !sector || email === '' || password === '' || firstName === '' || lastName === '' || role === '' || sector === '') {
        return res.status(400).json({message: "You need to fill all the fields !"})
    }

    // Form correctly filled | check if the user already exists
    const userExists = await User.findOne({email})
    if(userExists){
        return res.status(400).json({message: "L'utilisateur existe déjà."})
    }

    // Everything is correct | Save the new user
    const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        role,
        sector
    })

    if(user) {
    // No connexion after the registration = notification to frontend
        res.status(201).json({
            _id: user._id,
            email: user.email,
            lastName: user.lastName ? user.lastName : "",
            firstName: user.firstName ? user.firstName : "",
            role: user.role ? user.role : "",
            sector: user.sector ? user.sector : "",
            message: `${user.firstName} ${user.lastName} has been created successfully!`
        })
    } else {
        return res.status(400).json({message: "Something went wrong !"})
    }
})

// @route Route User (POST)
// @desc Route to connect the user (Form in frontend)
// @access Public
const login = handler(async (req, res) => {
    // Stock datas from frontend
    const {email, password} = req.body

    const user = await User.findOne({email})
    // Check if user exists and password is correct
    if(user && await user.matchPassword(password)) {
        generateToken(res, user._id) // Token generation
        res.status(200).json({ // User information sent to frontend
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role : user.role,
            sector : user.sector
        })
    } else {
        res.status(400).json({message: "Email ou mot de passe incorrect."})
    }
})

// @route Route User (POST)
// @desc Route to log out (Button in frontend)
// @access Public
const logout = handler( async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({message : "Logged out successfully."})
})

// @route Route User (GET)
// @desc Route to get ONE user
// @access Private (everyone when logged in | own profile)
const getProfile = handler (async (req, res) => {
    // Check if user exists
    const user = await User.findById(req.params._id)

    if(user) {
        res.status(200).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role : user.role,
            sector : user.sector
        })
    } else {
        return res.status(400).json({message: "User not found."})
    }
})

// @route Route User (PUT)
// @desc Route to update profile's infos (Form in frontend)
// @access Private (everyone when logged in | own profile)
const updateProfile = handler(async (req, res) => {
    // Check if the user exists
    console.log(req.body)
    const user = await User.findById(req.body._id)

    if(!user){
        return res.status(400).json({message: "User not found."})
    }

    // Everything is correct | Save the updated user
    user.firstName = req.body.input.firstName ? req.body.input.firstName : user.firstName
    user.lastName = req.body.input.lastName ? req.body.input.lastName : user.lastName
    user.email = req.body.input.email ? req.body.input.email : user.email
    user.role = req.body.role ? req.body.role : user.role
    user.sector = req.body.sector ? req.body.sector : user.sector

    if(req.body.input.oldPassword) {
        // Compare the old password with the password stored in the database
        let compare = await bcrypt.compare(req.body.input.oldPassword, user.password)
        if(!compare) {
            return res.status(400).json({message: "Password incorrect. Please try again !"})
        } else {
            //Password correct = update the password
            user.password = req.body.input.newPassword
        }
    }

    // Everything is correct | Stock the new infos
    const updateProfile = await user.save()

    res.status(200).json({
        _id: updateProfile._id,
        email: updateProfile.email,
        lastName: updateProfile.lastName,
        firstName: updateProfile.firstName,
        role: updateProfile.role,
        sector: updateProfile.sector,
        message: `Your profile has been update successfully!`
    })
})

// @route Route User (PUT)
// @desc Route to update a user's infos (Form in frontend)
// @access Private (admin)
const updateUser = handler(async (req, res) => {
    // Check if the user exists
    const user = await User.findById(req.params.id)

    if(!user){
        return res.status(400).json({message: "User not found."})
    }

    // Everything is correct | Save the updated user
    user.firstName = req.body.firstName ? req.body.firstName : user.firstName
    user.lastName = req.body.lastName ? req.body.lastName : user.lastName
    user.email = req.body.email ? req.body.email : user.email
    user.role = req.body.role ? req.body.role : user.role
    user.sector = req.body.sector ? req.body.sector : user.sector

    // Everything is correct | Stock the new infos
    const updateUser = await user.save()

    res.status(200).json({
        _id: updateUser._id,
        email: updateUser.email,
        lastName: updateUser.lastName,
        firstName: updateUser.firstName,
        role: updateUser.role,
        sector: updateUser.sector,
        message: `${user.firstName} ${user.lastName} has been update successfully!`
    })
})

// @route Route User (GET)
// @desc Route to get ALL user
// @access Private (admin)
const getUsers =  handler (async (req, res) => {
    // Check if user exists
    const users = await User.find()

    res.status(200).json(users)
})

// @route Route User (GET)
// @desc Route to get ONE user
// @access Private (admin)
const getAUser = handler (async (req, res) => {
    // Check if user exists
    const user = await User.findById(req.params.id)

    if(user) {
        //Everything is correct | Send the user to the frontend
        res.status(200).json({
            _id: user._id,
            email: user.email,
            lastName: user.lastName,
            firstName: user.firstName,
            role: user.role,
            sector: user.sector
        })
    } else {
        res.status(400)
        throw new Error("User not found.")
    }
})

// @route Route User (DELETE)
// @desc Route to delete ONE user
// @access Private (admin)
const deleteUser = handler(async (req, res) => {
    // Check if user exists
    const user = await userModel.findById(req.params.id)

    if(!user) {
        return res.status(400).json({message: "User not found."})
    }

    await user.deleteOne()
    res.status(200).json({
        message: `User ${user.firstName} ${user.lastName} deleted successfully`,
    })
})

module.exports = {
    register,
    login,
    logout,
    getProfile,
    updateProfile,
    updateUser,
    getUsers,
    getAUser,
    deleteUser
}