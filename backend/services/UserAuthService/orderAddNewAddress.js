import { AddDeliveryAddress } from '../../model/model.js';

// Add New Address
export const addDeliveryAddress = async (req, res) => {
  const { name, mobile, pincode, address, city, state, landmark, addressType } = req.body;
  const { userId } = req.user;

  try {
    if (!name || !mobile || !pincode || !address || !city || !state) {
      return res.status(400).json({ success: false, message: 'Missing required fields!' });
    }

    const newAddress = new AddDeliveryAddress({
      user_id: userId,
      name,
      mobile,
      pincode,
      address,
      city,
      state,
      landmark,
      addressType,
    });

    await newAddress.save();
    res.json({ success: true, message: 'Address added successfully!' });
  } catch (error) {
    console.error('Error while adding address:', error);
    res.status(500).json({ success: false, message: 'Server error!' });
  }
};

// Get All Addresses
export const getDeliveryAddress = async (req, res) => {
  const { userId } = req.user;

  try {
    const addresses = await AddDeliveryAddress.find({ user_id: userId }).sort({ createdAt: 1 });
    if (addresses.length > 0) {
      res.json({ success: true, addresses });
    } else {
      res.json({ success: false, message: 'No addresses found.' });
    }
  } catch (error) {
    console.error('Error while fetching addresses:', error);
    res.status(500).json({ success: false, message: 'Server error!' });
  }
};

// Update Address
export const updateAddress = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  const updatedData = req.body;

  try {
    const updatedAddress = await AddDeliveryAddress.findOneAndUpdate(
      { _id: id, user_id: userId },
      updatedData,
      { new: true }
    );

    if (updatedAddress) {
      res.json({ success: true, message: 'Address updated successfully!', address: updatedAddress });
    } else {
      res.status(404).json({ success: false, message: 'Address not found.' });
    }
  } catch (error) {
    console.error('Error while updating address:', error);
    res.status(500).json({ success: false, message: 'Server error!' });
  }
};



export const deleteAddress = async (req, res) => {
  const { id } = req.params; // Address ID from the request
  const { userId } = req.user; // User ID from the authenticated user

  try {
    const deletedAddress = await AddDeliveryAddress.findOneAndDelete({
      _id: id,
      user_id: userId,
    });

    if (deletedAddress) {
      res.json({ success: true, message: 'Address deleted successfully!' });
    } else {
      res.status(404).json({ success: false, message: 'Address not found.' });
    }
  } catch (error) {
    console.error('Error while deleting address:', error);
    res.status(500).json({ success: false, message: 'Server error while deleting address.' });
  }
};