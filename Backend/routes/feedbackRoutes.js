const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback'); 

router.post('/', async (req, res) => {
    try {
        const { userName, rating, comment, targetName, targetType } = req.body;
        
        if (!userName || !rating || !comment || !targetName || !targetType) {
            return res.status(400).json({ message: 'Please provide a username, rating, comment, and target for the feedback.' });
        }

        const newFeedback = new Feedback(req.body);
        await newFeedback.save(); 
        
        res.status(201).json({ 
            success: true, 
            message: 'Feedback submitted successfully.',
            data: newFeedback 
        });
    } catch (error) {
        console.error('Error submitting feedback:', error);
        res.status(500).json({ message: 'Internal server error. Failed to save feedback.' });
    }
});

router.get('/', async (req, res) => {
    try {
        const recentFeedback = await Feedback.find({})
            .sort({ submittedAt: -1 })
            .limit(10);
            
        res.status(200).json({ 
            success: true, 
            data: recentFeedback 
        });
    } catch (error) {
        console.error('Error fetching feedback:', error);
        res.status(500).json({ message: 'Internal server error. Failed to retrieve feedback.' });
    }
});

module.exports = router;