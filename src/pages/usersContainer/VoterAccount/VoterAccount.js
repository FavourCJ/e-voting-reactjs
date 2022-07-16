import React, { useContext, useEffect, useState } from 'react'
import MyAccount from '../../../component/myAccount/MyAccount'
import { collection, getDocs, query, where} from 'firebase/firestore';
import { ContestantContext } from '../../../component/ContextFile/ContestantContext';
import { db } from '../../../firebase-config/firebaseConfig';
import Footer from '../../../component/footer/Footer';
import Header from '../../../component/header/Header';
//using /account.css

function VoterAccount() {

    const [ userApplication, setUserApplication] = useState([]);
    const {getCurrentUserData, getAuthUsers, currentRegUser} = useContext(ContestantContext);

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
        getAuthUsers();  
      },[getAuthUsers])

      
  return (
    <div>
      <Header/>
      <div>
          <h1 className='profile-header'> Your Profile </h1>
        </div>

      <div className='voter-account-content'>    
      <MyAccount/>

      <div className='application-data-container'>
      <h1 className='my-application'> My Application</h1> 
        {userApplication.map( (val, key ) => (
            <div key={key} className = "application-details"> 

            <div className='user-info-container'>
            <label className='user-info-label'> Name</label>
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
            <label className='user-info-label'>Office</label>
            <p className='user-info-input'> {val.Office}</p>
            </div>

            <div className='user-info-container'>
            <label className='user-info-label'> Party</label>
            <p className='user-info-input'> {val.politicalparty}</p>
            </div>
            </div>
            
              ))}
      </div>

      </div>  
      <div className='account-footer'>
    <Footer/>
    </div>
    </div>
  )
}

export default VoterAccount