const Event = require('../models/Event');
const User = require('../models/User');

const Club = require('../models/Club'); 
const Registration = require('../models/Registration'); 

exports.getAdminSummary = async (req, res, next) => {
  try {
    const totalEvents = await Event.countDocuments();
    
    const totalStudents = await User.countDocuments({ role: 'student' });

    const totalClubs = await Club.countDocuments(); 
    const totalRegistrations = await Registration.countDocuments();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcomingEvents = await Event.find({ date: { $gte: today } })
      .sort({ date: 1 }) 
      .limit(5)
      .populate('clubId', 'name'); 

    res.status(200).json({
      totalEvents,
      totalClubs,
      totalRegistrations,
      totalStudents,
      upcomingEvents: upcomingEvents.map(event => ({
        _id: event._id,
        title: event.title,
        date: event.date,
        location: event.location,
        registeredCount: event.registeredCount,
        clubName: event.clubId ? event.clubId.name : 'Unknown Club' 
      }))
    });

  } catch (error) { 
    next(error); 
  }
};