import React, { useContext, useEffect } from "react";
import { ContestantContext } from "../../../component/ContextFile/ContestantContext";
import "./approved.css";
import 'react-multi-carousel/lib/styles.css';
import { useHistory } from "react-router-dom";

function ApprovedContestant() {
    const {approvedContestUsestate, getApprovedContestants, vote} = useContext(ContestantContext);
    let history = useHistory()

    const voteFunc = async(val)=>{
      if(localStorage.getItem("category") == "Admin"){
        history.push("/unauthorised");
      }else {
        vote(val);
      }
     
    }
  
    useEffect(()=>{
      getApprovedContestants();
    },[])
    
  return (
    <div>   
       <h2 className='users-list'> Contestants</h2>
       <div className='contestant-list-buttons'>
       </div>
     
      <div>
      {approvedContestUsestate.map( (val, key ) => (       
        <div className="approve-data-list-container" key ={key}>  
        <div className='display-approved-contestant'>             
        <div className='approve-photo-container'>
        <img src='./profile.png' alt = "male avatar" className='photo'/>
        </div>  
        <p  className = "approve-data" > Name: <span className="approve-data-span"> {val.firstname} </span> </p>
          <p  className = "approve-data" > Surname: <span className="approve-data-span"> {val.lastname} </span> </p>
          <p  className = "approve-data" > Political Office:<span className="approve-data-span"> {val.Office} </span> </p>
          <p className = "approve-data" >  Political Party: <span className="approve-data-span"> {val.politicalparty} </span> </p>
          <p className = "approve-data" >  Votes: <span className="approve-data-span"> {val.points} </span> </p>
      <div className="approve-btn-container">
      <button
          className='vote'
          onClick={()=>{voteFunc(val)}}
          > Vote</button>
          </div>
        </div> 
        </div>  
            ))}
      </div>
      
         
      </div>
 
  )
}

export default ApprovedContestant;
