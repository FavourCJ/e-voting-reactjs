import React, { useContext, useEffect, useState } from 'react'
import ChartPage from '../chart/Chart';
import "./featuredItem.css";
import {userData} from "../chart/dummyData"
import { ContestantContext } from '../../../component/ContextFile/ContestantContext';

function FeaturedItem() {
  
    const {getRegisteredUsers, geContestants, contestList, 
           registerList, approvedContestUsestate, getApprovedContestants} = useContext(ContestantContext)
    const [approveCount, setApproveCount] = useState();
    const [constesantCount, setContestantCount] = useState();

    const checkContestantArray=()=>{
        if(approvedContestUsestate){
            setApproveCount(approvedContestUsestate.length);
        }else if (!approvedContestUsestate){
            setApproveCount(0)
        }

        if(contestList){
            setContestantCount(contestList.length);
        }else if (!contestList){
            setContestantCount(0);
        }
    }

    useEffect(() =>{
          getRegisteredUsers();
          geContestants();
          checkContestantArray();
          getApprovedContestants()
          
      }, [getApprovedContestants])    

  return (
    <div className='featuredItem-container'>
       
        <div className='contestant-user'>
        <div className='total-users'>
        <p className='user-text'> {registerList.length} </p> 
        <p className='user-text'> Registered User(s) </p>
        </div>

        <div className='total-contestants'>  
            <p className='user-text'> {approveCount}</p>
            <p className='user-text'> Approved Contestant(s)</p>  
        </div>
       
        <div className='total-contestants'>  
            <p className='user-text'> {constesantCount}</p>
            <p className='user-text'> Applied Contestant(s)</p>  
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