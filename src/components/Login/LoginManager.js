import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
export const initializeLoginFramework = () => {
  if(firebase.apps.length===0){
    firebase.initializeApp(firebaseConfig);
  }
}

export const handleGoogleSignIn = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(googleProvider)
    
 

    .then((result) => {
      const { displayName, photoURL, email } = result.user;

      const signedInUser = {
        isSignedIn: true,
        name: displayName,
        email: email,
        photo: photoURL,
        success: true
      }
      return signedInUser;
    //   console.log(displayName, email, photoURL);
    })
    .catch((error) => {
      console.log(error);
      console.log(error.message);
    });
  // console.log('Sign in clicked');
}

// export const handleFacebookSignIn = () => {
//   const facebookProvider = new firebase.auth.FacebookAuthProvider();
//   return firebase
//     .auth()
//     .signInWithPopup(facebookProvider)
//     .then((result) => {
//       var token = result.credential.accessToken;
//       var user = result.user;
//       user.success = true;
//       return user;
//       // console.log("facebook user after signed in", user);
//     })
//     .catch((error) => {
//       //  Handle Errors here.
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // The email of the user's account used.
//       const email = error.email;
//       //  The firebase.auth.AuthCredential type that was used.
//       const credential = error.credential;
//     });
// }

  export const handleSignOut = () => {
  return firebase
    .auth()
    .signOut()
    .then((res) => {
      const signedOutUser = {
        isSignedIn: false,
        name: "",
        email: "",
        photo: "",
        error: "",
        success: false,
      }
      return signedOutUser;
      // console.log('Signout Clicked');
    })
    .catch((error) => {});
}

export const createUserWithEmailAndPassword = (name,email,password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email,password)
    .then((userCredential) => {
      const user = userCredential.user;
    })
    .then((response) => {
      const newUserInfo = response.user;
      newUserInfo.error = "";
      newUserInfo.success = true;
      // setUser(newUserInfo);
      updateUserName(name);
      return newUserInfo;
      // console.log(response)
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      return newUserInfo;
      // setUser(newUserInfo);
    });
}

export const signInWithEmailAndPassword = (email,password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email,password)
    .then((response) => {
      const newUserInfo = response.user;
      newUserInfo.error = "";
      newUserInfo.success = true;
   return newUserInfo;
      // console.log(" Signed in user info", response.user);
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      newUserInfo.success = false;
     return newUserInfo;
    });
}

const updateUserName = (name) => {
  const user = firebase.auth().currentUser;

  user
    .updateProfile({
      displayName: name,
    })
    .then(() => {
      console.log("user name updated succefully");
    })
    .catch((error) => {
      console.log(error);
    });
}
