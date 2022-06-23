import React, { useEffect, useState } from 'react';
import "./userList.css"
import { collection, getDocs } from 'firebase/firestore';
import {db} from "../../../firebase-config/firebaseConfig";
function UserList() {

  const[userList, setUserList] = useState ([]);
  const userCollectionRef = collection(db, "registered");

  //retrieving data from firestore
  useEffect(() =>{
    const getUsers = async()=>{
      const data = await getDocs(userCollectionRef)
      setUserList (data.docs.map((doc) =>({
        ...doc.data(), id: doc.id
      })))
    }

    getUsers();
  }, [])

  
  return (
       <div>
         <h2 className='users-list'> Registered Users</h2>
        <div className='user-details'> 
          <div className='data-header'>
           
            <table >
              <tr>
              <th > Full Name</th> 
              <th > Category</th>     
                </tr>

                {userList.map( val => (

                <tr>
                <td key = {val.email} className = "data"> {val.fullname} </td>
                <td className='data'>   {val.category} </td>
                  </tr>
                  ))}
            
            </table>
            
            </div>        
     </div >
     </div>
       
  )
}

export default UserList