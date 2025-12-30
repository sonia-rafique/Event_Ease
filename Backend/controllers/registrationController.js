const Registration = require('../models/Registration');
const Event = require('../models/Event');

exports.registerForEvent = async (req, res, next) => {
  try {
    const { enrollmentId, phone, department, semester } = req.body;
    const eventId = req.params.id; 
    const studentId = req.user._id; 

    if (!enrollmentId || !phone || !department || !semester) {
      return res.status(400).json({ message: 'Missing registration details' });
    }

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    if (event.registeredCount >= event.capacity) {
      return res.status(400).json({ message: 'Event is full' });
    }

    const existingReg = await Registration.findOne({ eventId, studentId });
    if (existingReg) return res.status(400).json({ message: 'Already registered' });

    await Registration.create({ 
      eventId, studentId, enrollmentId, phone, department, semester 
    });

    event.registeredCount += 1;
    await event.save();

    res.status(201).json({ success: true, message: 'Registration successful' });
  } catch (error) { 
    next(error); 
  }
};