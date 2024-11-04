import { Brand } from '../../model/model.js'; /// Assuming you have the Brand model in models directory

// Fetch all brands created by sellers with 'pending' status
const getSellerCreatedPendingBrands = async (req, res) => {
  try {
    const sellerBrands = await Brand.find({ createdBy: 'seller', status: 'pending' });

    if (!sellerBrands.length) {
      return res.status(404).json({ message: 'No pending seller brands found' });
    }

    res.status(200).json({ brands: sellerBrands });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pending seller brands', error });
  }
};

// Admin verifies or rejects a seller brand
const verifySellerBrandByAdmin = async (req, res) => {
  const { brandId } = req.params;
  const { status, adminRemarks } = req.body;

  if (!['verified', 'rejected'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status. Status should be either "verified" or "rejected".' });
  }

  try {
    const brand = await Brand.findById(brandId);

    if (!brand) {
      return res.status(404).json({ message: 'Brand not found' });
    }

    if (brand.createdBy !== 'seller' || brand.status !== 'pending') {
      return res.status(400).json({ message: 'This brand is not eligible for verification' });
    }

    brand.status = status;
    brand.adminRemarks = adminRemarks || '';
    brand.adminVerificationStatus = status;
    brand.updatedAt = Date.now();

    await brand.save();

    res.status(200).json({ message: `Brand has been ${status}`, brand });
  } catch (error) {
    res.status(500).json({ message: 'Error verifying brand', error });
  }
};

export {getSellerCreatedPendingBrands, verifySellerBrandByAdmin}