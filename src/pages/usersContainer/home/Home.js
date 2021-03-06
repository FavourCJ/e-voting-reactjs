import React, { useState } from 'react'
import Header from "../../../component/header/Header"
import PopUpMessage from "../../../component/popUpMessage/PopUpMessage"
import Timer from "../../adminContainer/timerUser/Timer"
import ApprovedContestant from "../../adminContainer/approvedContestant/ApprovedContestant";
import { withRouter} from "react-router-dom"
import "./home.css";

function Home() {

    const [popMessage, setPopMessage] = useState (false);
      
  return (
    
            <div> 
               <Header/>
               <div className='content-block'>          
             <div>                
             <h2 className='content-h2'> Welcome to E-voting Portal </h2>
                <p className='content-p'> Designed and developed by <span className='by-me'>Favour Chapp-Jumbo</span></p>
                <p className='p-date'> Voting will be closed on the 31st of December 2022</p>
             </div>

             <div className='timer-container'> 
               <Timer/>
                </div>
             <div className='contestant-form'>
              <p className='contest'> If Would you love to contest <a href='/contest' target = "_self"className='contest-link'> ClicK Here</a></p> 
             </div>

             <div className='contestant-list'>
                  
             <ApprovedContestant/>

                   {popMessage && <PopUpMessage setPopMessage={setPopMessage} closeMessage = {setPopMessage}/>}
                 </div>    
               </div>
               
               </div>
        
  )
}

export default withRouter(Home)
