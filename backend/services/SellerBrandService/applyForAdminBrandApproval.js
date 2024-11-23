import { Brand } from '../../model/model.js';
import multer from 'multer';
import fs from 'fs';


const ensureUploadPathExists = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const docType = req.body.docType;
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

    ensureUploadPathExists(uploadFolder);
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    const filename = `${Date.now()}_${file.originalname}`; // You can sanitize the filename here if needed
    cb(null, filename);
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
  limits: { fileSize: 5 * 1024 * 1024 },
}).single('document'); // This must match the frontend's form field name for the file


const applyForAdminBrandApproval = async (req, res) => {
  
  uploads(req, res, async (err) => {
    if (err) {
      console.error('Upload Error:', err);
      return res.status(400).json({ message: 'Error uploading document', error: err.message });
    }

    if (!req.file) {
      console.log('No file uploaded');
      return res.status(400).json({ message: 'No document file uploaded' });
    }

    const { brandId, docType } = req.body;
    const { userId } = req.user;
console.log(req.body);
console.log(req.file.filename)

    try {
      const brand = await Brand.findById(brandId);
      if (!brand || brand.createdBy !== 'admin') {
        return res.status(404).json({ message: 'Admin brand not found' });
      }

      brand.requestedDocuments = brand.requestedDocuments || {};
      brand.requestedDocuments[docType] = `/uploads/${docType}/${req.file.filename}`;
      brand.status = 'pending';
      brand.creatorId = userId;

      await brand.save();

      return res.status(200).json({ success: true, message: `${docType} document uploaded successfully`, brand });
    } catch (error) {
      console.error('Error handling admin brand request:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  });
};


export { applyForAdminBrandApproval };
