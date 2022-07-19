const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.json("All good in here");
});


 router.use("/auth", authRoutes)

module.exports = router;
