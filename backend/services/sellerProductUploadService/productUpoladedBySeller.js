import { Brand, Product } from '../../model/model.js';
import multer from 'multer';
import mongoose from 'mongoose';

// Configure multer storage for product images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/sellerProduct'); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`); // Unique file naming
  },
});

// Multer middleware for handling file uploads
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB file size limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Only .jpeg and .png files are supported'), false);
    }
  },
}).array('images', 6); // Maximum of 6 images

// Upload Product Function
const productUploadedBySeller = async (req, res) => {
  const { userId } = req.user; // Assuming `req.user` is populated by middleware for authenticated users

  upload(req, res, async (err) => {
    if (err) {
      // Handle multer errors
      return res.json({ success: false, message: 'Error uploading images', error: err.message });
    }


    const {
      title,
      itemInfo,
      description,
      category,
      subcategory,
      subtype,
      originalPrice,
      sellingPrice,
      color,
      size,
      brandId, // Ensure brandId is included here
    } = req.body;

    // Validate required fields
    if (
      !title ||
      !itemInfo ||
      !description ||
      !category ||
      !subcategory ||
      !originalPrice ||
      !sellingPrice ||
      !brandId
    ) {
      return res.json({ success: false, message: 'All required fields, including brandId, must be provided.' });
    }

    // Validate brandId format
    if (!mongoose.Types.ObjectId.isValid(brandId)) {
      return res.json({ success: false, message: 'Invalid brandId format.' });
    }

    // Validate price fields
    if (isNaN(originalPrice) || isNaN(sellingPrice)) {
      return res.json({success: false, message: 'Original Price and Selling Price must be valid numbers.' });
    }

    const imagePaths = req.files.map((file) => `/uploads/sellerProduct/${file.filename}`);

    try {
      // Validate brand existence
      const brand = await Brand.findById(brandId);
      if (!brand) {
        return res.json({ success: false, message: 'Brand not found with the provided brandId.' });
      }

      // Create a new product instance
      const newProduct = new Product({
        title,
        itemInfo,
        description,
        originalPrice: parseFloat(originalPrice),
        sellingPrice: parseFloat(sellingPrice),
        color,
        size,
        category,
        subcategory,
        subtype,
        brand: brandId, // Associate the product with the brand
        creatorId: userId, // Associate with the seller
        images: imagePaths,
      });

      // Save the product to the database
      const savedProduct = await newProduct.save();

      // Respond with success
      return res.status(201).json({
        success: true,
        message: 'Product uploaded successfully',
        product: savedProduct,
      });
    } catch (error) {
      console.error('Error saving product:', error);
      return res.status(500).json({ message: 'Server error, please try again later.', error: error.message });
    }
  });
};


// Get Seller's Products Function
const getBrandProduct = async (req, res) => {
  const { userId } = req.user; // Assuming `req.user` is populated by middleware for authenticated users
  const { id } = req.params; // The brand ID passed in the request parameters

  try {
    // Find the brand created by the seller (creatorId should match userId and createdBy should be 'seller')
    const brand = await Brand.findOne({
      _id: id,
      createdBy: 'seller', // Only fetch brands created by a seller
      creatorId: userId, // Match the seller's user ID
    }).exec();

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: 'Brand not found or you do not have permission to view it.',
      });
    }

    // Fetch all products associated with the found brand
    const products = await Product.find({ brand: id })
      .populate('category', 'name') // Optionally populate category details
      .populate('subcategory', 'name') // Optionally populate subcategory details
      .exec();

    if (!products || products.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No products found for this brand.',
      });
    }

    // Respond with the list of products for the brand
    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error('Error fetching brand products:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error, please try again later.',
      error: error.message,
    });
  }
};



export { productUploadedBySeller,getBrandProduct};
