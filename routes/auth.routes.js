const router = require("express").Router()
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const User = require("../models/User.model")
const isAuthenticated = require("../middlewares/isAuthenticated")
const saltRounds = 10


router.post("/signup", async (req, res, next) => {
	const { username, email, password, userImage, couch , location  } = req.body
	console.log(req.body)
	if (email === "" || username === "" || password === "") {
		res
			.status(400)
			.json({ message: "Please provide your email, name and a password" })
	}

	try {
		const foundUser = await User.findOne({ email })
		console.log(foundUser)
		if (foundUser) {
			res.status(400).json({ message: "Username already taken." })
			return
		}
		const salt = bcrypt.genSaltSync(saltRounds)
		const hashedPass = bcrypt.hashSync(password, salt)

		const createdUser = await User.create({
			username,
			email,
			password: hashedPass,
            userImage,
   
            location:{city: location.city, country: location.country},
		})

		const user = createdUser.toObject()
		delete user.password
		res.status(201).json({ user })
	} catch (error) {
		console.log(error)
		if (error instanceof mongoose.Error.ValidationError) {
			return res.status(400).json({ message: error.message })
		}
		if (error.code === 11000) {
			return res.status(400).json({
				errorMessage:
					"Username need to be unique. The username you chose is already in use.",
			})
		}
		return res.status(500).json({ errorMessage: error.message })
	}
})

router.post("/signin", async (req, res, next) => {
	const { email, password } = req.body
	if (email === "" || password === "") {
		res.status(400).json({ message: "Please provide your email and password" })
	}
	try {
		const foundUser = await User.findOne({ email })
		if (!foundUser) {
			res.status(500).json({ message: "Wrong credentials." })
			return
		}
		const goodPass = bcrypt.compareSync(password, foundUser.password)
		if (goodPass) {
			const user = foundUser.toObject()
			delete user.password

			const authToken = jwt.sign(user, process.env.TOKEN_SECRET, {
				algorithm: "HS256",
				expiresIn: "2d",
			})

			res.status(200).json({ authToken })
		} else {
			res.status(500).json({ message: "Wrong credentials." })
		}
	} catch (error) {
		next(error)
	}
})

router.get("/myaccount", isAuthenticated, (req, res, next) => {
	res.status(200).json(req.payload)
})

router.get("/logout", (req, res) => {
	req.session.destroy((err) => {
	  if (err) {
		return res.status(500).json({ errorMessage: err.message });
	  }
	  res.json({ message: "Done" });
	});
})


module.exports = router