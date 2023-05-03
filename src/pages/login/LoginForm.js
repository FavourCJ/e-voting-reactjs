import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { auth, db } from '../../firebase-config/firebaseConfig';
import "../regForm/register.css";
import {validateLogin} from "../regForm/Validate";
//register.css file

function LoginForm() {
 
  const [loginError, setLoginError] = useState ({});
  const [correctData, setCorrectData] = useState (false);
  const [authError, setAuthError] = useState(false);
  const [redirect, setRedirect] = useState(false);
  const [loadData, setLoadData] = useState (false);
  const [disable, setDisable] = useState(false)
  const [loginValues, setLoginValues] = useState ({
    loginEmail: "",
    loginPassword: "",
  });

  //Navigating current user based on their category (admin or voter)
  const navigateLoggedUser = async() =>{
    const specificData = query(collection(db, "registered"), where("uid", "==", auth.currentUser.uid));
    const querySnapshot = await getDocs(specificData);
    querySnapshot.forEach((doc) => {
      setTimeout(() =>{
        if (doc.data().category == "voter"){
          localStorage.setItem('category',"Voter");
          localStorage.setItem("contest-success", "false");
          history.push("/");
          window.location.reload(false);
        }else if(doc.data().category == "admin"){
          localStorage.setItem('category',"Admin") 
          history.push("/");
          window.location.reload(false);
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
            setLoadData(true);    
                      
        }).then(()=>{
          setTimeout(() =>{
            navigateLoggedUser();   
        }, 3000);
        })
    } catch (err) {
      if(err.code === "auth/wrong-password"){
          setAuthError("Wrong combination");
          setDisable(false)
      }else if(err.code === "auth/too-many-requests"){
         setAuthError("Access to this account has been temporarily disable due to too many failed login attempts. Please try again later")
         setDisable(false)
      }else if(err.code === "auth/user-not-found"){
          setAuthError("User not found")
          setDisable(false)
      }
  }
  };

  let history = useHistory ();

  useEffect (() => {
    if (Object.keys(loginError).length === 0 && correctData)
    {     
      setDisable(true)
      logInWithEmailAndPassword();
     
    }

  }, [loginError]);

  const handleSubmit =(e)=>{
    e.preventDefault();
    setLoginError( validateLogin(loginValues));
    setCorrectData (true);
    setAuthError(true);
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
          {loadData ?  <button className='redirect-btn'>Redirecting
              <span className="spinner-container">
                <p className="loading-spinner">
                </p>
                </span>
                </button> 

                :

                <button 
                 className={ disable ?"disable-sign-up-btn" : 'form-button'  }
                 disabled = {disable}>
                 Submit</button>

            }    
          </div>
          <p className='form-button-p'>Do not have an account? <a href='/register' className='login-link'> Register</a></p>
          
      </form>

      </div>
    </div>
  )
}

export default LoginForm