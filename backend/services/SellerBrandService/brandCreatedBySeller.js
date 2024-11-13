
import { Brand } from '../../model/model.js';
import multer from 'multer';

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const docType = req.body.docType; // Expect docType to be passed in the request body

    // Determine upload directory based on docType
    let uploadFolder;
    switch (docType) {
      case 'brandInvoice':
        uploadFolder = 'uploads/brandInvoice';
        break;
      case 'trademark':
        uploadFolder = 'uploads/trademark';
        break;
      case 'authorizationLetter':
        uploadFolder = 'uploads/authorizationLetter';
        break;
      default:
        return cb(new Error('Invalid document type specified'));
    }

    // Ensure directory exists
    ensureUploadPathExists(uploadFolder);

    cb(null, uploadFolder); // Set the upload path dynamically based on docType
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`); // Use timestamp to avoid conflicts
  },
});

// Multer configuration with file filter for JPEG and PNG images
const uploads = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Allow only JPEG and PNG files
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Only .jpeg and .png files are supported'), false);
    }
  },
}).single('document'); // The field name for the uploaded file is 'logo'

// Async function to handle the seller brand upload
const brandCreatedBySeller = async (req, res) => {
  const { userId } = req.user; // Ensure user is authenticated

  uploads(req, res, async function (err) {
    if (err) {
      return res.status(400).json({ message: 'Error uploading file', error: err.message });
    }

    const { name, slug, description, seoTags } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded.' });
    }

    try {
      // Check if the brand with the same slug exists
      const existingBrand = await Brand.findOne({ slug });
      if (existingBrand) {
        return res.status(400).json({ message: 'Brand with this slug already exists.' });
      }

      // Create a new brand object
      const newBrand = new Brand({
        name,
        slug,
        description,
        createdBy: 'seller',
        creatorId: userId,
        logo: `/uploads/sellerBrand/${req.file.filename}`,
        seoTags: {
          title: seoTags.title,
          description: seoTags.description,
          keywords: seoTags.keywords.split(','), // Assuming keywords are comma-separated
        },
        isActive: true,
        status: 'pending',
        official: true,
      });

      // Save the new brand to the database
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

// Function to fetch all brands created by sellers, but only those created by the authenticated seller
const getSellerCreatedBrands = async (req, res) => {
  const { userId } = req.user;

  try {
    const sellerBrands = await Brand.find({ createdBy: 'seller', creatorId: userId });

    if (!sellerBrands.length) {
      // Return a success response with an empty array if no brands exist
      return res.status(200).json({
        message: 'No brands found created by this seller.',
        brands: [],
      });
    }

    return res.status(200).json({
      message: 'Seller brands retrieved successfully',
      brands: sellerBrands,
    });
  } catch (error) {
    console.error('Error fetching seller brands:', error);
    return res.status(500).json({ message: 'Server error, please try again later.' });
  }
};


export { brandCreatedBySeller, getSellerCreatedBrands };