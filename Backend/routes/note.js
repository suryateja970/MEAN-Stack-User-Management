const express = require('express')
const router = express.Router();
const User = require('../models/user')
const Note = require('../models/note')
const auth = require('../middleware/auth');
const { Mongoose } = require('mongoose');
const jwt = require('jsonwebtoken')

router.post('/cn', auth, async(req, res) => {
    try {
        const user = await User.findById(req.user);
        // console.log(user)
        console.log(req.body)
        const {
            notedata
        } = await req.body
        console.log(notedata)
        const createdby = await user._id
        const note = await new Note({
            notedata: notedata,
            createdby
        })
        await note.save();
        res.status(200).json({
            data: note,
            message: "data saved succesfully"
        })
    } catch (err) {
        res.status(200).json({ message: "error occured" });
    }
})
router.get('/rn', auth, async(req, res) => {
    // const user = await User.find(req.user)

    // console.log(user);
    // const createdby = user._id
    const notes = await Note.find({ createdby: req.user })
    console.log(notes)
    res.status(200).json({
        data: notes,
        message: "data received"
    })
})
router.get('/sn', auth, async(req, res) => {
    console.log(req.query)
    const notes = await Note.find(req.query)
    console.log(notes)
    res.status(200).json({
        data: notes,
        message: "data received"
    })
})


router.put('/un/:id', auth, async(req, res) => {
    console.log("this is ida")
    console.log(req.params.id)
    console.log("this iis id")
    console.log(req.body)
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true })
    console.log(note)
    res.status(200).json({
        note,
        message: "updates usccessfulyy"
    })
})
router.delete('/dn/:id', auth, async(req, res) => {
    try {
        const id = req.params.id
        const note = await Note.findOneAndDelete({ _id: id })
        res.status(200).json({ data: note, message: "deleted" })
    } catch (err) {
        res.status(200).json({
            message: "some error"
        })
    }
})
module.exports = router