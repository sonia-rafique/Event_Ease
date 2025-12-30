const express = require('express');
const router = express.Router();
const { createEvent, getEvents, deleteEvent, updateEvent } = require('../controllers/eventController');
const { registerForEvent } = require('../controllers/registrationController');
const { protect } = require('../middlewares/authMiddleware');
const { authorize } = require('../middlewares/roleMiddleware');
const upload = require('../middlewares/uploadMiddleware');

router.get('/', getEvents);

router.post('/', 
  protect, 
  authorize('admin', 'club'), 
  upload.single('bannerImage'), 
  createEvent
);

router.post('/:id/register', protect, registerForEvent);

router.delete('/:id', 
  protect, 
  authorize('admin', 'club'), 
  deleteEvent
);

module.exports = router;