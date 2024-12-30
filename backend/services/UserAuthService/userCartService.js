

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


const getCartAddedProduct = async (req, res) => {
  const { userId } = req.user;

  try {
    const cart = await Cart.findOne({ user_id: userId })
      .populate('items.product_id', 'title images sellingPrice originalPrice')
      .exec();

    if (!cart || cart.items.length === 0) {
      // Always return the simplified response structure when the cart is empty or does not exist
      return res.status(200).json({ success: true, cart: { items: [] } });
    }

    // Map the items to the desired structure
    const formattedItems = cart.items.map(item => ({
      product_id: item.product_id._id,
      title: item.product_id.title,
      originalPrice: item.product_id.originalPrice,
      sellingPrice: item.product_id.sellingPrice,
      images: item.product_id.images,
      quantity: item.quantity,
      price: item.price,
      _id: item._id
    }));

    return res.status(200).json({ success: true, cart: { items: formattedItems } });
  } catch (error) {
    // Return server error in case of an exception
    return res.status(500).json({ success: false, message: 'Server error.', error: error.message });
  }
};

  
  
 

const removeProductFromCart = async (req, res) => {
  const { userId } = req.user;
  const { productId } = req.body;

  try {
    // Find the cart for the user
    let cart = await Cart.findOne({ user_id: userId });

    if (!cart || cart.items.length === 0) {
      return res.status(404).json({ success: false, message: 'Cart is empty or not found.' });
    }

    // Find the product in the cart
    const existingItemIndex = cart.items.findIndex(
      (item) => item.product_id.toString() === productId
    );

    if (existingItemIndex === -1) {
      return res.status(404).json({ success: false, message: 'Product not found in the cart.' });
    }

    // Remove the product from the cart
    cart.items.splice(existingItemIndex, 1);

    // Save the updated cart
    await cart.save();

    return res.status(200).json({
      success: true,
      message: 'Product removed from cart successfully.',
      cart,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Server error.', error: error.message });
  }
};




const updateCartQuantity = async (req, res) => {
  try {
    const { userId } = req.user; // Extract userId from req.user (authenticated user)
    const { productId, quantity } = req.body;

    // Validate input
    if (!userId || !productId || quantity === undefined) {
      return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    // Ensure quantity is at least 1
    if (quantity < 1) {
      return res.status(400).json({ success: false, message: 'Quantity must be at least 1' });
    }

    // Find or create a cart for the user
    let cart = await Cart.findOne({ user_id: userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found.' });
    }

    // Validate the product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found.' });
    }

    // Find the product in the cart
    const existingItemIndex = cart.items.findIndex(
      (item) => item.product_id.toString() === productId
    );

    if (existingItemIndex > -1) {
      // Update the quantity of the existing product
      cart.items[existingItemIndex].quantity = quantity;
    } else {
      return res.status(404).json({ success: false, message: 'Product not found in the cart.' });
    }

    // Save the updated cart
    await cart.save();

    return res.status(200).json({
      success: true,
      message: 'Cart quantity updated successfully.',
      cart,
    });
  } catch (error) {
    console.error('Error updating cart quantity:', error);
    return res.status(500).json({ success: false, message: 'Server error.', error: error.message });
  }
};








  
  export { addProductToCart, getCartAddedProduct,removeProductFromCart,updateCartQuantity };