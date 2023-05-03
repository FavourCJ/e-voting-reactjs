import React, { useEffect, useContext, useState } from "react";
import {ContestantContext} from "../../../component/ContextFile/ContestantContext";
import { useHistory } from "react-router-dom";
import Header from "../../../component/header/Header";
import Sidebar from "../../../component/sidebar/Sidebar";
import "./contestantList.css"
//userList.css 

function ContestantsList() {
  
    const {contestList, getContestants, 
           checkboxHandleChange,getAuthUsers, 
           setApprovedContestantsFunc, deleteContestant, } = useContext(ContestantContext);
   
    const history = useHistory();
    const [displayMsg, setDisplayMsg] = useState(false)
    
  const checkContestListLength = ()=>{
    if (contestList.length==0){
      setDisplayMsg(true)
    }
  }

     //retrieving data from firestore
    useEffect(() =>{
      getContestants();
      getAuthUsers();
      checkContestListLength();
    },[]);

   
  return (
    <div>   
      <Header/>
      <div className="sidebar-content">
        <Sidebar/>
        <div className="content">
        <h2 className='users-list'> List Of Contestants</h2>
       
       <div className='contestant-list-buttons'>
         
         <button 
              className = "contest-approve-button"
              onClick={
                () =>{
                  setApprovedContestantsFunc();
                  history.push("/approved")
                  }}           
              > Approve
              </button> 

              <span>
              <button className='contest-cancel-button' onClick={() =>{
                deleteContestant ();   
              }}> Delete</button>
              </span>

       </div>
    <div className='user-details'>     
    <div className='data-header'> 
   
      <table >
      <tbody>
        <tr>
          <th className='c'> Select</th>
        <th > First Name</th> 
        <th > Last Name</th>
        <th > Political Office</th>
        <th > Political Party</th>    
          </tr>

          { displayMsg ? 
          <>
          {contestList.map( (val, key ) => (
            
            <tr key ={key} className = "table-data-disable" >
             
              <td>
                <input 
                   className = "checkbox-class"
                   type="checkbox" 
                   name="select" 
                   value={val.id} 
                   onChange={(e) =>{
                    checkboxHandleChange(e, val)
              }}/> </td>
            <td  className = "data" > {val.name} </td>
            <td  className = "data" > {val.surname} </td>
            <td  className = "data" >   {val.Office} </td>
            <td className = "data" >   {val.politicalparty} </td>
              </tr>
              ))}
          </>
          
       : 
          <h2>No new application</h2>
          }

          
            </tbody>
      </table>
      </div>
    </div>
        </div>
      </div>
    
</div>
 
  )
}

export default ContestantsList;
