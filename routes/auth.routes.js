const router = require("express").Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
 const isAuthenticated = require("../middlewares/isAuthenticated") 
const User = require("../models/couch.model")

router.post("/signup", async(req, res,next) => {
    const { username, password, campus, course } = req.body
        if (!username || !password) {
            return res
            .status(400)
            .json({ message: "You need to provide username and password" })
        }
    try {
        const foundUser = await User.findOne({ username })
        if(foundUser) {
            return res.status(409).json({ message: "There's already a user with that username" })
        }
        const salt = bcrypt.genSaltSync(10)
        const hashedPass = bcrypt.hashSync(password, salt)

        await User.create({
            username,
            password: hashedPass,
            campus,
            course
        })
        return res.status(201).json({ 
            username,
            password: hashedPass,
            campus,
            course })
    } catch (error) {
        next(error)
    }
});

router.post("login/", async(req, res, next) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res
        .status(400)
        .json({ message: "You need to provide username and password" })
    }
    try {
        const foundUser = await User.findOne({ username })
		if (!foundUser) {
			return res.status(400).json({ message: "There's no user with that username" })
		}
		const goodPass = bcrypt.compareSync(password, foundUser.password)

        if(goodPass) {
            const user = foundUser.toObject()
            delete user.password
            const authToken = jwt.sign(user, process.env.TOKEN_SECRET, {
                algorithm: "HS256",
				expiresIn: "1d",
            })
            res.status(200).json(authToken)
        }else{
            res.status(400).json({ message: "Wrong credentials" })
        }
    } catch (error) {
        next(error)
    }
});

 router.get("/verify", isAuthenticated, (req, res) => {
    res.status(200).json(req.payload)
})

module.exports = router