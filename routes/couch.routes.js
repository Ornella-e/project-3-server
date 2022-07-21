const express = require("express")
const router = express.Router()
const isAuthenticated = require("../middlewares/isAuthenticated")
const Couch = require("../models/Couch.model")


router.get("/", async (req, res, next) => {
	try {
		const couchList = await Couch.find()
		return res.status(200).json(couchList)
	} catch (error) {
		next(error)
	}
})

router.get("/:id", async (req, res, next) => {
	try {
		const { id } = req.params
		const couch = await Todo.findById(id)
		return res.status(200).json(couch)
	} catch (error) {
		next(error)
	}
})

router.post("/", isAuthenticated, async (req, res, next) => {
	console.log(req.payload)
	try {
		const { 
              username,
              description,
              image,
              location:{city, country},
              calendar
               } = req.body
		if (!username) {
			return res.status(400).json({ message: "Username is required" })
		}
		const couch = await Couch.create({ 
            username,
            description,
            image,
            location:{city, country},
            calendar 
        })
		return res.status(200).json(couch)
	} catch (error) {
		next(error)
	}
})


router.put("/:id", async (req, res, next) => {
	try {
		const { id } = req.params
		const couch = await Couch.findByIdAndUpdate(id, req.body, { new: true })
		return res.status(200).json(couch)
	} catch (error) {
		next(error)
	}
})

router.delete("/:id", async (req, res, next) => {
	try {
		const { id } = req.params
		await Couch.findByIdAndDelete(id)
		return res.status(200).json({ message: `Couch ${id} deleted` })
	} catch (error) {
		next(error)
	}
})

module.exports = router