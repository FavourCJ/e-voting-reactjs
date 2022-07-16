import React, { useContext, useEffect } from 'react';
import "./userList.css"
import { ContestantContext } from '../../../component/ContextFile/ContestantContext';
import Header from "../../../component/header/Header"
import Sidebar from "../../../component/sidebar/Sidebar"

function UserList() {

  const {getRegisteredUsers, registerList} = useContext(ContestantContext)
  
  //retrieving data from firestore
  useEffect(() =>{
    getRegisteredUsers();
  }, [])
 
  return (
       <div>
        <Header/>
        <div className='sidebar-content'>
          <Sidebar/>
          <div className='content'>
          <h2 className='users-list'> Registered Users</h2>
        <div className='user-details'> 
          <div className='data-header'>
           
            <table >
              <tr>
              <th > First Name</th> 
              <th > Last Name</th> 
              <th > Category</th>     
                </tr>

                {registerList.map( (val, key) => (

                <tr key={key}>
                <td className = "data"> {val.firstname} </td>
                <td className = "data"> {val.lastname} </td>
                <td className='data'>   {val.category} </td>
                  </tr>
                  ))}
            
            </table>
            
            </div>        
          </div >
          </div>
        </div>
         
     </div>
       
  )
}

export default UserList