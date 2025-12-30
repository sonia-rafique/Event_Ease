// Backend/routes/clubRoutes.js
const express = require('express');
const { createClub, getClubs } = require('../controllers/clubController');
const { protect } = require('../middlewares/authMiddleware');
const { authorize } = require('../middlewares/roleMiddleware'); // Changed from isAdmin

const router = express.Router();

router.route('/')
  .get(getClubs) // Public or Protected: All can view
  .post(protect, authorize('admin'), createClub); // Only Admin can manage/create clubs

module.exports = router;