//this class will connnect to mmongoDB database
import * as Realm from "realm-web";

import UserData from "serivces/globalData/globalUserData";

const app = new Realm.App({ id: "game-station-lynuk" });

 let mongodb;

const credentials = Realm.Credentials.anonymous();
try {
   app.logIn(credentials).then(()=>{
    mongodb = app.currentUser.mongoClient("mongodb-atlas");
    });
    
   
  } catch (err) {
    console.error("Failed to log in", err.message);
  }


  //connecting to mongoDB Database

class DB {


    //this will add user into mongoDB database => userData collection
    static addUser( user){
     
     const userData = mongodb.db("gameStationDatabase").collection("userData");

//insert data into db
       userData.insertOne({
         _id:user.uid,
         "name":user.displayName,
         "email":user.email,
         "phone":user.phoneNumber,
         "profilePicture":user.photoURL
     }).catch((e)=>{
         console.log("error in inserting data");
         
     })
    }


    /**
     * this will return user data
     * 1. name
     * 2. email
     * 3. profilePicture
     */
    static async getUserData(){


      //if not logged in then return
      if(!UserData.isLoggedIn)
          return;


      //first get the userid from UserData class
     const uid = UserData.userid;

     try {
     return app.logIn(credentials).then(async ()=>{
       mongodb = app.currentUser.mongoClient("mongodb-atlas");

            
     const userData = mongodb.db("gameStationDatabase").collection("userData");

     return  await userData.findOne({'_id' : uid}).catch((e)=>{
       console.log("error in inserting data");
       
   });
       });
   
      
     } catch (err) {
       console.error("Failed to log in", err.message);
     }
   
    }

}


export default DB;