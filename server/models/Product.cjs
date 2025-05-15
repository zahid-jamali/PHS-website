const mongoose = require('mongoose');
const slugify = require('mongoose-slug-generator');

// Initialize slug generator
mongoose.plugin(slugify);

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters']
  },
  slug: {
    type: String,
    slug: "name",
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  shortDescription: {
    type: String,
    maxlength: [200, 'Short description cannot be more than 200 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: [0, 'Price must be at least 0']
  },
  discountPrice: {
    type: Number,
    min: [0, 'Discount price must be at least 0']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: [
      'salt-lamps',
      'edible-salt',
      'bath-salts',
      'salt-tiles',
      'salt-bricks',
      'animal-licks',
      'spa-products',
      'gifts'
    ]
  },
  subcategory: {
    type: String
  },
  featured: {
    type: Boolean,
    default: false
  },
  inStock: {
    type: Boolean,
    default: true
  },
  quantity: {
    type: Number,
    default: 0
  },
  images: [
    {
      url: {
        type: String,
        required: true
      },
      alt: {
        type: String
      },
      isPrimary: {
        type: Boolean,
        default: false
      }
    }
  ],
  specifications: [
    {
      name: String,
      value: String
    }
  ],
  weight: {
    type: Number,
    required: [true, 'Please add product weight in grams']
  },
  dimensions: {
    length: Number,
    width: Number,
    height: Number
  },
  origin: {
    type: String,
    default: 'Pakistan'
  },
  packageType: {
    type: String,
    enum: ['box', 'pouch', 'bulk', 'gift-wrap']
  },
  isPremium: {
    type: Boolean,
    default: false
  },
  isSustainable: {
    type: Boolean,
    default: true
  },
  sustainabilityFeatures: [String],
  skuCode: {
    type: String,
    unique: true
  },
  avgRating: {
    type: Number,
    default: 0,
    min: [0, 'Rating must be at least 0'],
    max: [5, 'Rating cannot be more than 5'],
    set: function(val) {
      return Math.round(val * 10) / 10; // Round to 1 decimal place
    }
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  tags: [String],
  metaTitle: String,
  metaDescription: String,
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

// Create SKU code before saving
ProductSchema.pre('save', function(next) {
  if (!this.skuCode) {
    // Generate SKU format: PHS-CAT-12345
    const categoryCode = this.category.slice(0, 3).toUpperCase();
    const randomNum = Math.floor(10000 + Math.random() * 90000);
    this.skuCode = `PHS-${categoryCode}-${randomNum}`;
  }
  
  // Update timestamp
  this.updatedAt = Date.now();
  
  next();
});

// Update the updatedAt timestamp on update
ProductSchema.pre('findOneAndUpdate', function() {
  this.set({ updatedAt: Date.now() });
});

// Cascade delete reviews when a product is deleted
ProductSchema.pre('remove', async function(next) {
  await this.model('Review').deleteMany({ product: this._id });
  next();
});

// Virtual for discount percentage
ProductSchema.virtual('discountPercentage').get(function() {
  if (!this.discountPrice || !this.price) return 0;
  const discount = ((this.price - this.discountPrice) / this.price) * 100;
  return Math.round(discount);
});

// Virtual for actual price (accounting for discounts)
ProductSchema.virtual('currentPrice').get(function() {
  return this.discountPrice || this.price;
});

// Virtual to populate reviews
ProductSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'product',
  justOne: false
});

// Add text index for search
ProductSchema.index({ 
  name: 'text', 
  description: 'text', 
  tags: 'text',
  category: 'text',
  subcategory: 'text'
});

module.exports = mongoose.model('Product', ProductSchema);