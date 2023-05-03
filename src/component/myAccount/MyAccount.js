import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import "./account.css";
import { ContestantContext } from '../ContextFile/ContestantContext';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase-config/firebaseConfig';

function MyAccount() {

  const {getCurrentUserData, userDetails, currentRegUser, getAuthUsers, logout} = useContext(ContestantContext);
   const [isAdmin, setIsAdmin] = useState(false);
   const [appDetails, setAppDetails ] = useState([]);
   const [notHere, setNotHere] = useState(false)

   const displayDetails = async() =>{
    const specificData = query(collection(db, "approvedContestants"), where ("uid", "==", currentRegUser.uid));
    const querySnapshot = await getDocs(specificData);
  querySnapshot.forEach((doc) => {
    if(doc.data().uid === currentRegUser.uid){
      setAppDetails(doc.data()); 
    }else {
      setNotHere(true);
    }
   
  });  
}

const checkCurrentUserCategory = async()=>{
  if (userDetails.category === "admin"){
    setIsAdmin(true);
  }else if (userDetails.category === "voter"){
    setIsAdmin(false);
    displayDetails()    
 }

   }

  useEffect(() =>{   
   
    getCurrentUserData();
    getAuthUsers(); 
     checkCurrentUserCategory();
     displayDetails();
  },[currentRegUser])

    let history = useHistory();

    
  return (
    <div className='my-account-application-container'>
      
      <div className='user-detail-container'> 

        <div className='form-application'>
          <div className='myacount-form-container'>
          <h1 className='account-info'> Account Info</h1> 
          <div>

          <div className='label-input-div'>
        <label className='account-label'> First Name</label>
         <p className='input-txt-name'>{userDetails.firstname}</p>
        </div>

        <div className='label-input-div'>
        <label className='account-label'> Last Name</label>
         <p className='input-txt-name'>{userDetails.lastname}</p>
        </div>

        <div className='label-input-div'>
        <label className='account-label'> Email </label>
        <p className='input-txt-email'>{userDetails.email}</p>
         </div>

      <div className='label-input-div'>
        <label className='account-label'> Category</label>
        <p className='input-txt-category'>{userDetails.category}</p>
      </div>       
      
      <div className='logout'>
        <button className='Logout' onClick={()=>{
          logout();
          history.push ("/login");
        }}> Log out</button>
      </div>   
          </div>
    
      </div>
  
      </div>
    </div> 

    <div className='my-account-application-section'>
    {isAdmin ? "" : 
            <>
            <div>
              <h2 className='my-account-application-header'>My approved application</h2>
              {notHere ? <p className='do-not-have-application'>You do not have any approved application</p> : 
               <>
                <div className='label-input-div'>
              <label className='my-account-application-label'> First Name</label>
              <p className='my-account-application-txt-fname'>{appDetails.firstname}</p>
            </div> 

            <div className='label-input-div'>
              <label className='my-account-application-label'> Last Name</label>
              <p className='my-account-application-txt-lname'>{appDetails.lastname}</p>
            </div> 

            <div className='label-input-div'>
              <label className='my-account-application-label'> Office</label>
              <p className='my-account-application-txt-office'>{appDetails.Office}</p>
            </div> 

            <div className='label-input-div'>
              <label className='my-account-application-label'> Political Party</label>
              <p className='my-account-application-txt-party'>{appDetails.politicalparty}</p>
            </div> 

            <div className='label-input-div'>
              <label className='my-account-application-label'> Points</label>
              <p className='my-account-application-txt-points'>{appDetails.points}</p>
            </div> 
               </>
              }
              
              
            </div>
            </>
            
            }  
    </div>
    </div> 

  )
}

export default MyAccount

 

