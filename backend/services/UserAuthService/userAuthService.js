import { generateToken } from "../../middleware/authMiddleware.js";
import { User } from "../../model/model.js";
import mongoose from 'mongoose';

// Function to generate a 4-digit OTP
function generateOtp() {
  return Math.floor(1000 + Math.random() * 9000).toString(); // Generates a 4-digit OTP
}

async function phoneValidation(req, res) {
  const country_code = '+91';

  try {
    const { number } = req.body; // Phone number passed from the frontend

    // Check if the phone number exists in the database
    const existingUser = await User.findOne({
      'phone.country_code': country_code,
      'phone.number': number
    });

    const otp = generateOtp();
    console.log(otp)
    const otpExpiryTime = new Date(Date.now() + 10 * 60 * 1000); // Set OTP expiry to 10 minutes from now

    if (existingUser) {
      // Check if the user's email is empty or not
      const isEmailEmpty = !existingUser.email || existingUser.email.trim() === '';

      // Update the existing user's OTP and OTP details
      existingUser.otp_login.otp = otp;
      existingUser.otp_login.otp_created_at = new Date();
      existingUser.otp_login.otp_expires_at = otpExpiryTime;
      existingUser.otp_login.is_verified = false;
      existingUser.otp_login.otp_attempts = 0;
      await existingUser.save();
      console.log(otp)
      // Send OTP and return the result
      return res.json({
        success: true,
        dataExist: true,
        message: "OTP sent successfully",
        emailExists: !isEmailEmpty, // Indicate whether email exists for the user
        emailEmpty: isEmailEmpty // Indicate if the email is empty
      });
    } else {
      // If user does not exist, create a new user entry with phone number and OTP
      const newUser = new User({
        phone: {
          country_code,
          number
        },
        otp_login: {
          otp,
          otp_created_at: new Date(),
          otp_expires_at: otpExpiryTime,
          otp_attempts: 0,
          is_verified: false
        }
      });

      // Save the new user
      await newUser.save();

      // Send OTP and return the result for the new user
      return res.json({
        success: true,
        dataExist: false,
        message: "User created and OTP sent successfully",
        emailExists: false, // No email provided for the new user
        emailEmpty: true // Email is empty for the newly created user
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error", success: false });
  }
}
async function verifyOtp(req, res) {
  const { number, otp, email } = req.body; // Phone number, OTP, and optionally email passed from the frontend
  const country_code = '+91';

  try {
    // Find the user based on the phone number and country code
    const user = await User.findOne({
      'phone.country_code': country_code,
      'phone.number': number
    });

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Check if the OTP is valid and not expired
    const isOtpValid = user.otp_login.otp === otp && user.otp_login.otp_expires_at > new Date();

    if (!isOtpValid) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    // Check if email is required (when `emailEmpty` is true)
    if (!user.email && email) {
      // Validate email format (basic validation)
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: "Invalid email format" });
      }

      // Update the user's email
      user.email = email;
    }

    // Update OTP verification status and reset OTP details
    user.otp_login.is_verified = true;
    user.otp_login.otp = null; // Clear OTP after verification
    user.otp_login.otp_created_at = null;
    user.otp_login.otp_expires_at = null;
    user.otp_login.last_login_at = new Date();

    // Save the updated user data
    await user.save();

    // Generate a JWT token
    const token = generateToken(user);

    // Return success response with token
    return res.json({
      success: true,
      message: "OTP verified successfully",
      token: token, // Send the generated token
      emailAdded: !!email, // Indicate if email was added
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

async function updateToken(req, res) {
 
  const token = req.body.expoToken.data
  console.log(token)
  const { userId } = req.user

  try {
    // Find the user and update the token field
    const updatedUser = await User.findByIdAndUpdate(userId, { token: token }, { new: true });

    console.log(updatedUser)
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json({ message: 'Token updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating token:', error);
    res.status(500).json({ message: 'Server error' });
  }
}

export { phoneValidation, verifyOtp, updateToken };
