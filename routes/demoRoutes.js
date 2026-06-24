const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
    submitDemo,
    getDemos,
    deleteDemo,
} = require("../controllers/demoControllers");

router.post("/", submitDemo);
router.get("/", protect, getDemos);
router.delete("/:id", protect, deleteDemo);

module.exports = router;