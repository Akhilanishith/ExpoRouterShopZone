import { FoodSeller, RetailSeller } from "../../model/model.js";

export async function checkRetailAndFoodVerificationStatus(req, res) {
    // console.log("checkSellerVerificationStatus")
    
    const userId = req.user.userId; // Extracted from token
  
    try {
      // Find the user and get their verification statuses
      const retailSeller = await RetailSeller.findOne({ userId });
      const foodSeller = await FoodSeller.findOne({ userId });
  
      // Prepare an object with the verification statuses
      const statuses = {
        retailSellerStatus: retailSeller ? retailSeller.verification_status : 'none',
        foodSellerStatus: foodSeller ? foodSeller.verification_status : 'none',
      };
  
      // Return both statuses
      return res.json(statuses);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error fetching verification status' });
    }
}
