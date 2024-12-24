

// const addProductToCart = async (req, res) => {
//   const { userId } = req.user; // Assuming `req.user` is populated by middleware
//   const { productId, quantity = 1 } = req.body;

//   try {
//     // Find or create the cart for the user
//     let cart = await Cart.findOne({ user_id: userId });
//     if (!cart) {
//       cart = new Cart({
//         user_id: userId,
//         items: [],
//       });
//     }

//     // Check if the product already exists in the cart
//     const product = await Product.findById(productId);
//     if (!product) {
//       return res.status(404).json({ success: false, message: 'Product not found.' });
//     }

//     const existingItemIndex = cart.items.findIndex(
//       (item) => item.product_id.toString() === productId
//     );

//     if (existingItemIndex > -1) {
//       // Update quantity if product already exists
//       cart.items[existingItemIndex].quantity += quantity;
//     } else {
//       // Add new product to the cart
//       cart.items.push({
//         product_id: productId,
//         quantity,
//         price: product.price, // Dynamically populate price
//       });
//     }

//     // Save the cart (triggers pre-save middleware for total price)
//     await cart.save();

//     return res.status(200).json({
//       success: true,
//       message: 'Product added to cart successfully.',
//       cart,
//     });
//   } catch (error) {
//     console.error('Error adding product to cart:', error);
//     return res.status(500).json({ success: false, message: 'Server error.', error: error.message });
//   }
// };

  
  
// const getCartAddedProduct = async (req, res) => {
//     const { userId } = req.user; // Assuming `req.user` is populated by middleware for authenticated users
//     console.log(userId)
  
//     try {
//       // Find the cart associated with the authenticated user
//       const cart = await Cart.findOne({ user_id: userId })
//         .populate('items.product_id', 'name price') // Populate product details
//         .exec();

//       if (!cart || cart.items.length === 0) {
//         return res.status(404).json({
//           success: false,
//           message: 'No items found in the cart.',
//         });
//       }
  
//       // Respond with the cart details
//       return res.status(200).json({
//         success: true,
//         cart,
//       });
//     } catch (error) {
//       console.error('Error fetching cart products:', error);
//       return res.status(500).json({
//         success: false,
//         message: 'Server error, please try again later.',
//         error: error.message,
//       });
//     }
//   };
  
import { Cart, Product } from "../../model/model.js";

const addProductToCart = async (req, res) => {
  const { userId } = req.user;
  const { productId, quantity = 1 } = req.body;

  try {
    let cart = await Cart.findOne({ user_id: userId });
    if (!cart) {
      cart = new Cart({ user_id: userId, items: [] });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    const existingItemIndex = cart.items.findIndex(
      (item) => item.product_id.toString() === productId
    );

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      cart.items.push({
        product_id: productId,
        quantity,
        price: product.sellingPrice,
      });
    }

    await cart.save();
    return res.status(200).json({ success: true, message: 'Product added to cart successfully.', cart });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error.', error: error.message });
  }
};

// const getCartAddedProduct = async (req, res) => {
//     const { userId } = req.user;
  
//     try {
//       const cart = await Cart.findOne({ user_id: userId })
//         .populate('items.product_id', 'title images sellingPrice originalPrice')
//         .exec();
  
//       if (!cart || cart.items.length === 0) {
//         return res.status(404).json({ success: false, message: 'No items found in the cart.' });
//       }
  
//       return res.status(200).json({ success: true, cart });
//     } catch (error) {
//       return res.status(500).json({ success: false, message: 'Server error.', error: error.message });
//     }
//   };
const getCartAddedProduct = async (req, res) => {
    const { userId } = req.user;
  
    try {
      const cart = await Cart.findOne({ user_id: userId })
        .populate('items.product_id', 'title images sellingPrice originalPrice')
        .exec();
  
      if (!cart || cart.items.length === 0) {
        return res.status(404).json({ success: false, message: 'No items found in the cart.' });
      }
  
      let totalDiscount = 0;
      let totalPrice = 0;
  
      const itemsWithDiscount = cart.items.map((item) => {
        const product = item.product_id;
  
        // Discount per item
        const itemDiscount = (product.originalPrice - product.sellingPrice) * item.quantity;
  
        // Total price for item after discount
        const itemTotal = product.sellingPrice * item.quantity;
  
        // Accumulate totals
        totalDiscount += itemDiscount > 0 ? itemDiscount : 0;
        totalPrice += itemTotal;
  
        return {
          product_id: product._id,
          title: product.title,
          images: product.images,
          quantity: item.quantity,
          originalPrice: product.originalPrice,
          sellingPrice: product.sellingPrice,
          itemTotal: itemTotal,
          discount: itemDiscount > 0 ? itemDiscount : 0,
        };
      });
  
      const response = {
        items: itemsWithDiscount,
        totalPrice,
        totalDiscount,
      };
  
      return res.status(200).json({ success: true, cart: response });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Server error.', error: error.message });
    }
  };
  
  
  
  
  export { addProductToCart, getCartAddedProduct };