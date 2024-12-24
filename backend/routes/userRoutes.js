import express from 'express';
import { phoneValidation, updateToken, verifyOtp } from '../services/UserAuthService/userAuthService.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { addProductToCart, getCartAddedProduct } from '../services/UserAuthService/userCartService.js';

const router = express.Router();


router.post('/phoneValidation', phoneValidation);
router.post('/verifyOtp', verifyOtp);
router.post('/updateToken',authenticateToken, updateToken);
router.post('/addProductToCart',authenticateToken, addProductToCart);
router.get('/getCartAddedProduct',authenticateToken, getCartAddedProduct);

export default router;