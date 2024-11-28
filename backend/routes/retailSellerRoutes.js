import express from 'express';
import { addRetailSeller, checkSellerVerificationStatus } from '../services/SellerAuthService/sellerAuthservice.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { brandCreatedBySeller, getSellerCreatedBrands } from '../services/SellerBrandService/brandCreatedBySeller.js';
import { applyForAdminBrandApproval } from '../services/SellerBrandService/applyForAdminBrandApproval.js';
import { getBrandProduct, productUploadedBySeller } from '../services/sellerProductUploadService/productUpoladedBySeller.js';







const router = express.Router();

const app = express();

router.use('/uploads', express.static('uploads'));





router.post('/addRetailSeller', authenticateToken, addRetailSeller);
router.get('/checkSellerVerificationStatus', authenticateToken, checkSellerVerificationStatus);
router.post('/brandCreatedBySeller', authenticateToken, brandCreatedBySeller);
router.get('/getSellerCreatedBrands', authenticateToken, getSellerCreatedBrands);
router.post('/applyForAdminBrandApproval', authenticateToken, applyForAdminBrandApproval);
router.post('/productUploadedBySeller', authenticateToken, productUploadedBySeller);
router.get('/getSellerProduct/:id', authenticateToken, getBrandProduct);






export default router;