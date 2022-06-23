import React, { useContext, useEffect, useState } from "react";
import { ApprovedUserContext } from "../ContextFile/ApprovedContestantContext";
import "./approved.css";

function ApprovedContestant() {
    const {selectedData} = useContext(ApprovedUserContext);
    const [name, setName] = useState("");
  
  return (
    <div>   
       <h2 className='users-list'> Approved Contestants</h2>
       <div className='contestant-list-buttons'>
       </div>
     
       <div>
       {selectedData.checkedData.map( (val, key ) => (       
         <div className="approve-data-list-container" key ={key}>  
         <div className='display-approved-contestant'>             
         <div className='approve-photo-container'>
         <img src='./profile.png' alt = "male avatar" className='photo'/>
         </div>  
         <p  className = "approve-data" > Name: <span className="approve-data-span"> {val.name} </span> </p>
            <p  className = "approve-data" > Surname: <span className="approve-data-span"> {val.surname} </span> </p>
            <p  className = "approve-data" > Political Office:<span className="approve-data-span"> {val.office} </span> </p>
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
       <label>Name</label>
       <input value={name}
          onChange = { e=> {
            setName ( e.target.value)
          }}/>
          {name}
</div>
 
  )
}

export default ApprovedContestant;
