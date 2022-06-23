import React, { useCallback, useState } from 'react';
import {Validate} from './Validate';
import { useHistory } from 'react-router-dom';
import {db} from "../../firebase-config/firebaseConfig";
import {collection, doc, getDocs, query, setDoc} from "firebase/firestore"
import {createUserWithEmailAndPassword} from "firebase/auth"
import {auth} from "../../firebase-config/firebaseConfig"
import  "./register.css";

const RegForm = () => {
  const [values, setValues] = useState ({
    fullname: "",
    email: "",
    passportNum: "",
    password: "",
    category: ""
  });

  const [error, setError] = useState({});
  const [correctData, setCorrectData] = useState (false);
  const [userExist, setUserExist] = useState(false);
  const [passportNumExist, setPassportNumExist] = useState();
  const [redirect, setRedirect] = useState(false);
  
  //const registerCollectionRef = collection(db, "registered");
  let history = useHistory();

  //checking if passport number in the database matches with user's input
  const registerAuth = useCallback( async() =>{
  const registeredCollection = query(collection(db, "registered"));
  const querySnapshot = await getDocs(registeredCollection);
  querySnapshot.forEach( async (doc) => {
    //if it matches, make passportNumExist to true
    if(doc.data().passportNum == values.passportNum){
        setPassportNumExist(true)
   
    }
    else if (doc.data().passportNum != values.passportNum) {
      setPassportNumExist(false) 
     }
  })

  if (passportNumExist == true){
    setPassportNumExist("Passport number is already been used");
    
  }
  //if it does not match, turn passportNumExist to false and add user's input to the database
  else if (passportNumExist == false){
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
        fullname: values.fullname,
        passportNum: values.passportNum,
        category:values.category,
      }).then(() =>{
        console.log("done");
       setRedirect(true);
        navigate();
      })
                    
    } catch (err) {
      if (err.code == "auth/email-already-in-use"){
        setUserExist("Email is already in use. Please enter another email");
        console.log(err)
   }  
    }
  }
})

//Insert data to database once there are no more errors
  const handleAddUser = () =>{
    if (Object.keys(error).length === 0 && correctData){ 
    registerAuth();
  }
  }

//handling submit
  const handleSubmit = (e) =>{
    e.preventDefault();
    setError(Validate(values));
    setCorrectData (true);
     handleAddUser()
     
  }

  //navigating page based on user's category
  const navigate = () =>{
    setTimeout(() =>{
      if (values.category === "voter")
      {
        history.push("/home")
      }else {
        history.push("/admin");
      }
    }, 3000)  
}
 
  return (
    <div className='register-container'>

      <div className='left-container'>
        <div className='left-text'>
          <span>{redirect ? <span className='reg-txt'> Redirecting... <div className="loader"> </div></span> : <span> Register</span>}</span>
        </div>
        <img src='/vote.svg' alt='vote' className='vote-img'/>
      </div>
      <div className='form-container'>
      <form className='form' onSubmit={handleSubmit}>
        <label className='label'> Full Name  <span className='required'> *</span></label>
        <input 
          className='input'
          name='fullname'
          type= "text"
          value={values.fullname}
          onChange = { e=> {
            setValues ({...values, fullname: e.target.value})
          }}
          />   
          {error.fullname && <p className='error'> {error.fullname}</p>}
        
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
     
        <label className='label'> Passport Number<span className='required'> *</span> </label>
        <input
          className='input'
          name='passportNum'
          type= "text"
          value={values.passportNum}
          onChange ={  e=>{
            setValues ({...values, passportNum: e.target.value})
          }}/>
          {error.passportNum && <p className='error'> {error.passportNum}</p>}
          {passportNumExist ? <p className='auth-error'>{passportNumExist}</p> : <p> </p>}
     
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
          <span>{redirect ? <span className='reg-txt'> Redirecting... <div className="reg-loader"> </div></span> : <span> Register</span>}</span>
           </button>     
          </div>
          <p className='form-button-p'>Already have an account? <a className='login-link' href='/login'> Login</a></p>
      </form>

      </div>
     
    </div>
  )
}

export default RegForm