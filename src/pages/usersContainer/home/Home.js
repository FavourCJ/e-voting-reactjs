import React, { useState } from 'react'
import Header from "../../../component/header/Header"
import PopUpMessage from "../../../component/popUpMessage/PopUpMessage"
import Timer from "../../adminContainer/timerUser/Timer"
import { withRouter} from "react-router-dom"
import "./home.css";
import VoterApprovesContestant from '../voterApprovedContestant/VoterApprovesContestant';
import Footer from "../../../component/footer/Footer"

function Home() {

    const [popMessage, setPopMessage] = useState (false);
      
  return (
    
            <div> 
               <Header/>
               <div className='content-block'>          
             <div>                
             <h2 className='content-h2'> Welcome to E-voting Portal </h2>
                <p className='content-p'> Designed and developed by <span className='by-me'>Favour Chapp-Jumbo</span></p>
                <p className='p-date'> Voting will be closed on the 31st of December 2023</p>
             </div>

             <div className='timer-container'> 
               <Timer/>
                </div>
             <div className='contestant-form'>
              <p className='contest'> If Would you love to contest <a href='/contest' target = "_self"className='contest-link'> ClicK Here</a></p> 
             </div>  
               </div>
               <div className='contestant-list'>       
                  <VoterApprovesContestant/>
     
                        {popMessage && <PopUpMessage setPopMessage={setPopMessage} closeMessage = {setPopMessage}/>}
                      </div>  

                      <Footer/> 
                    
               </div>
        
  )
}

export default withRouter(Home)
