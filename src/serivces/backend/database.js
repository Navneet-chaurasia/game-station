//this class will connnect to mmongoDB database
import * as Realm from "realm-web";

const app = new Realm.App({ id: "game-station-lynuk" });

var  mongodb;

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
        console.log("Adding users")
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
}


export default DB;