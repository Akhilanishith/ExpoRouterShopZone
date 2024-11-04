 // Assuming the seller model exists

import { FoodSeller, RetailSeller } from "../../model/model.js";

export async function addRetailSeller(req, res) {
    const { business_name, business_phone_number, business_address } = req.body;
  const userId = req.user.userId; // Extracted from token

  try {
    const retailSeller = new RetailSeller({
      userId,
      business_name,
      business_phone_number,
      business_address,
      verification_status: 'pending',
    });
    await retailSeller.save();
    res.status(201).json({ success:true ,message: 'Retail shop submitted for verification' });
  } catch (error) {
    res.status(500).json({ success:false ,message: 'Error submitting retail shop' });
  }

}

export async function addFoodSeller(req, res) {
    const { restaurant_name, restaurant_phone_number, restaurant_address } = req.body;
    const userId = req.user.userId; // Extracted from token
  
    try {
      const foodSeller = new FoodSeller({
        userId,
        restaurant_name,
        restaurant_phone_number,
        restaurant_address,
        verification_status: 'pending',
      });
      await foodSeller.save();
      res.status(201).json({ success:true,message: 'Food shop submitted for verification' });
    } catch (error) {
      res.status(500).json({ success:true,message: 'Error submitting food shop' });
    }

}
export async function checkSellerVerificationStatus(req, res) {
  // console.log("checkSellerVerificationStatus")
  
  const userId = req.user.userId; // Extracted from token

  try {
    // Find the user and get their verification status (for example, for retail seller)

    const retailSeller = await RetailSeller.findOne({ userId });

    // Return the appropriate verification status
    if (retailSeller) {
      return res.json({ status: retailSeller.verification_status });
    }

    return res.json({ status: 'none' }); // If no seller record found, return 'none'
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Error fetching verification status' });
  }
}

export async function checkFoodSellerVerificationStatus(req, res) {
  
  const userId = req.user.userId; // Extracted from token

  try {
    // Find the user and get their verification status (for example, for retail seller)
    const foodSeller = await FoodSeller.findOne({ userId });

    // Return the appropriate verification status
    if (foodSeller) {
      return res.json({ status: foodSeller.verification_status });
    }

    return res.json({ status: 'none' }); // If no seller record found, return 'none'
  } catch (error) {
    res.status(500).json({ message: 'Error fetching verification status' });
  }
}