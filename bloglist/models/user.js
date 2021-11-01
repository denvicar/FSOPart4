const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    passwordHash: String
})

userSchema.set('toJSON', {
    transform: (document, object) => {
        object.id = object._id
        delete object._id
        delete object.__v
        delete object.passwordHash
    }
})

module.exports = mongoose.model('User',userSchema)