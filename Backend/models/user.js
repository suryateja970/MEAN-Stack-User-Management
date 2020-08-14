const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Provide a name"]
    },
    emailid: {
        type: String,
        required: [true, "Provide a emailid"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Provide a password"]
    },
    phoneno: {
        type: Number,
        required: [true, "Provide a 10 digit mobile no"]
    },
    address: {
        type: String,
        required: [true, "Provide a address"]
    },
    pincode: {
        type: Number,
        required: [true, "Provide 6 digit pincode"]
    }
})

module.exports = mongoose.model('user', UserSchema)