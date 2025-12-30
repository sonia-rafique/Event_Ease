const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true, validate: {
      validator: function(value) {
        return value > Date.now();
      },
      message: 'Event date must be in the future'
    }
  },
  location: { type: String, required: true },
  capacity: { type: Number, required: true },
  clubId: { type: mongoose.Schema.Types.ObjectId, ref: 'Club', required: true },
  bannerImage: { type: String, required: true }, // Cloudinary URL
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  registeredCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);