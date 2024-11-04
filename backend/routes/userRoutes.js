import express from 'express';
import { phoneValidation, updateToken, verifyOtp } from '../services/UserAuthService/userAuthService.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();


router.post('/phoneValidation', phoneValidation);
router.post('/verifyOtp', verifyOtp);
router.post('/updateToken',authenticateToken, updateToken);

export default router;