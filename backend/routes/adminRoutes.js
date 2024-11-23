import express from 'express';

import { adminAuthService } from '../services/adminService/adminAuthService.js';
import { getPendingSellers, updateSellerStatus } from '../services/adminService/adminSellerStatusVerification.js';
import { createCategory, getCategories } from '../services/adminService/categoryService.js';
import { createSubcategory, getSubcategoriesByCategory } from '../services/adminService/subCategoryService.js';
import { brandCreatedByAdmin, getAdminBrands } from '../services/adminService/brandCreatedByAdmin.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { getSellerCreatedPendingBrands, verifySellerBrandByAdmin } from '../services/adminService/sellerBrandVerificationByAdmin.js';
import { createSubTypes, getSubTypesBySubcategories } from '../services/adminService/subTypes.js';






const router = express.Router();

router.use('/uploads', express.static('uploads'));
router.post('/loginAdmin',adminAuthService);
router.get('/getPendingSellers', getPendingSellers);
router.put('/updateSellerStatus', updateSellerStatus);
router.get('/categories',getCategories);
 router.post('/categories',authenticateToken,  createCategory); 
router.get('/subcategories/:categoryId',authenticateToken,getSubcategoriesByCategory);
router.post('/subcategories',authenticateToken, createSubcategory);
router.post('/brandCreatedByAdmin',authenticateToken, brandCreatedByAdmin);
router.get('/getAdminBrands',authenticateToken, getAdminBrands);
router.get('/getSellerCreatedPendingBrands',authenticateToken, getSellerCreatedPendingBrands);
router.put('/verifySellerBrandByAdmin/:brandId', authenticateToken,verifySellerBrandByAdmin);
router.get('/getSubTypesBySubcategories/:subcategoryId',authenticateToken, getSubTypesBySubcategories);
router.post('/createSubTypes', authenticateToken,createSubTypes);






export default router;