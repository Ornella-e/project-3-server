const express = require("express");
const router = express.Router();
const isAuthenticated = require("../middlewares/isAuthenticated");
const Couch = require("../models/Couch.model");
const fileUploader = require("../config/cloudinary.config");
const RentingTime = require("../models/RentingTime.model");
const Ranking = require("../models/Ranking.model");
const { createMochaInstanceAlreadyDisposedError } = require("mocha/lib/errors");


router.get("/reservations", async (req, res, next) => {
  try {
    const reservations = await RentingTime.find({user: req.payload._id});
    console.log(reservations)
    return res.status(200).json(reservations);
  } catch (error) {
    next(error);
  }
});

router.get("/evaluations", async (req, res, next) => {
  try {
    const evaluations = await Ranking.find({user: req.payload._id});
    console.log(evaluations)
    return res.status(200).json(evaluations);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const couch = await Couch.findById(id);
    return res.status(200).json(couch);
  } catch (error) {
    next(error);
  }
});

// change name of routes. they must not be named the same. change in FE as well
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const rent = await RentingTime.findById(id);
    return res.status(200).json(rent);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/",
  isAuthenticated,
  fileUploader.single("image"),
  async (req, res, next) => {
    const obj = JSON.parse(JSON.stringify(req.body));
    console.log(obj);
    try {
      console.log(req.body)
      const { owner, title, description, image, city, country, calendar } =
        req.body;
      //   if (!owner) {
      //    return res.status(400).json({ message: "Username is required" });
      //  }
      const couch = await Couch.create({
        owner,
        title,
        description,
        image: req.file.path,
        location: { city, country },
        calendar: [],
        evaluations: [],
      });
      return res.status(200).json(couch);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/:id",
  isAuthenticated,
  async (req, res, next) => {
   const {id} = req.params
    try {
      console.log(req.body); 
      const { startingDate, endingDate } = req.body;
        
      const rent = await RentingTime.create({
        user: req.payload._id,
        startingDate, 
        endingDate, 
        couch: id
      });

      const couch = await Couch.findById(id);

      let updatedCalendar = [...couch.calendar, rent._id]
      console.log(updatedCalendar)

      const updatedCouch = await Couch.findByIdAndUpdate(
        id, {calendar: updatedCalendar},
        
        { new: true }
      );
      return res.status(200).json(rent);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/evaluations",
  isAuthenticated,
  async (req, res, next) => {
   const {id} = req.params
    try {
      console.log(req.body); 
      const { evaluation, grade } = req.body;
        
      const rankings = await Ranking.create({
        user: req.payload._id,
        evaluation,
        grade, 
        couch: id
      });

      const couch = await Couch.findById(id);

      let updatedRanking = [...couch.evaluations, rankings._id]
      console.log(updatedRanking)

      const updatedCouch = await Couch.findByIdAndUpdate(
        id, {evaluations: updatedRanking},
        
        { new: true }
      );
      return res.status(200).json(rankings);
    } catch (error) {
      next(error);
    }
  }
);

router.put("/:id", isAuthenticated, async (req, res, next) => {
  try {
    const { id } = req.params;
    const couch = await Couch.findOneAndUpdate(
      { _id: id, owner: req.payload._id },
      
      { new: true }
    );
    return res.status(200).json(couch);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const couchList = await Couch.find();
    return res.status(200).json(couchList);
  } catch (error) {
    next(error);
  }
});


router.delete("/:id", isAuthenticated, async (req, res, next) => {
  try {
    const { id } = req.params;
    await Couch.findOneAndDelete({ _id: id, owner: req.payload._id }, req.body);
    return res.status(200).json({ message: `Couch ${id} deleted` });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
