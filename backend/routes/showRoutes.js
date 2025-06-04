const express = require("express");
const router = express.Router();
const adminMiddleware = require('../middleware/adminMiddleware');
const authMiddleware = require("../middleware/authMiddleware")
const { getShows,
    createShow,
    getShowById,
    updateShow,
    deleteShow } = require("../controllers/showController");
// Public routes
router.get('/', getShows);
router.get("/:id", authMiddleware, getShowById);


// Admin-only routes
router.post('/', adminMiddleware, createShow);
router.put('/:id', adminMiddleware, updateShow);
router.delete('/:id', adminMiddleware, deleteShow);

module.exports = router;