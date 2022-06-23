import React, { useEffect, useState } from 'react'
import ChartPage from '../chart/Chart';
import "./featuredItem.css";
import {userData} from "../chart/dummyData"
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase-config/firebaseConfig';

function FeaturedItem() {
    
    const[registerList, setRegisterList] = useState ([]);
    const[contestList, setContestList] = useState ([]);


    const registerCollectionRef = collection(db, "registered");
    const contestCollectionRef = collection(db, "contestants");

    useEffect(() =>{
        const getRegisteredUsers = async()=>{
          const data = await getDocs(registerCollectionRef)
          setRegisterList (data.docs.map((doc) =>({
            ...doc.data(), id: doc.id
          })))
        }

        const geContestants = async()=>{
            const data = await getDocs(contestCollectionRef)
            setContestList (data.docs.map((doc) =>({
              ...doc.data(), id: doc.id
            })))
          }

          getRegisteredUsers();
          geContestants();
      }, [])

      const registerLength = registerList.map(( val, key)  => 
    ( <p key = {val.uid} className='user-text'> </p>
    ))  

  return (
    <div className='featuredItem-container'>
       
        <div className='contestant-user'>
        <div className='total-users'>
        <p className='user-text'> { registerLength.length} </p> 
        <p className='user-text'> Registered Users </p>
        </div>
       
        <div className='total-contestants'>  
            <p className='user-text'> {contestList.length}</p>
            <p className='user-text'> Contestants Applied</p>  
        </div>

        </div>

        <div className='chart-admin'>
            <ChartPage data={userData} title="User Analytics" grid dataKey="Active User"/>
        </div>

        <div>
        
        </div>
       
    </div>
  )
}

export default FeaturedItem