// const server = "http://192.168.1.68:3000"

export const server = "http://localhost:5000" // change this to your server IP address or domain name

const Api = {
  

        //admin
        loginAdmin : server+"/admin/loginAdmin",
        getPendingSellers : server+"/admin/getPendingSellers",
        updateSellerStatus : server+"/admin/updateSellerStatus",
        getAllUsers : server+"/user/getAllUsers",
        getVerifiedUsers : server+"/admin/getVerifiedUsers",
        getBlockedUsers : server+"/admin/getBlockedUsers",
        updateUserStatus : server+"/admin/user-status/:id",
        // getBrands: server+"/admin/getBrands",
        // updateBrandStatus: server+"/admin/updateBrandStatus",
        getCategories: server+"/admin/categories",
        createCategory: server+"/admin/categories",
        getSubcategoriesByCategory: server+"/admin/subcategories",
        createSubcategory: server+"/admin/subcategories",
        
        brandCreatedByAdmin:server+"/admin/brandCreatedByAdmin",
        getAdminBrands: server+"/admin/getAdminBrands",
        getSellerCreatedPendingBrands:server+"/admin/getSellerCreatedPendingBrands",
        verifySellerBrandByAdmin: server+"/admin/verifySellerBrandByAdmin",

 


        



}

export default Api;


//,,,,,,,,,,,,,,