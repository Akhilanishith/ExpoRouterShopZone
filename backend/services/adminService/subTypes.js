import {Subcategory, SubTypes} from '../../model/model.js';
import multer from 'multer';

// Set up multer for image upload (same as categories)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/subTypes'); // Directory to store uploaded images for subcategories
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
}).single('subTypesImage');

// Handler to get subcategories for a given category
const getSubTypesBySubcategories = async (req, res) => {
  try {
    const { subcategoryId } = req.params; // Extract category ID from params
    console.log(subcategoryId)
    const subTypes = await SubTypes.find({ subcategory: subcategoryId }).populate('subcategory');
    res.json(subTypes);
  } catch (err) {
    console.error('Error fetching subtypes:', err);
    res.status(500).send('Server error');
  }
};

// Handler to create a new subcategory
const createSubTypes = async (req, res) => {
    uploads(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: 'Image upload failed', error: err.message });
      }
  
      try {
        const { subTypesName, subcategoryId } = req.body;
  
        if (!subTypesName || !subcategoryId || !req.file) {
          return res.status(400).json({ message: 'Subtypes name, subcategory, and image are required' });
        }
  
        // Create new subtype instance
        const newSubTypes = new SubTypes({
          name: subTypesName,
          imageUrl: `uploads/subTypes/${req.file.filename}`,
          subcategory: subcategoryId,
        });
  
        await newSubTypes.save();
  
        // Find and populate the newly created subtype to include related `subcategory` data
        const populatedSubType = await SubTypes.findOne({ _id: newSubTypes._id }).populate('subcategory');
  
        res.json({ subTypes: populatedSubType, message: 'Subtypes created successfully!' });
  
      } catch (err) {
        console.error('Error while creating types:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
      }
    });
  };
  
export { getSubTypesBySubcategories, createSubTypes };