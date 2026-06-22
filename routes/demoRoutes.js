const express = require("express");
const router = express.Router();

const {
    submitDemo,
    getDemos,
    deleteDemo,
} = require("../controllers/demoControllers");

router.post("/", submitDemo);
router.get("/", getDemos);
router.delete("/:id", deleteDemo);

module.exports = router;