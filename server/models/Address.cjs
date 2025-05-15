const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  addressLine1: {
    type: String,
    required: [true, 'Please add address line 1'],
    trim: true
  },
  addressLine2: {
    type: String,
    trim: true
  },
  city: {
    type: String,
    required: [true, 'Please add a city'],
    trim: true
  },
  state: {
    type: String,
    required: [true, 'Please add a state'],
    trim: true
  },
  zip: {
    type: String,
    required: [true, 'Please add a zip code'],
    trim: true
  },
  country: {
    type: String,
    required: [true, 'Please add a country'],
    trim: true
  },
  isDefault: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Address', AddressSchema);