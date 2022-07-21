const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});



const couchRoutes = require("./couch.routes")
router.use("/couch", couchRoutes)
const authRoutes = require("./auth.routes")
router.use("/auth", authRoutes)


module.exports = router;
