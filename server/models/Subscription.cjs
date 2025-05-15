const mongoose = require('mongoose');

const SubscriptionHistorySchema = new mongoose.Schema({
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    required: true
  },
  deliveryDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const SubscriptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    default: 1,
    min: 1
  },
  frequency: {
    type: String,
    enum: ['weekly', 'biweekly', 'monthly', 'bimonthly', 'quarterly'],
    required: true
  },
  nextDeliveryDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    default: 'active',
    required: true
  },
  stripeSubscriptionId: {
    type: String
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    required: true
  },
  history: [SubscriptionHistorySchema]
}, {
  timestamps: true
});

module.exports = {
  Subscription: mongoose.model('Subscription', SubscriptionSchema),
  SubscriptionHistory: mongoose.model('SubscriptionHistory', SubscriptionHistorySchema)
};