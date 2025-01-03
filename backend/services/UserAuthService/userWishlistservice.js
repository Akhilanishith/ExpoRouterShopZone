
import {  Product, Wishlist } from "../../model/model.js";
const toggleWishlist = async (req, res) => {
  const { userId } = req.user; // Ensure `req.user` contains `userId`
  const { productId } = req.body; // Get the productId from the request body

  try {
    // Check if the wishlist exists for the user
    let wishlist = await Wishlist.findOne({ user_id: userId });

    // If no wishlist exists, create a new one
    if (!wishlist) {
      wishlist = new Wishlist({ user_id: userId, items: [] });
    }

    // Validate the productId
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    // Check if the product is already in the wishlist
    const existingItemIndex = wishlist.items.findIndex(
      (item) => item.product_id.toString() === productId
    );

    if (existingItemIndex > -1) {
      // If the product exists in the wishlist, remove it
      wishlist.items.splice(existingItemIndex, 1);
      await wishlist.save();

      return res.status(200).json({
        success: true,
        message: 'Product removed from wishlist successfully.',
        wishlist,
      });
    } else {
      // If the product does not exist in the wishlist, add it
      wishlist.items.push({ product_id: productId });
      await wishlist.save();

      return res.status(200).json({
        success: true,
        message: 'Product added to wishlist successfully.',
        wishlist,
      });
    }
  } catch (error) {
    console.error('Error toggling product in wishlist:', error); // Log the error for debugging
    return res.status(500).json({ success: false, message: 'Server error.', error: error.message });
  }
};

  
  
const getWishlistAddedProducts = async (req, res) => {
  const { userId } = req.user;

  try {
    // Fetch the wishlist for the user and populate the product details
    const wishlist = await Wishlist.findOne({ user_id: userId })
      .populate('items.product_id', 'title images sellingPrice originalPrice variants')
      .exec();

    if (!wishlist || wishlist.items.length === 0) {
      return res.status(200).json({ success: true, products: []});
    }

    // Transform the wishlist items to include `isWishlisted` property
    const productsWithWishlistStatus = wishlist.items.map((item) => {
      const product = item.product_id.toObject(); // Convert mongoose doc to plain object
      product.isWishlisted = true; // Mark as wishlisted
      return product;
    });

    return res.status(200).json({ success: true, products: productsWithWishlistStatus });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error.', error: error.message });
  }
};


 
  export { toggleWishlist,getWishlistAddedProducts };      