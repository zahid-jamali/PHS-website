const mongoose = require('mongoose');
const slugify = require('mongoose-slug-generator');

// Initialize slug generator if not already done
if (!mongoose.Mongoose.prototype.hasOwnProperty('generateSlug')) {
  mongoose.plugin(slugify);
}

const SaltFlavorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a flavor name'],
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
  ingredients: {
    type: String,
    required: [true, 'Please list the ingredients']
  },
  nutritionalInfo: {
    servingSize: String,
    calories: Number,
    sodium: Number,
    protein: Number,
    carbohydrates: Number,
    fat: Number,
    additionalInfo: String
  },
  price: {
    regular: {
      type: Number,
      required: [true, 'Please add a regular price'],
      min: [0, 'Price must be at least 0']
    },
    wholesale: {
      type: Number,
      min: [0, 'Wholesale price must be at least 0']
    }
  },
  packagingSizes: [
    {
      size: String,
      weight: Number,
      price: Number,
      stock: Number
    }
  ],
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
  moodAssociations: [
    {
      mood: {
        type: String,
        enum: ['relaxed', 'energetic', 'focused', 'creative', 'balanced', 'restful']
      },
      strengthLevel: {
        type: Number,
        min: 1,
        max: 10
      }
    }
  ],
  tasteProfile: {
    type: [String],
    enum: ['sweet', 'savory', 'spicy', 'sour', 'bitter', 'umami', 'smoky', 'herbal', 'citrusy', 'earthy']
  },
  recommendedUses: [String],
  healthBenefits: [String],
  seasonsAvailable: {
    type: [String],
    enum: ['spring', 'summer', 'fall', 'winter', 'all-year']
  },
  isOrganic: {
    type: Boolean,
    default: false
  },
  isVegan: {
    type: Boolean,
    default: true
  },
  isGlutenFree: {
    type: Boolean,
    default: true
  },
  spiceLevel: {
    type: Number,
    min: 0,
    max: 10,
    default: 0
  },
  culinaryTips: String,
  featured: {
    type: Boolean,
    default: false
  },
  isSustainable: {
    type: Boolean,
    default: true
  },
  origin: {
    region: {
      type: String,
      default: 'Himalayan Mountains'
    },
    country: {
      type: String,
      default: 'Pakistan'
    }
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
  inStock: {
    type: Boolean,
    default: true
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

// Update the updatedAt timestamp on update
SaltFlavorSchema.pre('findOneAndUpdate', function() {
  this.set({ updatedAt: Date.now() });
});

// Update timestamp before saving
SaltFlavorSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Virtual to populate reviews
SaltFlavorSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'saltFlavor',
  justOne: false
});

// Add text index for search
SaltFlavorSchema.index({ 
  name: 'text', 
  description: 'text', 
  ingredients: 'text',
  tags: 'text'
});

module.exports = mongoose.model('SaltFlavor', SaltFlavorSchema);