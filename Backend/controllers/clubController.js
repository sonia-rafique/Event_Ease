const Club = require('../models/Club');

exports.createClub = async (req, res, next) => {
  try {
    const { name, description, category } = req.body;
    
    const clubExists = await Club.findOne({ name });
    if (clubExists) {
        res.status(400);
        throw new Error('Club already exists');
    }

    const logoUrl = ''; 

    const club = await Club.create({
      name,
      description,
      category,
      logo: logoUrl,
      
      admin: req.user._id 
    });

    res.status(201).json(club);
  } catch (error) { next(error); }
};

exports.getClubs = async (req, res, next) => {
  try {
    const clubs = await Club.find({});
    res.json(clubs);
  } catch (error) { next(error); }
};