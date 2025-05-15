const mongoose = require('mongoose');

const WholesaleInquirySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: [true, 'Please add a company name'],
    trim: true
  },
  contactName: {
    type: String,
    required: [true, 'Please add a contact name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  phone: {
    type: String,
    required: [true, 'Please add a phone number']
  },
  businessType: {
    type: String,
    required: [true, 'Please add a business type']
  },
  interests: {
    type: [String],
    required: [true, 'Please add interests']
  },
  message: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('WholesaleInquiry', WholesaleInquirySchema);