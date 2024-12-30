
import {  Product, Wishlist } from "../../model/model.js";
const addProductToWishlist = async (req, res) => {
    const { userId } = req.user; // Ensure `req.user` contains `userId`
    const { productId } = req.body; // Get the productId from the request body
  
    try {
      // Log incoming data for debugging
      console.log('User ID:', userId);
      console.log('Product ID:', productId);
  
      // Check if the wishlist exists for the user
      let wishlist = await Wishlist.findOne({ user_id: userId });
  
      // If no wishlist exists, create a new one
      if (!wishlist) {
        console.log('Creating new wishlist...');
        wishlist = new Wishlist({ user_id: userId, items: [] });
      }
  
      // Validate the productId
      const product = await Product.findById(productId);
      if (!product) {
        console.log('Product not found for ID:', productId);
        return res.status(404).json({ success: false, message: 'Product not found.' });
      }
  
      // Check if the product is already in the wishlist
      const existingItem = wishlist.items.find(
        (item) => item.product_id.toString() === productId
      );
      if (existingItem) {
        console.log('Product already in wishlist.');
        return res.status(400).json({ success: false, message: 'Product already in wishlist.' });
      }
  
      // Add the product to the wishlist
      wishlist.items.push({ product_id: productId });
      await wishlist.save();
  
      // Return the updated wishlist
      return res.status(200).json({
        success: true,
        message: 'Product added to wishlist successfully.',
        wishlist,
      });
    } catch (error) {
      console.error('Error adding product to wishlist:', error); // Log the error for debugging
      return res.status(500).json({ success: false, message: 'Server error.', error: error.message });
    }
  };
  
  
  const getWishlistAddedProducts = async (req, res) => {
    const { userId } = req.user;
  
    try {
      const wishlist = await Wishlist.findOne({ user_id: userId })
        .populate('items.product_id', 'title images sellingPrice originalPrice')
        .exec();
  
      if (!wishlist || wishlist.items.length === 0) {
        return res.status(200).json({ success: true, wishlist: { items: [] } });
      }
  
      const formattedItems = wishlist.items.map(item => ({
        product_id: item.product_id._id,
        title: item.product_id.title,
        originalPrice: item.product_id.originalPrice,
        sellingPrice: item.product_id.sellingPrice,
        images: item.product_id.images,
        _id: item._id,
      }));
  
      return res.status(200).json({ success: true, wishlist: { items: formattedItems } });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Server error.', error: error.message });
    }
  };
  const removeProductFromWishlist = async (req, res) => {
    const { userId } = req.user;
    const { productId } = req.body;
  
    try {
      let wishlist = await Wishlist.findOne({ user_id: userId });
  
      if (!wishlist || wishlist.items.length === 0) {
        return res.status(404).json({ success: false, message: 'Wishlist is empty or not found.' });
      }
  
      const existingItemIndex = wishlist.items.findIndex(
        (item) => item.product_id.toString() === productId
      );
  
      if (existingItemIndex === -1) {
        return res.status(404).json({ success: false, message: 'Product not found in the wishlist.' });
      }
  
      wishlist.items.splice(existingItemIndex, 1);
  
      await wishlist.save();
  
      return res.status(200).json({
        success: true,
        message: 'Product removed from wishlist successfully.',
        wishlist,
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Server error.', error: error.message });
    }
  };
  export { addProductToWishlist,getWishlistAddedProducts,removeProductFromWishlist };      