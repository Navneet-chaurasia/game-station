/**
 * 
 * 
 * 
 * This file contains class UserData, it has some static fields once initialized remains same throughout the session
 * user data such as
 * 1. name
 * 2. profile picture
 * 3. userid
 * 4. login status
 */

import DB from "serivces/backend/database";

class UserData{
    static username = null;
    static profilePic = null;
    static isLoggedIn = false;
    static userid = null;
    static email = null;

    /**
     * this will initialize static fields of this class
     * @param  user 
     * 
     */
    static async initializeUserData(user){
      
        UserData.userid = user.uid
        UserData.isLoggedIn = true;
        
       const userDataFromDB = await DB.getUserData( );

       

        UserData.profilePic =  userDataFromDB.profilePicture;
        UserData.username =userDataFromDB.name;
        UserData.email = userDataFromDB.email;
    }
}

export default UserData;