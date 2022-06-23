import React, { useCallback, useEffect, useContext } from "react";
import { collection, deleteDoc, doc } from 'firebase/firestore';
import {ApprovedUserContext} from "../../ContextFile/ApprovedContestantContext";
import { useHistory } from "react-router-dom";
import { db } from "../../../firebase-config/firebaseConfig";

function ContestantsList() {
    const {contestList, getContestants, checkboxHandleChange, selectedData} = useContext(ApprovedUserContext);
    const contestCollectionRef = collection(db, "contestants"); 
    const history = useHistory();
    
     //delete contestants
     const deleteContestant =  useCallback (async() =>{  
      selectedData.checkedData.map(async(val) =>{
       const deleteProductDocs = doc (contestCollectionRef, val.id);
        await deleteDoc (deleteProductDocs)
       })  
       window.location.reload(false);   
  });
   
     //retrieving data from firestore
    useEffect(() =>{
      getContestants();
    });

  return (
    <div>   
       <h2 className='users-list'> List Of Contestants</h2>
       <div className='contestant-list-buttons'>
         
         <button 
              className = "contest-approve-button"
              //onClick={approve.bind(this)}
              onClick={() =>{history.push("/approved")}}           
              > Approve
              </button> 

              <span>
              <button className='contest-cancel-button' onClick={() =>{
                deleteContestant ()
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
        <th > Surname</th>
        <th > Political Office</th>
        <th > Political Party</th>    
          </tr>

          {contestList.map( (val, key ) => (
            
          <tr key ={key}>
            <td>
              <input 
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

            </tbody>
      </table>
      </div>
</div>

<div>
  
        <label>Checked: </label> {JSON.stringify(selectedData)}
      </div>
</div>
 
  )
}

export default ContestantsList;
