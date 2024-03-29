import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import "./account.css";
import { ContestantContext } from '../ContextFile/ContestantContext';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase-config/firebaseConfig';
import Header from '../header/Header';
import Footer from "../footer/Footer"

function MyAccount() {

  const {getCurrentUserData, userDetails, currentRegUser, getAuthUsers, logout} = useContext(ContestantContext);
   const [isAdmin, setIsAdmin] = useState(false);
   const [appDetails, setAppDetails ] = useState([]);
   const [notHere, setNotHere] = useState(false);
   const getUserCategory = window.localStorage.getItem("category");

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
  if (getUserCategory === "Admin"){
    setIsAdmin(true);
  }else if (getUserCategory === "Voter"){
    setIsAdmin(false);
    displayDetails();    
 }

   }

  useEffect(() =>{   
   
    getCurrentUserData();
    getAuthUsers(); 
     checkCurrentUserCategory();
     displayDetails();
     console.log(appDetails)
  },[currentRegUser])

    let history = useHistory();

    
  return (
    <div> 
       <Header/>
      
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
    {isAdmin ? "": <>
            <div className='my-account-approve-container'>
              <h2 className='my-account-application-header'>My approved application</h2>
              {notHere ?  <>
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
               </> : <p className='do-not-have-application'>You do not have any approved application</p>
              
              }
              
              
            </div>
            </> 
            
            }  
    </div>
    </div> 
    <Footer/>
    </div>

  )
}

export default MyAccount

 

