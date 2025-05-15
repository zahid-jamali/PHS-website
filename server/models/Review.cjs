const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  rating: {
    type: Number,
    required: [true, 'Please add a rating'],
    min: 1,
    max: 5
  },
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true
  },
  content: {
    type: String,
    required: [true, 'Please add content']
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// Prevent user from submitting more than one review per product
ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

module.exports = mongoose.model('Review', ReviewSchema);