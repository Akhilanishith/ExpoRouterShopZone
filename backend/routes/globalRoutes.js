import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { checkRetailAndFoodVerificationStatus } from '../services/globalService/globalService.js';


const router = express.Router();


router.get('/checkRetailAndFoodVerificationStatus',authenticateToken,checkRetailAndFoodVerificationStatus);

export default router;