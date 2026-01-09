//Import des librairies et fichiers
const handler = require('express-async-handler')
const User = require('../models/userModel')
//Import du token
const {generateToken} = require('../utils/generateToken')
const bcrypt = require('bcrypt')
const userModel = require("../models/userModel");


// @route Route User (POST) /api/user/register
// @desc Route pour créer un utilisateur (inscription sur le frontend)
// @access Public
const register = handler(async (req, res) => {
    //On récupère les infos du frontend (formulaire d'inscription) | on déstructure afin de ne pas avoir à écrire individuellement chaque champs
    const {firstName, lastName, email, password, role, sector} = req.body

    //On check si les infos "required" sont présents et pas vides
    if(!email || !password || !firstName || !lastName || !role || !sector || email === '' || password === '' || firstName === '' || lastName === '' || role === '' || sector === '') {
        res.status(400)
        throw new Error ("Merci de remplir tous les champs")
    }

    //Ici, le formulaire est rempli correctement
    //On vérifie s'il existe déja
    const userExists = await User.findOne({email})
    if(userExists){
        res.status(400)
        throw new Error("L'utilisateur existe déjà.")
    }

    //Ici, on a tout vérifié
    //On enregistre l'utilisateur
    const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        role,
        sector
    })

    if(user) {
    // Si vous ne voulez pas un login auto après inscription
        res.status(201).json({
            _id: user._id,
            username: user.username,
            email: user.email,
            lastName: user.lastName ? user.lastName : "",
            firstName: user.firstName ? user.firstName : "",
            role: user.role ? user.role : "",
            sector: user.sector ? user.sector : "",
        })
    } else {
        // res.status(400)
        res.status(400).json({message: "Une erreur est survenue !"})

    }
})


// @route Route User (POST) /api/user/login
// @desc Route pour connecter un utilisateur (connection sur le frontend)
// @access Public
const login = handler(async (req, res) => {
    //On choisit les éléments qui permettent de se connecter au site | email + password reçu par le frontend
    const {email, password} = req.body

    const user = await User.findOne({email})
    //On va vérifier si l'utilisateur existe et si son mdp est correct (le mdp est crypté donc on prend la fonction dans userModel.js)
    if(user && await user.matchPassword(password)) {
        generateToken(res, user._id) //On génère le token, le token se retourne tout seul
        res.status(200).json({ //On retourne quand même d'autres informations utils à récupérer dans le frontend
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role : user.role,
            sector : user.sector
        })
    } else {
        // res.status(400)
        res.status(400).json({message: "Email ou mot de passe incorrect."})
    }
})

// @route Route User (POST) /api/user/logout
// @desc Route pour déconnecter un utilisateur (logout sur le frontend)
// @access Private
const logout = handler( async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({message : "Utilisateur.trice déconnecté avec succès"})
})

// @route Route User (GET) /api/user/profile:_id
// @desc Route pour récupérer les informations d'un utilisateur (onglet profile sur le frontend)
// @access Private
const getProfile = handler (async (req, res) => {
    //On vérifie si l'utilisateur existe
    const user = await User.findById(req.params._id)
    if(user) {
        //Ici, j'ai un utilisateur qui existe
        res.status(200).json({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role : user.role,
            sector : user.sector
        })
    } else {
        //Ici, l'utilisateur n'existe pas
        res.status(400)
        throw new Error("L'utilisateur n'existe pas.")
    }
})

// @route Route User (PUT) /api/user/profile
// @desc Route pour modifer les informations d'un utilisateur (onglet profile sur le frontend)
// @access Private
const updateProfile = handler(async (req, res) => {
    //On vérifie si le profile existe
    console.log(req.body)
    const user = await User.findById(req.body._id)

    if(!user){
        res.status(400)
        throw new Error("L'utilisateur n'existe pas.")
    }

    //Ici, on a un utilisateur qui existe
    //On peut le mettre à jours | (écriture en ternaire)
    user.firstName = req.body.input.firstName ? req.body.input.firstName : user.firstName //Si un firstName est fournis dans le formulaire on prend celui la, sinon on garde ce qu'on a
    user.lastName = req.body.input.lastName ? req.body.input.lastName : user.lastName
    user.email = req.body.input.email ? req.body.input.email : user.email
    user.role = req.body.role ? req.body.role : user.role
    user.sector = req.body.sector ? req.body.sector : user.sector

    if(req.body.input.oldPassword) {
        //Verifier si oldPassword (formulaire) === user.password (bdd)
        let compare = await bcrypt.compare(req.body.input.oldPassword, user.password)
        if(!compare) {
            //si non, on renvoie une erreur
            res.status(400)
            throw new Error("Le mot de passe n'existe pas.")
        } else {
            //Si oui, on modifie le mot de passe de l'utilisateur avec req.body.input.newPassword
            user.password = req.body.input.newPassword
        }
    }

    //Ici, on a toutes les données qui doivent être modifiées | on enregistre les modifications
    const updateProfile = await user.save()

    res.status(200).json({
        _id: updateProfile._id,
        email: updateProfile.email,
        lastName: updateProfile.lastName,
        firstName: updateProfile.firstName,
    })
})

const updateUser = handler(async (req, res) => {
    //On vérifie si le profile existe
    console.log("ID reçu:", req.params.id)
    console.log("Données reçues:", req.body)

    const user = await User.findById(req.params.id)

    if(!user){
        res.status(400)
        throw new Error("L'utilisateur n'existe pas.")
    }

    //Ici, on a un utilisateur qui existe
    //On peut le mettre à jours | (écriture en ternaire)
    user.firstName = req.body.firstName ? req.body.firstName : user.firstName //Si un firstName est fournis dans le formulaire on prend celui la, sinon on garde ce qu'on a
    user.lastName = req.body.lastName ? req.body.lastName : user.lastName
    user.email = req.body.email ? req.body.email : user.email
    user.role = req.body.role ? req.body.role : user.role
    user.sector = req.body.sector ? req.body.sector : user.sector

    // if(req.body.input.oldPassword) {
    //     //Verifier si oldPassword (formulaire) === user.password (bdd)
    //     let compare = await bcrypt.compare(req.body.input.oldPassword, user.password)
    //     if(!compare) {
    //         //si non, on renvoie une erreur
    //         res.status(400)
    //         throw new Error("Le mot de passe n'existe pas.")
    //     } else {
    //         //Si oui, on modifie le mot de passe de l'utilisateur avec req.body.input.newPassword
    //         user.password = req.body.input.newPassword
    //     }
    // }

    //Ici, on a toutes les données qui doivent être modifiées | on enregistre les modifications
    const updateUser = await user.save()

    res.status(200).json({
        _id: updateUser._id,
        email: updateUser.email,
        lastName: updateUser.lastName,
        firstName: updateUser.firstName,
        role: updateUser.role,
        sector: updateUser.sector,
    })
})

const getUsers =  handler (async (req, res) => {
    const users = await User.find()
    res.status(200).json(users)
})

const getAUser = handler (async (req, res) => {
    //On vérifie si l'item existe
    const user = await User.findById(req.params.id)

    if(user) {
        //Ici, on a un item qui existe, on le retourne au frontend
        res.status(200).json({
            _id: user._id,
            email: user.email,
            lastName: user.lastName,
            firstName: user.firstName,
            role: user.role,
            sector: user.sector
        })
    } else {
        //Ici, l'item n'existe pas
        res.status(400)
        throw new Error("L'utilisateur n'existe pas.")
    }

    // res.status(200).json({message: `Route pour récupérer UN utilisateur.trice : ${req.params._id}`})
})

const deleteUser = handler(async (req, res) => {
    const user = await userModel.findById(req.params.id)

    if(!user) {
        res.status(400)
        throw new Error("Aucun user trouvé.")
    }

    await user.deleteOne()
    res.status(200).json({
        message: `Le user ${user.lastName} a bien été supprimé.`,
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