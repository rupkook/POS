const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
    submitContact,
    getContacts,
    deleteContact,
} = require("../controllers/contactControllers");

router.post("/", submitContact);
router.get("/", protect, getContacts);
router.delete("/:id", protect, deleteContact);

module.exports = router;