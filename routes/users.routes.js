const express = require("express")
const router = express.Router()
const User = require("../models/User.model")
const isAuthenticated = require("../middlewares/isAuthenticated") 
const jwt = require("jsonwebtoken")

router.put("/",  isAuthenticated,  async (req, res, next) => {
    try {
        const {image} = req.body;
        const user = await User.findByIdAndUpdate(
            req.payload._id,
            {
             image   
            }, 
            { new: true }
            );
            const authToken = jwt.sign(user.toObject(), process.env.TOKEN_SECRET, {
                algorithm: "HS256",
                expiresIn: "1d",
              });
        return res.status(200).json({
            message: 'File successfully uploaded',
            image: image,
            user: req.payload,
            token: authToken
          });
    } catch (error) {
        next(error)
    }
});

router.get("/", isAuthenticated, async (req, res, next) => {
    try {
        await User.findById(req.payload._id);
        return res.status(200).json({
            message: 'Current user found',
            user: req.payload
        })
    } catch (error) {
        next(error);
    }
});

module.exports = router;