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
    if (
      file.mimetype === 'image/jpeg' ||
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/webp'
    ) {
      cb(null, true);
    } else {
      cb(new Error('Only .jpeg, .png, and .webp files are supported'), false);
    }
  },
}).array('images', 6); // Maximum of 6 images
 // Maximum of 6 images

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
const getSellerAllBrandProduct = async (req, res) => {
  const { userId } = req.user; // Assuming `req.user` is populated by middleware for authenticated users

  try {
    // Find all brands created by the seller (creatorId should match userId and createdBy should be 'seller')
    const brands = await Brand.find({
      createdBy: 'seller', // Only fetch brands created by a seller
      creatorId: userId, // Match the seller's user ID
    }).exec();

    if (!brands || brands.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No brands found or you do not have permission to view them.',
      });
    }

    // Extract brand IDs to use in the product query
    const brandIds = brands.map((brand) => brand._id);

    // Fetch all products associated with the found brands
    const products = await Product.find({ brand: { $in: brandIds } })
      .populate('category', 'name') // Optionally populate category details
      .populate('subcategory', 'name') // Optionally populate subcategory details
      .exec();

    if (!products || products.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No products found for these brands.',
      });
    }

    // Respond with the list of products for all brands
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
const getAllSellersAllBrandProducts = async (req, res) => {
  try {
    // Find all brands created by sellers (createdBy should be 'seller')
    const brands = await Brand.find({
      createdBy: 'seller', // Only fetch brands created by sellers
    }).exec();

    if (!brands || brands.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No brands found for any seller.',
      });
    }

    // Extract brand IDs to use in the product query
    const brandIds = brands.map((brand) => brand._id);

    // Fetch all products associated with the found brands
    const products = await Product.find({ brand: { $in: brandIds } })
      .populate('category', 'name') // Optionally populate category details
      .populate('subcategory', 'name') // Optionally populate subcategory details
      .exec();

    if (!products || products.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No products found for these brands.',
      });
    }

    // Respond with the list of products for all sellers' brands
    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error('Error fetching all sellers brand products:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error, please try again later.',
      error: error.message,
    });
  }
};
//item deatails
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Product ID is required.',
      });
    }

    const product = await Product.findById(id,)
      .populate('category', 'name')
      .populate('subcategory', 'name')
      .populate('brand', 'name')
      .exec();

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.',
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error, please try again later.',
      error: error.message,
    });
  }
};


// const getProductsByTypes = async (req, res) => {
//   try {
//     const { subtypeId } = req.params;
//     console.log('Received Subtype ID:', subtypeId);

//     const products = await Product.find({ type: subtypeId })
//       .populate('type', 'name') // Populate only the `name` field
//       .populate('subcategory', 'name'); // Populate only the `name` field

//     console.log('Fetched Products:', products);
//     res.json(products);
//   } catch (err) {
//     console.error('Error fetching products by type:', err);
//     res.status(500).send('Server error');
//   }
// };
const getAllSellersAllBrandTypesProducts = async (req, res) => {
  try {
    const { category, subcategory, subTypes } = req.query; // Get category, subcategory, and productType from the query params

    // Find all brands created by sellers (createdBy should be 'seller')
    const brands = await Brand.find({
      createdBy: 'seller', // Only fetch brands created by sellers
    }).exec();

    if (!brands || brands.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No brands found for any seller.',
      });
    }

    // Extract brand IDs to use in the product query
    const brandIds = brands.map((brand) => brand._id);

    // Build the product query with category, subcategory, and productType (if provided)
    const productQuery = {
      brand: { $in: brandIds },
    };

    if (category) {
      productQuery.category = category; // Filter by category if provided
    }
    if (subcategory) {
      productQuery.subcategory = subcategory; // Filter by subcategory if provided
    }
    if (subTypes) {
      productQuery.subTypes = subTypes; // Filter by productType (e.g., "headset") if provided
    }

    // Fetch all products associated with the found brands and apply the filters
    const products = await Product.find(productQuery)
      .populate('category', 'name') // Optionally populate category details
      .populate('subcategory', 'name') // Optionally populate subcategory details
      .exec();

    if (!products || products.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No products found for the selected criteria.',
      });
    }

    // Respond with the list of filtered productsss
    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error, please try again later.',
      error: error.message,
    });
  }
};



export { productUploadedBySeller,getBrandProduct,getSellerAllBrandProduct,getAllSellersAllBrandProducts,getProductById,getAllSellersAllBrandTypesProducts};
