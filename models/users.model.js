const mongoose = require('mongoose')
const { Schema } = mongoose

const usersSchema = new Schema({
    name: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    dob: {
        type: Date,
        required: false
    },
    password: {
        type: String,
        required: true
    },
    blog: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Blog'
        }
    ]
}, { timestamps: true })

usersSchema.set('toJSON', {
    transform: (doc, object) => {
        object.id = object._id.toString()
        delete object._id
        delete object.__v
        delete object.password
    }
})

const Users = mongoose.model('Users', usersSchema)
module.exports = Users