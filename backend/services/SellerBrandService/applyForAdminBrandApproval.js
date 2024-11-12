import { Brand } from '../../model/model.js';



const applyForAdminBrandApproval = async (req, res) => {
    const { userId } = req.user; // Ensure user is authenticated
    const { brandId } = req.body; // Access brandId from req.body
    console.log(req.body);  // This should now show the form data, including brandId
    console.log(req.file);   // This should show the file uploaded for invoice

    try {
        // Find the brand by its ID
        const brand = await Brand.findById(brandId);
        if (!brand) {
            return res.status(404).json({ message: 'Brand not found' });
        }

        // Check if the seller is already authorized
        if (brand.authorizedSellers.includes(userId)) {
            return res.status(400).json({ message: 'You are already authorized to sell this brand' });
        }

        // Add the seller to the authorizedSellers list and set adminVerificationStatus to pending
        brand.authorizedSellers.push(userId);
        brand.adminVerificationStatus = 'pending';

        // If an invoice file was uploaded, add it to the verificationDocuments array
        if (req.file) {
            brand.verificationDocuments.push(req.file.path); // Save the invoice document path
        }

        // Save the updated brand
        await brand.save();

        res.status(200).json({ message: 'Application submitted for approval' });
    } catch (error) {
        console.error('Error in applyForAdminBrandApproval:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export { applyForAdminBrandApproval };

