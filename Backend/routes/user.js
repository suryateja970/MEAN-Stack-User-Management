const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = express.Router();

const User = require('../models/user')
const auth = require('../middleware/auth')
router.post(
    '/register',

    async(req, res) => {
        try {
            const { name, emailid, password, address, phoneno, pincode } = req.body
            let user = await User.findOne({ emailid })
            if (user) {
                res.status(400).json({
                    message: "user already exists"
                })
            } else {
                user = await new User({
                    name,
                    emailid,
                    password,
                    address,
                    phoneno,
                    pincode
                })
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(password, salt)

                await user.save();

                jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY }, async(error, token) => {
                    if (error)
                        throw error
                    await res.status(200).json({
                        token,
                        name,
                        emailid,
                        address,
                        phoneno,
                        pincode
                    })
                })
            }








        } catch (err) {
            res.status(400).json({
                message: "Something went wrong"
            })
        }
    }
);

router.post('/login', async(req, res) => {
    try {
        const { emailid, password } = req.body
        console.log(req.body)
        let user = await User.findOne({ emailid })

        if (!user) {
            await res.status(200).json({ message: "Not a user, Please SignUp first" })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return await res.status(400).json({
                message: "Invalid Password"
            })
        }
        return jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY }, async(error, token) => {
            if (error)
                throw error
            await res.status(200).cookie('token', 'token', {
                expires: await new Date(Date.now() + process.env.JWT_COOKIE_EXPIRY * 24 * 60 * 60 * 1000),
                httpOnly: true
            }).json({
                token,
                emailid,
            })

        })


    } catch (error) {
        res.status(400).json({
            message: "error while logging in"
        })
    }

})

router.get("/me", auth, async(req, res) => {
    try {
        const user = await User.findById(req.user);
        console.log(user)
        res.json(user)
    } catch (e) {
        res.send({ message: "error" })
    }
})
module.exports = router