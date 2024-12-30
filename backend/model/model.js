import mongoose from 'mongoose';
const { Schema } = mongoose;

/**
 * Address Schema
 */
const addressSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  alternate_phone: {
    type: String,
    trim: true
  },
  pincode: {
    type: String,
    required: true,
    trim: true
  },
  state: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  building_name: {
    type: String,
    trim: true
  },
  road_name: {
    type: String,
    trim: true
  },
  is_default: {
    type: Boolean,
    default: false // Field to mark if the address is the default one
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

/**
 * User Schema
 */
const userSchema = new Schema({
  email: {
    type: String,
    trim: true
  },
  phone: {
    country_code: {
      type: String,
      required: true,
      trim: true
    },
    number: {
      type: String,
      required: true,
      trim: true
    }
  },
  addresses: [addressSchema], // Array of addresses
  otp_login: {
    otp: {
      type: String
    },
    otp_created_at: {
      type: Date
    },
    otp_expires_at: {
      type: Date
    },
    otp_attempts: {
      type: Number,
      default: 0
    },
    is_verified: {
      type: Boolean,
      default: false
    },
    last_login_at: {
      type: Date
    }
  },
  token: {
    type: String,
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cart'
  },
  wishlist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Wishlist'
  },
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  }],

  // Allowing the user to be both a retail and food seller
  is_seller: {
    type: Boolean,
    default: false
  },
  seller_types: [{
    type: String,
    enum: ['retail', 'food'], // Allows both 'retail' and 'food' types
    required: function() { return this.is_seller; } // Required only if the user is a seller
  }],
  
  // References to separate seller collections
  retail_seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RetailSeller'
  },
  food_seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FoodSeller'
  },

  // Reference to the brands the user has created
  brands: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Brand'
  }]

}, { timestamps: true });

/**
 * Wishlist Schema
 */
// const wishlistSchema = new Schema({
//   user_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   items: [{
//     product_id: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Product',
//       required: true
//     },
//     added_at: {
//       type: Date,
//       default: Date.now
//     }
//   }],
//   created_at: {
//     type: Date,
//     default: Date.now
//   },
//   updated_at: {
//     type: Date,
//     default: Date.now
//   }
// }, { timestamps: true });

const cartSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
      price: {
        type: Number,
      },
    },
  ],
});
// const cartSchema = new mongoose.Schema({
//   user_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true,
//   },
//   items: [
//     {
//       product_id: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'Product',
//         required: true,
//       },
//       price: {
//         type: Number,
//         required: false, // Make price optional
//       },
//     },
//   ],
// });

/**
 * Cart Schema
 */
// const cartSchema = new Schema({
//   user_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
//   items: [{
//     product_id: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: 'Product',
//       required: true
//     },
//     quantity: {
//       type: Number,
//       required: true,
//       default: 1
//     },
//     price: {
//       type: Number,
//       required: true
//     }
//   }],
//   total_price: {
//     type: Number,
//     required: true,
//     default: 0
//   },
//   created_at: {
//     type: Date,
//     default: Date.now
//   },
//   updated_at: {
//     type: Date,
//     default: Date.now
//   }
// }, { timestamps: true });

// // Middleware to calculate total price before saving
// cartSchema.pre('save', function (next) {
//   this.total_price = this.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
//   next();
// });

/**
 * Order Schema
 */
const orderSchema = new Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  items: [{
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
  }],
  address: {
    type: addressSchema, // Reference the address schema to store the shipping address
    required: true
  },
  total_price: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'shipped', 'delivered', 'cancelled'],
    default: 'pending'
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

/**
 * Food Seller Schema
 */
const foodSellerSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  restaurant_name: {
    type: String,
    trim: true
  },

  license_number: {
    type: String,
    trim: true
  },
  restaurant_phone_number: {
    type: String,
    trim: true
  },
  restaurant_address: {
    type: String,
    trim: true
  },
  pinCode: {
    type: Number
  },
  latLang: {
    lat: {
      type: Number
    },
    lng: {
      type: Number
    }
  },
  verification_status: {
    type: String,
    enum: ['none', 'pending', 'verified', 'rejected'],
    default: 'none'
  }
}, { timestamps: true });

/**
 * Retail Seller Schema
 */
const retailSellerSchema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  business_name: {
    type: String,
    trim: true
  },

  business_registration_number: {
    type: String,
    trim: true
  },
  business_phone_number: {
    type: String,
    trim: true
  },
  business_address: {
    type: String,
    trim: true
  },
  pinCode: {
    type: Number
  },
  latLang: {
    lat: {
      type: Number
    },
    lng: {
      type: Number
    }
  },
  verification_status: {
    type: String,
    enum: ['none', 'pending', 'verified', 'rejected'],
    default: 'none'
  }
}, { timestamps: true });



/**
 * Brand Schema
 */


const BrandSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true, // SEO-friendly slug for the brand
  },
  logo: {
    type: String, // URL or file path of the logo
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  createdBy: {
    type: String,
    enum: ['admin', 'seller'], // Determines if the brand was created by admin or seller
    required: true,
  },
  creatorId: {
    type: Schema.Types.ObjectId, // Reference to the admin or seller who created the brand
    refPath: 'createdBy', // Dynamically references either the 'Admin' or 'Seller' model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: function () {
      return this.createdBy === 'admin'; // Admin-created brands are active by default
    },
  },
  status: {
    type: String,
    enum: ['none', 'pending', 'verified', 'rejected'], // Status of the brand
    default: function () {
      return this.createdBy === 'seller' ? 'pending' : 'verified'; // Seller-created brands are pending by default
    },
  },
  official: {
    type: Boolean,
    default: function () {
      return this.createdBy === 'admin'; // Only admin-created brands are considered official
    },
  },
  categoryIds: [{
    type: Schema.Types.ObjectId,
    ref: 'Category', // Reference to the Category model
    required: true,
  }],
  seoTags: {
    title: { type: String, required: false },
    description: { type: String, required: false },
    keywords: { type: [String], required: false }, // List of SEO keywords
  },
  authorizedSellers: [{
    type: Schema.Types.ObjectId,
    ref: 'Seller', // References to sellers authorized to sell under this brand
  }],
  productCount: {
    type: Number,
    default: 0, // Initial product count
  },
  verificationRequired: {
    type: Boolean,
    default: false, // Admin brands may require additional verification for sellers
  },
  verificationDocuments: {
    type: [String], // List of required verification documents (e.g., 'invoice', 'certificate')
    default: [],
  },
  adminVerificationStatus: {
    type: String,
    enum: ['pending', 'verified', 'rejected'],
    default: 'pending', // Default pending verification status for products under admin-created brands
  },
  adminRemarks: {
    type: String, // Remarks or reasons for rejecting a brand or product listing
    required: false,
  }
});

// Middleware to update timestamps
BrandSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});


const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});


// Subcategory Schema
const SubcategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
});

// Subcategory Schema
const SubTypesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subcategory',
    required: true,
  },
});
const SizeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  SubTypes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubTypes',
    required: true,
  },
});

// Product Schema with variants
const productSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    itemInfo: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    originalPrice: {
      type: Number, // Original price of the product
      required: true,
    },
    sellingPrice: {
      type: Number, // Selling price of the product
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category', // Reference to Category
      required: true,
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subcategory', // Reference to Subcategory
      required: true,
    },
    subtype: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubType', // Reference to SubType
      required: true,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Brand', // Reference to the Brand model
      required: true, // Ensure every product is associated with a brand
    },
    images: {
      type: [String], // Array of image URLs
      required: true,
      validate: {
        validator: function (v) {
          return v.length <= 6; // Only allow up to 2 images
        },
        message: 'You can upload a maximum of 2 images.',
      },
    },
    variants: [
      {
        variantId: {
          type: String, // Unique ID for each variant group
          required: true,
        },
        color: {
          type: String,
          required: true,
        },
     
        size: {
          type: mongoose.Schema.Types.ObjectId,
         ref: 'Size', // Reference to SubType
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        stock: {
          type: Number,
          default: 0, // Stock quantity for this specific variant
        },
      },
    ],
  },
  { timestamps: true }
);



const wishlistSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      addedAt: {
        type: Date,
        default: Date.now, // Automatically set the date when the product is added to the wishlist
      },
    },
  ],
},
{ timestamps: true }); // Adds createdAt and updatedAt fields


 // Adds createdAt and updatedAt timestamps


 const AddressSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
     type: String,
      required: true },
  mobile: { type: String, required: true, match: /^[0-9]{10}$/ }, // Ensure mobile number is 10 digits
  pincode: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  landmark: { type: String },
  addressType: { type: String, default: "Home" },
});




// Models
const Cart = mongoose.model('Cart', cartSchema);
const Wishlist = mongoose.model('Wishlist', wishlistSchema);
const Order = mongoose.model('Order', orderSchema);
const User = mongoose.model('User', userSchema);
const FoodSeller = mongoose.model('FoodSeller', foodSellerSchema);
const RetailSeller = mongoose.model('RetailSeller', retailSellerSchema);
const Brand = mongoose.model('Brand', BrandSchema);
const Product = mongoose.model("Product", productSchema);
const Category = mongoose.model('Category', CategorySchema);
const Subcategory = mongoose.model('Subcategory', SubcategorySchema);
const SubTypes = mongoose.model('SubTypes', SubTypesSchema);
const Size = mongoose.model('Size', SizeSchema);
const AddDeliveryAddress = mongoose.model('AddDeliveryAddress', AddressSchema);



/**
 * Export Models
 */
export { User, Wishlist, Order, Cart, FoodSeller, RetailSeller,Brand,Product,Category,Subcategory,SubTypes,Size,AddDeliveryAddress};
