import express from 'express';
import { phoneValidation, updateToken, verifyOtp } from '../services/UserAuthService/userAuthService.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { addProductToCart, getCartAddedProduct, removeProductFromCart, updateCartQuantity } from '../services/UserAuthService/userCartService.js';
import { toggleWishlist, getWishlistAddedProducts } from '../services/UserAuthService/userWishlistService.js';
import { getUserDetails } from '../services/UserAuthService/userLoginnumber.js';
import { addDeliveryAddress, deleteAddress, getDeliveryAddress, updateAddress } from '../services/UserAuthService/orderAddNewAddress.js';


const router = express.Router();


router.post('/phoneValidation', phoneValidation);
router.post('/verifyOtp', verifyOtp);
router.post('/updateToken',authenticateToken, updateToken);
router.post('/addProductToCart',authenticateToken, addProductToCart);
router.get('/getCartAddedProduct',authenticateToken, getCartAddedProduct);
router.delete('/removeProductFromCart',authenticateToken, removeProductFromCart);
router.post('/updateCartQuantity',authenticateToken, updateCartQuantity);
router.post('/toggleWishlist',authenticateToken, toggleWishlist);
router.get('/getWishlistAddedProducts',authenticateToken, getWishlistAddedProducts);


router.get('/getUserDetails', authenticateToken, getUserDetails);
router.post('/addDeliveryAddress', authenticateToken, addDeliveryAddress);
router.get('/getDeliveryAddress', authenticateToken, getDeliveryAddress);

router.put('/updateAddress/:id', authenticateToken,updateAddress);

router.delete('/deleteAddress/:id', authenticateToken, deleteAddress);

export default router;