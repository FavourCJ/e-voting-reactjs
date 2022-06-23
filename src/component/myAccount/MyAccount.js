import React, { useEffect, useState } from 'react';
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { useHistory } from 'react-router-dom';
import { auth, db } from '../../firebase-config/firebaseConfig';
import { onAuthStateChanged, signOut,} from 'firebase/auth';
import "./account.css";
import { collection, getDocs, query, where} from 'firebase/firestore';

function MyAccount() {

  const [userDetails, setUserDetails] = useState([]);
  const [currentRegUser, setCurrentRegUser] = useState ({});
  const [ userApplication, setUserApplication] = useState([]);
 
  onAuthStateChanged (auth, (currentUser) =>{
    setCurrentRegUser(currentUser);
  })

  const getCurrentUserData = async()=>{
    const specificData = query(collection(db, "registered"), where("uid", "==", currentRegUser.uid));
      const querySnapshot = await getDocs(specificData);
    querySnapshot.forEach((doc) => {
      setUserDetails(doc.data()); 
    });   
  }

  const getUserApplication = async() =>{
    const specificData = query(collection(db, "contestants"), where("uid", "==", currentRegUser.uid));
    const querySnapshotData = await getDocs(specificData);
    setUserApplication (querySnapshotData.docs.map((doc) =>({
      ...doc.data(), id: doc.id
    })))
  }
   
  useEffect(() =>{   
    getCurrentUserData();
    getUserApplication();  
  })

    let history = useHistory();
    const logout = () =>{
      signOut(auth).then(() =>{
        history.push ("/login")
      })
    }
 
  return (
    <div>
      <Header/>
      <div>
          <h1 className='profile-header'> Your Profile </h1>
        </div>
      <div className='user-detail-container'>        
        <div className='form-application'>
          <div className='myacount-form-container'>
          <h1 className='account-info'> Account Info</h1> 
          <div>
          <div className='label-input-div'>
        <label className='account-label'> Full Name</label>
         <p className='input-txt-name'>{userDetails.fullname}</p>
        </div>

        <div className='label-input-div'>
        <label className='account-label'> Email </label>
        <p className='input-txt-email'>{userDetails.email}</p>
         </div>

         <div className='label-input-div'>
        <label className='account-label'> Passport Number</label>
      <p className='input-txt-passNum'>{userDetails.passportNum}</p>
      </div>

      <div className='label-input-div'>
        <label className='account-label'> Category</label>
        <p className='input-txt-category'>{userDetails.category}</p>
      </div>       
      
      <div className='logout'>
        <button className='Logout' onClick={logout}> Log out</button>
      </div>   
          </div>
    
      </div>
      <div className='application-data-container'>
      <h1 className='my-application'> My Application</h1> 
        {userApplication.map( (val, key ) => (
            <div key={key} className = "application-details"> 

            <div className='user-info-container'>
            <label className='user-info-label'>First Name</label>
            <p className='user-info-input'> {val.name}</p>
            </div>

            <div className='user-info-container'>
            <label className='user-info-label'>Surname </label>
            <p className='user-info-input'> {val.surname}</p>
            </div>

            <div className='user-info-container'>
            <label className='user-info-label'>Point(s)</label>
            <p className='user-info-input'> {val.points}</p>
            </div>

            <div className='user-info-container'>
            <label className='user-info-label'>Political Office</label>
            <p className='user-info-input'> {val.Office}</p>
            </div>

            <div className='user-info-container'>
            <label className='user-info-label'>Political Party</label>
            <p className='user-info-input'> {val.politicalparty}</p>
            </div>
            </div>
            
              ))}
      </div>
      </div>
    </div>
    <div className='account-footer'>
    <Footer/>
    </div>   
    </div> 

  )
}

export default MyAccount

 

