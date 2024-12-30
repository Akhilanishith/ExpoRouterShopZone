import { User } from "../../model/model.js";// Adjust path to your User model



// // Controller to get logged-in user details
const getUserDetails = async (req, res) => {
    const { userId } = req.user;
  try {
    // Fetch the logged-in user details using the user ID from the token
    const user = await User.findById({ _id: userId }).select('phone');

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.status(200).json({
      success: true,
      user_id: userId, // Include user_id in the response
      phone: user.phone,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
};

export { getUserDetails };