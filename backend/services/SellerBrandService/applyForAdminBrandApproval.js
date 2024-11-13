import { Brand } from '../../model/model.js';
import multer from 'multer';


// Set up multer for document uploads based on document type
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const docType = req.body.docType; // Expect docType to be passed in the request body
    const uploadPath = path.join('uploads', docType);
    cb(null, uploadPath); // Ensure these folders exist (or create a middleware to check)
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`); // Timestamp to avoid conflicts
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Allow only jpeg and png files
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(new Error('Only .jpeg and .png files are supported'), false);
    }
  },
}).single('document'); // The field name in formData should be 'document'

// Controller function to handle admin brand request with document upload
 const applyForAdminBrandApproval = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error('Upload Error:', err);
      return res.status(400).json({ message: 'Error uploading document', error: err.message });
    }

    const { brandId, docType } = req.body;
    const { userId } = req.user;

    try {
      const brand = await Brand.findById(brandId);
      if (!brand || brand.createdBy !== 'admin') {
        return res.status(404).json({ message: 'Admin brand not found' });
      }

      // Update brand request status to pending and add document details
      brand.requestedDocuments = brand.requestedDocuments || {};
      brand.requestedDocuments[docType] = `/uploads/${docType}/${req.file.filename}`;
      brand.status = 'pending';
      brand.creatorId = userId;

      await brand.save();

      return res.status(200).json({ message: `${docType} document uploaded successfully`, brand });
    } catch (error) {
      console.error('Error handling admin brand request:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  });
};

export {applyForAdminBrandApproval}