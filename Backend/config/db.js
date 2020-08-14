const mongoose = require('mongoose')
const { success, error } = require('consola')

const connectDB = async() => {
    try {

        mongoose.connect(process.env.DB_URL, {
            useUnifiedTopology: true,
            useCreateIndex: true,
            useNewUrlParser: true,
            useFindAndModify: false
        }, success({
            message: "Database connected successfully",
            badge: true
        }))
    } catch (err) {
        error({
            message: "Mongodb is not connected and exception raised",
            badge: true
        })
    }
}
module.exports = connectDB;