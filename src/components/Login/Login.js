import React, { useContext, useState } from "react";

import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";
import { createUserWithEmailAndPassword, handleFacebookSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFramework, signInWithEmailAndPassword } from "./LoginManager";

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: "",
    email: "",
    photo: "",
    password: ""
    
  });
  initializeLoginFramework();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const history = useHistory();
  const location = useLocation();
  let { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () =>{
    handleGoogleSignIn()
    .then(response=> {
      handleResponse(response,true);
    })
  }

// const facebookSignIn = () =>{
//   handleFacebookSignIn()
//   .then(response=> {
//     handleResponse(response,true);
//   })
// }

  const signOut = () =>{
    handleSignOut()
    .then(response=>{
     handleResponse(response,false);
    })
  }

  const handleResponse = (response,redirect) =>{
    setUser(response);
      setLoggedInUser(response);
    if(redirect){
      history.replace(from);
    }
  }
  const handleBlur = (event) => {
    let isFieldValid = true;

    // console.log(event.target.name,event.target.value);
    if (event.target.name === "email") {
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
      // console.log(isEmailValid)
    }
    if (event.target.name === "password") {
      const isPasswordValid = event.target.value.length > 6;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  };
  const handleSubmit = (event) => {
    // console.log(user.email, user.password);
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name,user.email,user.password)
      .then(response => {
        handleResponse(response,true);

      })
    }
    if (!newUser && user.email && user.password) {
signInWithEmailAndPassword(user.email,user.password)
.then(response => {
  handleResponse(response,true);
})
    }

    event.preventDefault();
  };

  return (
    <div className="App">
      {user.isSignedIn ? (
        <button onClick={signOut}>Sign out</button>
      ) : (
        <button onClick={googleSignIn}>Sign in</button>
      )}
      <br />
      {/* <button onClick={facebookSignIn}>Sign in using Facebook</button> */}
      {user.isSignedIn && (
        <div>
          <p>Welcome, {user.name}</p>
          <p>Your email:{user.email}</p>
          <img src={user.photo} alt=""></img>
        </div>
      )}
      <h1> Our own Authentication system</h1>
      <input
        type="checkbox"
        onChange={() => setNewUser(!newUser)}
        name="newUser"
        id=""
      />
      <label htmlFor="newUser">New User Sign Up</label>

      <form onSubmit={handleSubmit}>
        {newUser && (
          <input
            name="name"
            type="text"
            onBlur={handleBlur}
            placeholder="Your name"
          />
        )}
        <br />
        <input
          type="text"
          name="email"
          onBlur={handleBlur}
          placeholder="Your email address"
          required
        />
        <br />
        <input
          type="password"
          name="password"
          onBlur={handleBlur}
          placeholder="Your Password"
          required
        />
        <br />
        <input type="submit" value={newUser ? "Sign up" : "Sign"} />
      </form>
      <p style={{ color: "red" }}>{user.error}</p>
      {user.success && (
        <p style={{ color: "green", fontWeight: "bold" }}>
          User {newUser ? "Created " : "Logged In "}Successfully
        </p>
      )}
    </div>
  );
}
export default Login;
