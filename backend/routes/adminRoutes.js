const express = require("express");
const { createShow } = require("../controllers/showController");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

router.post("/shows", adminMiddleware, createShow);  // Admin-only

module.exports = router;
