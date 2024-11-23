import { Category } from '../../model/model.js';
import multer from 'multer';

// Multer disk storage setup for uploading images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/categories'); // Directory to store uploaded images
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
}).single('categoryImage'); // Ensure the field name matches the frontend form

// Handler to get all categories
const getCategories = async (req, res) => {

  try {
    const categories = await Category.find(); // Fetch all categories from the database
    res.json(categories); // Return all categories as JSON
  } catch (err) {
    console.error('Error fetching categories:', err);
    res.status(500).send('Server error');
  }
};

// Handler to create a new category
const createCategory = async (req, res) => {
  uploads(req, res, async (err) => {
    if (err) {
      // Handle multer file upload errors
      return res.status(400).json({ message: 'Image upload failed', error: err.message });
    }

    try {
      const { categoryName } = req.body; // Expecting 'categoryName' from the frontend
      if (!categoryName || !req.file) {
        // Validate if category name and image are provided
        return res.status(400).json({ message: 'Category name and image are required' });
      }

      // Create a new category entry
      const newCategory = new Category({
        name: categoryName, // Use categoryName from the form data
        imageUrl: `uploads/categories/${req.file.filename}`, // Save the image path relative to the uploads folder
      });

      // Save the category to the database
      await newCategory.save();

      // Send a response with the newly created category
      res.json({ category: newCategory, message: 'Category created successfully!' });
    } catch (err) {
      console.error('Error while creating category:', err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });
};

export { getCategories, createCategory };
