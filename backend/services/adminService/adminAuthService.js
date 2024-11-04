import bcrypt from 'bcrypt';
import { adminModel } from "../../model/adminModel.js";
import { generateToken } from '../../middleware/authMiddleware.js';

async function adminAuthService(req, res) {
  const { username, password } = req.body;

  try {
    // Find admin by username
    const admin = await adminModel.findOne({ username,password });


    if (!admin) {
      return res.json({ success:false,message: 'Admin not found or Invalid credentials' });
    }

    // Compare password
    // const isMatch = await bcrypt.compare(password, admin.password);

    // if (!isMatch) {
    //   return res.status(400).json({ message: 'Invalid credentials' });
    // }

    // Generate token using the generateToken function
    const token = generateToken(admin);

    // Return the token in the response
    return res.json({ success:true,token });
  } catch (error) {
    console.error('Error in adminAuthService:', error);
    return res.status(500).json({success:false, message: 'Server error' });
  }
}

export { adminAuthService };
