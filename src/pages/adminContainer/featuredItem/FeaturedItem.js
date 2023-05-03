import React, { useContext, useEffect, useState } from 'react'
import ChartPage from '../chart/Chart';
import "./featuredItem.css";
import {userData} from "../chart/dummyData"
import { ContestantContext } from '../../../component/ContextFile/ContestantContext';

function FeaturedItem() {
  
    const {getRegisteredUsers, geContestants, contestList, 
           registerList, approvedContestUsestate, 
           getApprovedContestants, getAdmin, adminList,
           currentRegUser,
        } = useContext(ContestantContext)
   
    useEffect(() =>{
          getRegisteredUsers();
          geContestants();
          getApprovedContestants()
          getAdmin();
          
      }, [currentRegUser])    

  return (
    <div className='featuredItem-container'>
       
        <div className='contestant-user'>
        <div className='total-users'>
        <p className='user-text'> {registerList.length} </p> 
        <p className='user-text'> Registered User(s) </p>
        </div>

        <div className='total-contestants'>  
            <p className='user-text'> {approvedContestUsestate.length}</p>
            <p className='user-text'> Approved Contestant(s)</p>  
        </div>
       
        <div className='total-contestants'>  
            <p className='user-text'> {contestList.length}</p>
            <p className='user-text'> Applied Contestant(s)</p>  
        </div>

        </div>

        <div className='chart-admin'>
            <ChartPage data={userData} title="User Analytics" grid dataKey="Active User"/>
        </div>

        <div className='featured-item-admin-list'>
            <h2>Admin List</h2>
            <table className='featuredItem-admin-table'>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
            </tr>
            {adminList.map((val)=>{
                return(
                    <tr key={val.id}>
                <td>{val.firstname}</td>
                <td>{val.lastname}</td>
                <td>{val.email}</td>
            </tr>
                )
            })}
            </table>
        
        </div>
       
    </div>
  )
}

export default FeaturedItem