import {Subcategory} from '../../model/model.js';
import multer from 'multer';

// Set up multer for image upload (same as categories)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/subcategories'); // Directory to store uploaded images for subcategories
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`); // Avoid filename conflicts
  },
});

const uploads = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Only .jpeg and .png files are supported'), false);
    }
  },
}).single('subcategoryImage');

// Handler to get subcategories for a given category
const getSubcategoriesByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params; // Extract category ID from params
    const subcategories = await Subcategory.find({ category: categoryId }).populate('category');
    res.json(subcategories);
  } catch (err) {
    console.error('Error fetching subcategories:', err);
    res.status(500).send('Server error');
  }
};

// Handler to create a new subcategory
const createSubcategory = async (req, res) => {
  uploads(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: 'Image upload failed', error: err.message });
    }

    try {
      const { subcategoryName, categoryId } = req.body;

      if (!subcategoryName || !categoryId || !req.file) {
        return res.status(400).json({ message: 'Subcategory name, category, and image are required' });
      }

      const newSubcategory = new Subcategory({
        name: subcategoryName,
        imageUrl: `uploads/subcategories/${req.file.filename}`,
        category: categoryId,
      });

      await newSubcategory.save();
      res.json({ subcategory: newSubcategory, message: 'Subcategory created successfully!' });
    } catch (err) {
      console.error('Error while creating subcategory:', err);
      res.status(500).json({ message: 'Server error', error: err.message });
    }
  });
};

export { getSubcategoriesByCategory, createSubcategory };
