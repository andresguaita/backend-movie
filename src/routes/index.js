const { Router } = require("express");
const router = Router();

const movies = require("./movies");


router.use("/api", movies);

module.exports = router;
