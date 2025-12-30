const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  eventId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Event', 
    required: true 
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  enrollmentId: {
    type: String,
    required: [true, 'Student Enrollment ID is required']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required']
  },
  department: {
    type: String,
    required: true,
    enum: [
      'CS', 'SE', 'BBA', 'Engineering', 'Media', 'Psychology', 'Other',
      'IT', 'AI', 'Robotics', 'SupplyChain', 'BusinessAnalytics',
      'AccountingFinance', 'Economics', 'MaritimeBusiness', 'PublicHealth',
      'EnvironmentalScience', 'RemoteSensingGIS', 'SocialSciences', 
      'English', 'LLB'
    ]
  },
  semester: {
    type: String,
    required: true
  },
  status: { 
    type: String, 
    enum: ['registered', 'cancelled'], 
    default: 'registered' 
  }
}, { timestamps: true });

registrationSchema.index({ eventId: 1, studentId: 1 }, { unique: true });

module.exports = mongoose.model('Registration', registrationSchema);