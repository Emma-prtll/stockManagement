const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

// Set the schema for the users
const userSchema = mongoose.Schema({
    firstName : {
        type : String,
        trim : true,
        required : true
    },
    lastName : {
        type : String,
        trim : true,
        required : true
    },
    email : {
        type : String,
        trim : true,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    role : {
        type : String,
        required : true,
    },
    sector : {
        type : String,
        required : true,
    }
}, {timestamps : true})

// Compare the entered password with the password in the database (for login)
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password) //"this.password" = the password entered by the user
}// The return will either return true so it's good or false so it won't pass

// Encrypt the user password when registering
userSchema.pre('save', async function (next) {
    // If the password exists but is not modified, nothing is done
    if(!this.isModified('password')) {
        next()
    }

    // If the password doesn't exist or is modified, it is encrypted and saved
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

module.exports = mongoose.model('User', userSchema)