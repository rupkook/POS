const express = require("express");
const router = express.Router();

const {
    submitDemo,
} = require("../controllers/demoControllers");

router.post("/", submitDemo);

module.exports = router;