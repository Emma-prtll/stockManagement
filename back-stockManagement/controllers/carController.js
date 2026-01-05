//Import des librairies et fichiers
const handler = require('express-async-handler')
const Car = require('../models/carModel')

// @route Route Car (POST)
// @desc Route pour créer un produit (formulaire sur le frontend)
// @access Private (admin)
const addItem = handler (async (req, res) => {
    //On récupère les infos du frontend | on déstructure afin de ne pas avoir à écrire undividuellement pour chaque champs du formuaire
    const {brand, model, type, year, currentStock, wishStock, dangerStock} = req.body

    //On check si les infos "required" sont présentes et pas vides
    if(!brand || !model || !type || !year || currentStock === undefined || wishStock === undefined || dangerStock === undefined) {
        res.status(400)
        throw new Error ("Merci de remplir tous les champs")
    }

    //Ici, le formulaire est rempli correctement
    //On vérifie s'il existe déjà
    const carExists = await Car.findOne({model})
    if(carExists){
        res.status(400)
        throw new Error("La voiture existe déjà dans les stocks")
    }

    //Ici, on a tout vérifié
    //On enregistre la voiture
    const car = await Car.create({
        brand,
        model,
        type,
        year,
        currentStock,
        wishStock,
        dangerStock
    })

    //Informer le user que c'est bon !
    if(car){
        res.status(201).json({"Message" : `La voiture à été créer avec succès.`, car})
    } else {
        res.status(400)
        throw new Error("Une erreur est survenue !")
    }
})

const updateItem = handler (async (req, res) => {
    //On vérifie si l'item existe
    // const car = await Car.findById(req.body._id)
    console.log("PARAMS :", req.params)
    console.log("BODY :", req.body)
    const car = await Car.findById(req.params.id)
    console.log("CAR FOUND :", car)
    if(!car) {
        res.status(400)
        throw new Error("La voiture n'existe pas.")
    }
    //Ici, on a un item qui existe
    //On peut le mettre à jours
    car.brand = req.body.brand ? req.body.brand : car.brand
    car.model = req.body.model ? req.body.model : car.model
    car.type = req.body.type ? req.body.type : car.type
    car.year = req.body.year ? req.body.year : car.year
    car.currentStock = req.body.currentStock ? req.body.currentStock : car.currentStock
    car.wishStock = req.body.wishStock ? req.body.wishStock : car.wishStock
    car.dangerStock = req.body.dangerStock ? req.body.dangerStock : car.dangerStock

    //Ici, on a toutes les données qui doivent être modifiées
    //On enregistre les modifications
    const updatedCar = await car.save()

    res.status(200).json({
        _id: updatedCar._id,
        brand: updatedCar.brand,
        model: updatedCar.model,
        type: updatedCar.type,
        year: updatedCar.year,
        currentStock: updatedCar.currentStock,
        wishStock: updatedCar.wishStock,
        dangerStock: updatedCar.dangerStock,
    })
    //res.status(200).json({"Message" : `La voiture ${updatedCar._id} | ${updatedCar.brand} à été modifiée avec succès !`})
})

const deleteItem = (req, res) => {
    res.status(200).json({message: `Route pour supprimer une voiture : ${req.params._id}`})
}

const getCars =  handler (async (req, res) => {
    const cars = await Car.find()
    res.status(200).json(cars)
})

const getACar = handler (async (req, res) => {
    //On vérifie si l'item existe
    const car = await Car.findById(req.params.id)

    if(car) {
        //Ici, on a un item qui existe, on le retourne au frontend
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
        //Ici, l'item n'existe pas
        res.status(400)
        throw new Error("La voiture n'existe pas.")
    }

    // res.status(200).json({message: `Route pour récupérer UNE voiture : ${req.params._id}`})
})

module.exports = {
    addItem,
    updateItem,
    deleteItem,
    getCars,
    getACar
}