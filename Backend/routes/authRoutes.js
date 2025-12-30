const express = require('express');
const router = express.Router();
const { register, loginUser } = require('../controllers/authController');
const { registerValidation, loginValidation } = require('../validators/authValidator'); 

router.post('/login', loginValidation, loginUser); 
router.post('/register', registerValidation, register);

module.exports = router;