const Event = require('../models/Event');
const cloudinary = require('../utils/cloudinary');
const streamifier = require('streamifier');

exports.createEvent = async (req, res, next) => {
  try {
    const { title, description, date, location, capacity, clubId } = req.body;

    const eventDate = new Date(date);
    const now = new Date();

    if (eventDate <= now) {
      return res.status(400).json({ 
        message: "Event date and time must be in the future." 
      });
    }

    if (!req.file) {
      return res.status(400).json({ message: "bannerImage is required" });
    }

    const uploadToCloudinary = (buffer) => {
      return new Promise((resolve, reject) => {
        let stream = cloudinary.uploader.upload_stream(
          { folder: "events" },
          (error, result) => {
            if (result) resolve(result.secure_url);
            else reject(error);
          }
        );
        streamifier.createReadStream(buffer).pipe(stream);
      });
    };

    const imageUrl = await uploadToCloudinary(req.file.buffer);

    const newEvent = new Event({
      title,
      description,
      date: eventDate,
      location,
      capacity,
      clubId,
      bannerImage: imageUrl, 
      createdBy: req.user._id 
    });

    await newEvent.save();
    res.status(201).json(newEvent);

  } catch (error) {
    next(error);
  }
};

exports.getEvents = async (req, res, next) => {
  try {
    const { clubId } = req.query;
    let query = {};
    
    if (clubId) {
      query.clubId = clubId;
    }

    const events = await Event.find(query)
      .populate('clubId', 'name logo')
      .sort({ createdAt: -1 });

    res.json(events);
  } catch (error) { 
    next(error); 
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    
    await event.deleteOne();
    res.status(200).json({ message: 'Event removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateEvent = async (req, res, next) => {
  try {
    let event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    const fieldsToUpdate = ['title', 'description', 'date', 'location', 'capacity'];
    fieldsToUpdate.forEach(field => {
      if (req.body[field]) event[field] = req.body[field];
    });

    if (req.file) {
      const uploadToCloudinary = (buffer) => {
        return new Promise((resolve, reject) => {
          let stream = cloudinary.uploader.upload_stream(
            { folder: "events" },
            (error, result) => {
              if (result) resolve(result.secure_url);
              else reject(error);
            }
          );
          streamifier.createReadStream(buffer).pipe(stream);
        });
      };
      event.bannerImage = await uploadToCloudinary(req.file.buffer);
    }

    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (error) {
    next(error);
  }
};