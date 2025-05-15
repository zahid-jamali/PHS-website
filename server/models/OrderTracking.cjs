const mongoose = require('mongoose');

const OrderTrackingSchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'processing', 'shipped', 'in-transit', 'out-for-delivery', 'delivered', 'cancelled', 'refunded'],
    required: [true, 'Please add a status']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  location: {
    type: String
  },
  carrier: {
    name: String,
    trackingUrl: String
  },
  expectedDeliveryDate: Date,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Index for faster lookups by order
OrderTrackingSchema.index({ order: 1 });
// Index for lookups by status
OrderTrackingSchema.index({ status: 1 });
// Index for date-based queries
OrderTrackingSchema.index({ createdAt: 1 });

module.exports = mongoose.model('OrderTracking', OrderTrackingSchema);