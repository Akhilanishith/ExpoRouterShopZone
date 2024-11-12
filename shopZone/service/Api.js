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



    //!seller

    checkSellerVerificationStatus : server+"/retail/checkSellerVerificationStatus",

        
}

export default Api;