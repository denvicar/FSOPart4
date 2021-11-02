const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        unique: true
    },
    name: String,
    passwordHash: String,
    blogs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
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