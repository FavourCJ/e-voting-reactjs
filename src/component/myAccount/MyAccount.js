import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import "./account.css";
import { ContestantContext } from '../ContextFile/ContestantContext';

function MyAccount() {

  const {getCurrentUserData, userDetails, getAuthUsers, logout} = useContext(ContestantContext);
   
  useEffect(() =>{   
    getCurrentUserData();
    getAuthUsers();  
  },[getAuthUsers])

    let history = useHistory();
    
  return (
    <div>
      
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
    </div> 

  )
}

export default MyAccount

 

