import React, { useState } from 'react'
import Header from "../../../component/header/Header"
import Timer from "../../../component/timer/SetTimer"
import PopUpMessage from "../../../component/popUpMessage/PopUpMessage"
import "./home.css";
import {useLocation} from 'react-router-dom';

function Home({name}) {
   const location = useLocation();
   const checkLocationData = location.approveData;

    const [popMessage, setPopMessage] = useState (false);
    //const handleApprovedData = () => setSelectedData(setTestingState);

    // useEffect(() =>{
    //   setSelectedData(location.approveData);
    //   console.log(selectedData)
    //  // setTestingState("hello")
    //   console.log(handleApprovedData)
    // })
    
  return (
    
            <div> 
               <Header/>
               <div className='content-block'>          
             <div>                
             <h2 className='content-h2'> Welcome to E-voting Portal </h2>
                <p className='content-p'> Designed and developed by <span className='by-me'>Favour Chapp-Jumbo</span></p>
                <p className='p-date'> Voting will be closed on the 31st of December</p>
             </div>

             <div className='timer-container'> 
               Timer will be here
                </div>
             <div className='contestant-form'>
              <p className='contest'> If Would you love to contest <a href='/contest' target = "_self"className='contest-link'> ClicK Here</a></p> 
             </div>

             <p className='contestant-header'> Contestants</p>
               

             <div className='contestant-list'>

                 <div className='contestant-display'>
                  
                     <div className='photo-container'>
                     <img src='./profile.png' alt = "male avatar" className='photo'/>
                     </div>  
                   <button
                       className='vote'
                       > Vote</button>


                       <button onClick={ () =>{
                           setPopMessage (true);
                       }}> message </button>

                   {popMessage && <PopUpMessage setPopMessage={setPopMessage} closeMessage = {setPopMessage}/>}
                 </div>    
               </div>
               </div>
               </div>
            
        
  )
}

export default Home
