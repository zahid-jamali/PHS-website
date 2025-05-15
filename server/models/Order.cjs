const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // Allow guest checkout
  },
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  orderItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      name: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity must be at least 1']
      },
      price: {
        type: Number,
        required: true,
        min: [0, 'Price must be at least 0']
      },
      image: String
    }
  ],
  shippingAddress: {
    firstName: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    addressLine1: {
      type: String,
      required: true
    },
    addressLine2: String,
    city: {
      type: String,
      required: true
    },
    state: {
      type: String,
      required: true
    },
    postalCode: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    }
  },
  billingAddress: {
    firstName: String,
    lastName: String,
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
    phoneNumber: String,
    sameAsShipping: {
      type: Boolean,
      default: true
    }
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['credit_card', 'paypal', 'bank_transfer', 'stripe']
  },
  paymentResult: {
    id: String,
    status: String,
    updateTime: String,
    email: String
  },
  subtotalPrice: {
    type: Number,
    required: true,
    min: 0
  },
  taxPrice: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  shippingPrice: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  },
  discountAmount: {
    type: Number,
    min: 0,
    default: 0
  },
  totalPrice: {
    type: Number,
    required: true,
    min: 0
  },
  isPaid: {
    type: Boolean,
    default: false
  },
  paidAt: Date,
  status: {
    type: String,
    required: true,
    enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'],
    default: 'pending'
  },
  isShipped: {
    type: Boolean,
    default: false
  },
  shippedAt: Date,
  isDelivered: {
    type: Boolean,
    default: false
  },
  deliveredAt: Date,
  trackingNumber: String,
  shippingCarrier: String,
  notes: String,
  giftMessage: String,
  isGift: {
    type: Boolean,
    default: false
  },
  couponCode: String,
  currency: {
    type: String,
    default: 'USD'
  },
  carbonOffset: {
    isApplied: {
      type: Boolean,
      default: false
    },
    amount: {
      type: Number,
      default: 0
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Generate order number before saving
OrderSchema.pre('save', function(next) {
  if (!this.orderNumber) {
    // Format: PHS-YYYYMMDD-XXXX where XXXX is a random number
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    
    this.orderNumber = `PHS-${year}${month}${day}-${randomNum}`;
  }
  
  // Update timestamp
  this.updatedAt = Date.now();
  
  next();
});

// Update the updatedAt timestamp on update
OrderSchema.pre('findOneAndUpdate', function() {
  this.set({ updatedAt: Date.now() });
});

// Virtual for tracking history
OrderSchema.virtual('trackingHistory', {
  ref: 'OrderTracking',
  localField: '_id',
  foreignField: 'order',
  justOne: false
});

// Create an index on orderNumber for faster lookups
OrderSchema.index({ orderNumber: 1 });
// Index on user field for faster lookups of user's orders
OrderSchema.index({ user: 1 });
// Index on status for admin filtering
OrderSchema.index({ status: 1 });
// Index on createdAt for date range searches
OrderSchema.index({ createdAt: 1 });

module.exports = mongoose.model('Order', OrderSchema);