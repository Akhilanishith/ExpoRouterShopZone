// Controllers
import {Size} from '../../model/model.js';
import mongoose from 'mongoose';
const getSizesBySubType = async (req, res) => {
    const { subTypesId } = req.params;

    try {
        const sizes = await Size.find({ SubTypes: subTypesId });
        res.status(200).json(sizes);
    } catch (error) {
        console.error('Error fetching sizes:', error);
        res.status(500).json({ message: 'Failed to fetch sizes' });
    }
};






const createSize = async (req, res) => {
    const { name, SubTypes } = req.body;

    try {
        // Validate input
        if (!name || !SubTypes) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Validate SubTypes format
        if (!mongoose.Types.ObjectId.isValid(SubTypes)) {
            return res.status(400).json({ message: 'Invalid SubTypes ID' });
        }

        // Create and save size
        const newSize = new Size({
            name,
            SubTypes,
        });

        const savedSize = await newSize.save();
        res.status(200).json({ message: 'Size created successfully', size: savedSize });
    } catch (error) {
        console.error('Error creating size:', error);
        res.status(500).json({ message: 'Failed to create size', error: error.message });
    }
};



// Export the functions
export {getSizesBySubType,createSize,};
    
    

