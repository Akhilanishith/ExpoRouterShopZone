import { RetailSeller, FoodSeller } from "../../model/model.js";
import getExpoToken from "../../helper/getExpoToken.js";

import sendNotification from "../NotificationService/notificationService.js";

// Fetch pending and verified sellers for admin verification
async function getPendingSellers(req, res) {
  try {
      // Fetch pending retail sellers and verified sellers
      const retailPendingSellers = await RetailSeller.find({ verification_status: 'pending' });
      const retailVerifiedSellers = await RetailSeller.find({ verification_status: 'verified' });

      // Fetch pending food sellers and verified sellers
      const foodPendingSellers = await FoodSeller.find({ verification_status: 'pending' });
      const foodVerifiedSellers = await FoodSeller.find({ verification_status: 'verified' });

      // Combine pending retail and food sellers
      const pendingSellers = [
          ...retailPendingSellers.map(seller => ({
              id: seller._id,
              uid: seller.userId,
              name: seller.business_name,
              email: seller.userId ? seller.userId.email : 'N/A',
              type: 'retail',
              status: seller.verification_status
          })),
          ...foodPendingSellers.map(seller => ({
              id: seller._id,
              uid: seller.userId,
              name: seller.restaurant_name,
              email: seller.userId ? seller.userId.email : 'N/A',
              type: 'food',
              status: seller.verification_status
          }))
      ];

      // Combine verified retail and food sellers
      const verifiedSellers = [
          ...retailVerifiedSellers.map(seller => ({
              id: seller._id,
              uid: seller.userId,
              name: seller.business_name,
              email: seller.userId ? seller.userId.email : 'N/A',
              type: 'retail',
              status: seller.verification_status
          })),
          ...foodVerifiedSellers.map(seller => ({
              id: seller._id,
              uid: seller.userId,
              name: seller.restaurant_name,
              email: seller.userId ? seller.userId.email : 'N/A',
              type: 'food',
              status: seller.verification_status
          }))
      ];

      // Return both pending and verified sellers
      res.json({ pendingSellers, verifiedSellers });
  } catch (error) {
      console.error('Error fetching sellers:', error.message);
      res.status(500).json({ message: 'Error fetching sellers', error: error.message });
  }
}




// Update seller verification status
 async function updateSellerStatus(req, res) {
  const { sellerId, newStatus, sellerType,uid } = req.body;
  console.log(req.body)
  const userToken = await getExpoToken(uid)

  if (!sellerId || !newStatus || !sellerType) {
    return res.status(400).json({ message: 'Invalid request parameters' });
  }

  try {
    let sellerModel;

    // Determine which seller type to update (retail or food)
    if (sellerType === 'retail') {
      sellerModel = RetailSeller;
    } else if (sellerType === 'food') {
      sellerModel = FoodSeller;
    } else {
      return res.status(400).json({ message: 'Invalid seller type' });
    }

    // Find the seller by ID and update the verification status
    const updatedSeller = await sellerModel.findByIdAndUpdate(
      sellerId,
      { verification_status: newStatus },
      { new: true } // Return the updated document
    );

    if (!updatedSeller) {
      return res.status(404).json({ message: 'Seller not found' });
    }

    // Respond with success message
    res.status(200).json({
      message: `Seller status updated to ${newStatus}`,
      seller: updatedSeller
    });
    sendNotification(userToken,"Verification","Dear user you have been verified as a seller, fell free to upload your product")

  } catch (error) {
    console.error('Error updating seller status:', error.message);
    res.status(500).json({ message: 'Error updating seller status', error: error.message });
  }
}

export{getPendingSellers, updateSellerStatus}
//hai