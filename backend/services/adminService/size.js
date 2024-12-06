// Controllers
import {Size} from '../../model/model.js';
const getSizesBySubType = async (req, res) => {
    const { subTypesId } = req.params;

    try {
        const sizes = await Size.find({ subTypesId });
        res.status(200).json(sizes);
    } catch (error) {
        console.error('Error fetching sizes:', error);
        res.status(500).json({ message: 'Failed to fetch sizes' });
    }
};

const createSize = async (req, res) => {
    const { sizeName, sizeValue, subTypesId } = req.body;

    try {
        const newSize = new Size({
            sizeName,
            sizeValue,
            subTypesId,
        });

        const savedSize = await newSize.save();
        res.status(200).json({ message: 'Size created successfully', size: savedSize });
    } catch (error) {
        console.error('Error creating size:', error);
        res.status(500).json({ message: 'Failed to create size' });
    }
};

// Export the functions
export {
    getSizesBySubType,
    createSize,
};
