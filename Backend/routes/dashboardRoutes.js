const express = require('express');
const router = express.Router();
const { getAdminSummary } = require('../controllers/dashboardController');
const { protect } = require('../middlewares/authMiddleware');
const { authorize } = require('../middlewares/roleMiddleware');

router.route('/summary').get(protect, authorize('admin'), getAdminSummary);

module.exports = router;