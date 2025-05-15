const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add your name'],
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
    type: String
  },
  subject: {
    type: String,
    required: [true, 'Please add a subject']
  },
  message: {
    type: String,
    required: [true, 'Please add a message']
  },
  company: {
    type: String
  },
  country: {
    type: String
  },
  status: {
    type: String,
    enum: ['new', 'in-progress', 'resolved'],
    default: 'new'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  internalNotes: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt timestamp on update
ContactSchema.pre('findOneAndUpdate', function() {
  this.set({ updatedAt: Date.now() });
});

// Add text index for search
ContactSchema.index({ 
  name: 'text', 
  email: 'text', 
  subject: 'text', 
  message: 'text',
  company: 'text'
});

module.exports = mongoose.model('Contact', ContactSchema);