const server = "http://192.168.1.67:5000"


const Api = {
    main : server,
    updateToken: server+"/user/updateToken",
    phoneValidation : server+"/user/phoneValidation",
    otpValidation : server+"/user/verifyOtp",
    addFoodSeller : server+"/food/addFoodSeller",
    addRetailSeller : server+"/retail/addRetailSeller",
    checkRetailAndFoodVerificationStatus: server+"/global/checkRetailAndFoodVerificationStatus",
    brandCreatedBySeller : server+"/retail/brandCreatedBySeller",
    getSellerCreatedBrands : server+"/retail/getSellerCreatedBrands",
    getAdminBrands : server+"/admin/getAdminBrands",
    applyForAdminBrandApproval: server+"/retail/applyForAdminBrandApproval",
    getAdminBrandApproval: server+"/retail/getAdminBrandApproval",
     getCategories: server+"/admin/categories",
    getSubcategoriesByCategory: server+"/admin/subcategories",
    productUploadedBySeller: server+"/retail/productUploadedBySeller",
    getSubTypesBySubcategories: server+"/admin/getSubTypesBySubcategories",
    getSellerProduct : server+"/retail/getSellerProduct",
    getSellerAllBrandProduct : server+"/retail/getSellerAllBrandProduct",
    getSellerCreatedVerifiedBrands : server+"/retail/getSellerCreatedVerifiedBrands",
    getAllSellersAllBrandProducts : server+"/retail/getAllSellersAllBrandProducts",
    getProductById : server+"/retail/getProductById",
    // getProductsByTypes : server+"/retail/getProductsByTypes",
    getAllSellersAllBrandTypesProducts : server+"/retail/getAllSellersAllBrandTypesProducts",
    addProductToCart : server+"/user/addProductToCart",
    getCartAddedProduct : server+"/user/getCartAddedProduct",
    removeProductFromCart : server+"/user/removeProductFromCart",


    //!seller

    checkSellerVerificationStatus : server+"/retail/checkSellerVerificationStatus",

        
}

export default Api;