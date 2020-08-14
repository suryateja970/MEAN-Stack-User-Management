const jwt = require('jsonwebtoken')
const user = require('../models/user')
module.exports = async(req, res, next) => {

    const token = await req.header("token");
    console.log("start")
    console.log(token)
    console.log("end")
    if (!token) {
        console.log("this is token from auth");
        console.log(token);
        return res.status(200).json({
            message: "Not a Authorized user "
        })
    }


    console.log("endend")
    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET)

        req.user = decoded.id;
        console.log("user details")
        console.log("Thisi is user id" + req.user)
        next();
    } catch (e) {
        console.log(e);
        res.status(500).send({
            message: "invalid token"
        })
    }
}