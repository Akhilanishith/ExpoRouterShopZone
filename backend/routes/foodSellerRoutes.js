
import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { addFoodSeller, checkFoodSellerVerificationStatus } from '../services/SellerAuthService/sellerAuthservice.js';

const router = express.Router();

router.post('/addFoodSeller',authenticateToken,addFoodSeller);

router.get('/checkFoodSellerVerificationStatus',authenticateToken,checkFoodSellerVerificationStatus);

export default router;