// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  version: "1.0.2",
  production: false,
  base_url: "http://ec2-35-169-81-57.compute-1.amazonaws.com/nailadmin/",
  apiUrl:"https://nailrewards.com/webservice/index.php/api/V_1/",
  google_map_api_key:"AIzaSyBLey8ESni-1AM0QuerNuawFP51Lot8xXg",
  authorization:"Basic YWRtaW46MTIzNDU2",
  contentType:"application/json",
  apiEndPoints:{
    login:"storeAuth/storeLogin",
    getStoreDetials:"storeAuth/getStoreDetials",
    getCustomerDetials:"storeAuth/getCustomerDetials",
    addReward:"storeAuth/addPointTransaction",
    forgetPasswordUsingEmailOTP:"storeAuth/forgetPasswordUsingEmailOTP",
    verifyPasswordOTP:"storeAuth/verifyPasswordOTP",
    resetPasswordUsingEmailOTP:"storeAuth/resetPasswordUsingEmailOTP",
    homePage:"store/homePage",
    isLoggedIn:"store/isLoggedIn",
    storePinUpdate:"store/storepinUpdate",
    addStoreNews:"store/addStoreNews",
    updateStoreNews:"store/updateStoreNews",
    getStoreNews:"store/getStoreNews",
    deleteStoreNews:"store/deleteStoreNews",
    getOneStoreNews:"store/getOneStoreNews",
    getStoreRewards:"store/getStoreRewards",
    updateUserProfile:"store/updateUserProfile",
    changePassword:"store/changePassword",
    addStoreRewards:"store/addStoreRewards",
    getOneStoreReward:"store/getOneStoreReward",
    updateStoreRewards:"store/updateStoreRewards",
    deleteStoreReward:"store/deleteStoreReward",
    updateStoreHours:"store/updateStoreHours",
    uploadStoreLogo:"store/uploadStoreLogo",
    uploadStoreMenu:"store/uploadStoreMenu",
    updateRewardSettings:"store/updateRewardSettings",
    updateAppearanceSettings:"store/updateAppearanceSettings",
    customerList:"store/customerList",
    globleCustomerList:"store/globleCustomerList",
    customerDetail:"store/customerDetail",
    redeemReward:"store/redeemReward",
    redeemstoreAuthReward:"storeAuth/redeemReward",

    customerTransaction:"store/customerTransaction",
    updateStoreInformation:"store/updateStoreInformation",
    updateSocialLinks:"store/updateSocialLinks",
    sendNotification:"store/sendNotification",
    templateFilesForPanels:"store/templateFilesForPanels",
    autoNotificationList:"store/autoNotificationList",
    deleteAutoNotificaiton:"store/deleteAutoNotificaiton",
    autoNotification:"store/autoNotification",
    storeAverageRating:"store/storeAverageRating",
    getRecentRating:"store/getRecentRating",
    
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
