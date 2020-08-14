const mongoose = require('mongoose')

const noteSchema = mongoose.Schema({
    notedata: String,
    createdby: String
})

module.exports = mongoose.model('note', noteSchema)