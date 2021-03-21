//class for Auth related activity
//1. isLoggedIn
//2. signup
//3 logout
//get userid
//get userData
import firebase from "firebase/app";

import { firebaseConfig } from "./firebaseConfigs";
import "firebase/auth";
firebase.initializeApp(firebaseConfig);

class AuthService{


   
    static isLoggedIn(){
        return !!firebase.auth().currentUser;
      } 

    

      static getUserData(){
  
        var photoURL =  firebase.auth().currentUser.photoURL
        var name =  firebase.auth().currentUser.displayName;
      
        return {"profileImage":photoURL,
                 "name":name};
      }


      //function for signing in
    static signIn(){
        console.log("Signin called")
    // Sign into Firebase using popup auth & Google as the identity provider.
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(()=> {
      firebase.auth().signInWithPopup(provider).catch(c => {
          console.log("error in signing in")
      })
    }) 
    
}

static signOut(){
    console.log("signing out")
     // Sign out of Firebase.
     firebase.auth().signOut();
  }
}

export default AuthService;


