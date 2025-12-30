const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true, 
        trim: true
    },
    
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
        default: 5
    },
    
    comment: {
        type: String,
        required: true,
        trim: true,
        maxlength: 250
    },
    
    targetName: {
        type: String, 
        required: true
    },
    targetType: {
        type: String, 
        enum: ['club', 'event', 'system'],
        required: true
    },
    
    submittedAt: {
        type: Date,
        default: Date.now
    }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;