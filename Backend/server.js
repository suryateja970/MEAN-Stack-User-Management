const express = require('express')
const cors = require('cors')
const cookieparser = require('cookie-parser')
const bodyParser = require('body-parser')
const { success, error } = require('consola')
const dotenv = require('dotenv')
dotenv.config({ path: './config/config.env' })
const connectDB = require('./config/db')
connectDB();

const user = require('./routes/user')
const note = require('./routes/note')
const app = express()

const port = 3000
app.use(express.json())
app.use(bodyParser.json())
app.use(cors())
app.use(cookieparser())
app.use('/user', user)
app.use('/note', note)
app.get('/', (req, res) => {
    res.send('Hello World!').cookie("surya", 35)
})
app.listen(port, () => {
    success({
        message: "server is running on port" + port,
        badge: true
    })
})