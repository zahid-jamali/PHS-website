const mongoose = require('mongoose');

const CarbonSavingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  carbonSaved: {
    type: Number,
    required: [true, 'Please add the amount of carbon saved'],
    min: 0
  },
  packagingMaterial: {
    type: String
  },
  reuseTimes: {
    type: Number,
    min: 0
  },
  transportationType: {
    type: String
  },
  pointsEarned: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  }
}, {
  timestamps: true
});

const GreenRewardSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  totalPoints: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  lifetimeCarbonSaved: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  treesPlanted: {
    type: Number,
    required: true,
    default: 0,
    min: 0
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

const RewardRedemptionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rewardType: {
    type: String,
    required: [true, 'Please add a reward type']
  },
  pointsSpent: {
    type: Number,
    required: [true, 'Please add points spent'],
    min: 0
  },
  discountCode: {
    type: String
  },
  discountAmount: {
    type: Number,
    min: 0
  },
  treeCount: {
    type: Number,
    min: 0
  },
  status: {
    type: String,
    enum: ['pending', 'applied', 'completed'],
    default: 'pending'
  }
}, {
  timestamps: true
});

module.exports = {
  CarbonSaving: mongoose.model('CarbonSaving', CarbonSavingSchema),
  GreenReward: mongoose.model('GreenReward', GreenRewardSchema),
  RewardRedemption: mongoose.model('RewardRedemption', RewardRedemptionSchema)
};