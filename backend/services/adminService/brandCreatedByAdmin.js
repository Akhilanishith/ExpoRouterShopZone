import express from 'express';
import { Brand } from '../../model/model.js'; // Assuming you have a Brand model
import multer from 'multer';

// const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/adminBrand'); // Directory to store uploaded images (ensure it exists)
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`); // Add timestamp to avoid filename conflicts
  },
});

// Multer configuration with file filter for JPEG and PNG
const uploads = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Only .jpeg and .png files are supported'), false);
    }
  },
}).single('logo'); // The field name for the uploaded file is 'logo'

// Async arrow function to handle the admin brand upload
const brandCreatedByAdmin = async (req, res) => {
    const {userId} = req.user
 
  uploads(req, res, async function (err) {
    if (err) {
      return res.status(400).json({ message: 'Error uploading file', error: err.message });
    }

    const { name, slug, description, seoTags } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    try {
      // Check if the brand name or slug already exists
      const existingBrand = await Brand.findOne({ slug });
      if (existingBrand) {
        return res.status(400).json({ message: 'Brand with this slug already exists.' });
      }

      // Create a new brand object
      const newBrand = new Brand({
        name,
        slug,
        description,
        createdBy: 'admin',
        creatorId: userId,
        logo: `/uploads/adminBrand/${req.file.filename}`, // Path to the uploaded logo
        seoTags: {
          title: seoTags['title'],
          description: seoTags['description'],
          keywords: seoTags['keywords'].split(','), // Assuming keywords are comma-separated
        },
        isActive: true,
        status: 'verified',
        official: true,
      });

      // Save the brand to the database
      const savedBrand = await newBrand.save();

      // Respond with success
      return res.status(201).json({
        message: 'Brand uploaded successfully',
        brand: savedBrand,
      });

    } catch (error) {
      console.error('Error uploading brand:', error);
      return res.status(500).json({ message: 'Server error, please try again later.' });
    }
  });
};


// Async function to fetch all brands created by the admin
const getAdminBrands = async (req, res) => {
  try {
    // Query to find all brands created by the admin
    const adminBrands = await Brand.find({ createdBy: 'admin' });

    // Check if there are no brands created by the admin
    if (!adminBrands.length) {
      return res.status(404).json({ message: 'No brands found created by the admin.' });
    }

    // Return the list of brands
    return res.status(200).json({
      message: 'Admin brands retrieved successfully',
      brands: adminBrands,
    });
  } catch (error) {
    console.error('Error fetching admin brands:', error);
    return res.status(500).json({ message: 'Server error, please try again later.' });
  }
};



// Export the handler function
export { brandCreatedByAdmin,getAdminBrands};
