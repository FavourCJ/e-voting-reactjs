import React, { useState } from 'react';
import {Validate} from './Validate';
import { useHistory } from 'react-router-dom';
import {db} from "../../firebase-config/firebaseConfig";
import {doc, setDoc} from "firebase/firestore"
import {createUserWithEmailAndPassword} from "firebase/auth"
import {auth} from "../../firebase-config/firebaseConfig"
import  "./register.css";

const RegForm = () => {
 
  const [values, setValues] = useState ({
    firstname: "",
    lastname: "",
    email: "",
    passportNum: "",
    password: "",
    category: ""
  });
  
  const [error, setError] = useState({});
  const [correctData, setCorrectData] = useState (false);
  const [redirect, setRedirect] = useState(false);
  const [userExist, setUserExist] = useState (false);
  const [loadData, setLoadData] = useState (false);
   
  //const registerCollectionRef = collection(db, "registered");
  let history = useHistory();

  //checking if passport number in the database matches with user's input
  const registerAuth = async() =>{
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth, 
        values.email,
        values.password,  
        )
   //Giving the same user id in auth to that of firestore database
      await setDoc(doc(db, 'registered', user.uid), {
        email: user.email,
        uid: user.uid,
        firstname: values.firstname,
        lastname: values.lastname,
        category:values.category,
      }).then(() =>{
       setLoadData(true);
       setRedirect(true);    
      }).then(()=>{
        if (values.category === "voter")
      {
        localStorage.setItem("category", "Voter");
        history.push("/");
      }else if (values.category === "admin") {
        localStorage.setItem("category", "Admin");
        history.push("/");
      }  
      }).then(()=>{
        window.location.reload(false);
      })
                    
    } catch (err) {
      if (err.code == "auth/email-already-in-use"){
        setUserExist("Email is already in use. Please enter another email");
   }  
    }
  }
 
//handling submit
  const handleSubmit = (e) =>{
    e.preventDefault();
    setError(Validate(values));
    setCorrectData (true);
    //Insert data to database once there are no more errors
    if (Object.keys(error).length === 0 && correctData){ 
      registerAuth();
    }
     
  }
 
  return (
    <div>
      
    <div className='register-container'>
      <div className='left-container'>
        <div className='left-text'>
          <span>{loadData ? <span className='reg-txt'> Redirecting... <div className="loader"> </div></span> : <span> Register</span>}</span>
        </div>
        <img src='/vote.svg' alt='vote' className='vote-img'/>
      </div>
      <div className='form-container'>
      <form className='form' onSubmit={handleSubmit}>
        <label className='label'> First Name  <span className='required'> *</span></label>
        <input 
          className='input'
          name='fname'
          type= "text"
          value={values.firstname}
          onChange = { e=> {
            setValues ({...values, firstname: e.target.value})
          }}
          />   
          {error.firstname && <p className='error'> {error.firstname}</p>}

          <label className='label'> Last Name  <span className='required'> *</span></label>
        <input 
          className='input'
          name='fullname'
          type= "text"
          value={values.lastname}
          onChange = { e=> {
            setValues ({...values, lastname: e.target.value})
          }}
          />   
          {error.lastname && <p className='error'> {error.lastname}</p>}
        
        <label  className='label'> Email <span className='required'> *</span> </label>
          <input 
            className='input'
            name='email'
            type= "text"
            value={values.email}
            onChange ={ e=>{
              setValues ({...values, email: e.target.value})
            }}/>
            {error.email && <p className='error'> {error.email}</p>}
            {userExist ? <p className='auth-error'>{userExist}</p> : <p> </p>}
     
          <label className='label'> Password<span className='required'> *</span> </label>
          <input 
        className='input' 
        type= "password"
        name='password'
        value={values.password}
        onChange = {e => {
          setValues ({...values, password: e.target.value})
        }}    
        />
        {error.password && <p className='error'> {error.password}</p>}
        
          <label className='label'> Category<span className='required'> *</span> </label>
           
          <div className='radio'>
          <input
          type= "radio"
          name='radio'
          value= "voter"
          checked={values.category === 'voter'}
          onChange = { e=>{
            setValues ({...values, category: e.target.value})
          }}
          /> <span className='voter'> Voter</span>
          
         <input
          type= "radio"
          name='radio'
          value = "admin"
          checked={values.category === 'admin'}
          onChange = { e=>{
            setValues ({...values, category: e.target.value})
          }}
          />Admin
          
          </div>
          <br/>
          {error.category && <p className='error'> {error.category}</p>} 
         
          <div className='form-button-container'>
          <button className='form-button' disabled={redirect}> 
         {loadData ? <span className='reg-txt'> Redirecting... <div className="reg-loader"> </div></span> : <span> Register</span>}
           </button>
          </div>
          <p className='form-button-p'>Already have an account? <a className='login-link' href='/login'> Login</a></p>
      </form>
      </div>
      </div>
    </div>
  )
}

export default RegForm