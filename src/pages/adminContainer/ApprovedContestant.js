import React, { useContext } from "react";
import { ApprovedUserContext } from "../ContextFile/ApprovedContestantContext";

function ApprovedContestant() {
    const {selectedData} = useContext(ApprovedUserContext);
      //retrieving data from firestore

  return (
    <div>   
       <h2 className='users-list'> List Of Contestants</h2>
       <div className='contestant-list-buttons'>
       </div>
     
       <div>

       <div className='contestant-display'>
                  
                  <div className='photo-container'>
                  <img src='./profile.png' alt = "male avatar" className='photo'/>
                  </div>  
                <button
                    className='vote'
                    > Vote</button>

                   </div>    
       {selectedData.checkedData.map( (val, key ) => (     
            <div key ={key}>
                
            <td  className = "data" > {val.name} </td>
            <td  className = "data" > {val.surname} </td>
            <td  className = "data" >   {val.Office} </td>
            <td className = "data" >   {val.politicalparty} </td>
              </div>
              ))}
       </div>
</div>
 
  )
}

export default ApprovedContestant;
