import React, { useContext, useEffect } from "react";
import { ContestantContext } from "../../../component/ContextFile/ContestantContext";
import "./approved.css";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function ApprovedContestant() {
    const {approvedContestUsestate, contestApprovedHook, getApprovedContestants} = useContext(ContestantContext);
   
    const responsive = {
      superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
      }
    };
  
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
