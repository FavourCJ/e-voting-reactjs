import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth, db } from '../../firebase-config/firebaseConfig';
import "../regForm/register.css";
import {validateLogin} from "../regForm/Validate";

function LoginForm() {
 
  const [loginError, setLoginError] = useState ({});
  const [correctData, setCorrectData] = useState (false);
  const [loggedUser, setLoggedUser] = useState([]);
  const [loggedUserDetails, setLoggedUserDetails] = useState ({});
  const [authError, setAuthError] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [loginValues, setLoginValues] = useState ({
    loginEmail: "",
    loginPassword: "",
  });

  //Getting current user
  onAuthStateChanged (auth, (currentUser) =>{
    setLoggedUser(currentUser);
  })

  //Navigating current user based on their category (admin or voter)
  const navigateLoggedUser = async() =>{
    const specificData = query(collection(db, "registered"), where("uid", "==", auth.currentUser.uid));
    const querySnapshot = await getDocs(specificData);
    querySnapshot.forEach((doc) => {
      setLoggedUserDetails(doc.data()); 
      console.log(doc.data().category)
      setTimeout(() =>{
        if (doc.data().category == "voter"){
          history.push("/home");
        }else if(doc.data().category == "admin"){
          history.push("/admin")
        } 
      }, 2000)
        
    }); 
  }

  // Navigating user to their account, based on user's input
  const logInWithEmailAndPassword = async () => {
    try {
     const user = await signInWithEmailAndPassword(
        auth, 
        loginValues.loginEmail, 
        loginValues.loginPassword
        ).then (() =>{
          //calling logged user's navigation function
          setRedirect(true);
            navigateLoggedUser();             
        })   
    } catch (err) {
      if(err.code === "auth/wrong-password"){
          setAuthError("Wrong combination")
      }else if(err.code === "auth/too-many-requests"){
         setAuthError("Access to this account has been temporarily disable due to too many failed login attempts. Please try again later")
      }else if(err.code === "auth/user-not-found"){
          setAuthError("User not found")
      }
  }
  };

  let history = useHistory ();

  useEffect (() => {
    if (Object.keys(loginError).length === 0 && correctData)
    {     
      logInWithEmailAndPassword();
     
    }

  }, [loginError]);

  const handleSubmit =(e)=>{
    e.preventDefault();
    setLoginError( validateLogin(loginValues));
    setCorrectData (true);
    setAuthError(true)
  }

  return (
    <div className='login-container'>
     
      <div>
      <div className='left-text'>
          Login 
        </div> 
      <img src='/vote.svg' alt='vote picture' className='vote-img'/>
      </div>
      <div className='form-container'>
      <form className='form' onSubmit={handleSubmit}>
       
        <label  className='label'> Email </label>
          <input 
            className='input'
            name='Email'
            type= "text"
            values = {loginValues.loginEmail}
            onChange={(e)=>{
              setLoginValues ({...loginValues, loginEmail: e.target.value})
            }}
           />
            {loginError.loginEmail && <p className='error'> {loginError.loginEmail}</p>}
          
          <label className='label'> Password</label>
          <div className='password-show'>
            <input 
              className='input' 
              type= "Password"
              name='Password'
              values = {loginValues.loginPassword}
              onChange={(e)=>{
              setLoginValues ({...loginValues, loginPassword: e.target.value})
            }}
          />
          {loginError.loginPassword && <p className='error'> {loginError.loginPassword}</p>} 
              
          </div>

          <p className='error'> </p>
          {authError ? <p className='auth-error'>{authError}</p> : <p> </p>}
          <div className='form-button-container'> 
          <button className='form-button' disabled={redirect}> 
          <span>{redirect ? <span className='reg-txt'> Redirecting... <div className="reg-loader"> </div></span> : <span> Register</span>}</span>
           </button>     
          </div>
          <p className='form-button-p'>Do not have an account? <a href='/' className='login-link'> Register</a></p>
          
      </form>

     

      </div>
    </div>
  )
}

export default LoginForm