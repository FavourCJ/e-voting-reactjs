import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import { LoadingOutlined } from '@ant-design/icons';
import { ContestantContext } from '../../../component/ContextFile/ContestantContext';
//approved.css file

function VoterApprovesContestant() {

    const { vote, approvedContestUsestate, getApprovedContestants, loadingData} = useContext(ContestantContext);
    const getVoteStatus = window.localStorage.getItem("vote-button"); 
    let history = useHistory();

    const getMyVotes = ()=>{
      
      const parsedArr = JSON.parse(getVoteStatus);
      // parsedArr.map((val) =>{

      // })
      //console.log(parsedArr)
         
    }
   
    const voteFunc = async(val)=>{
        if(localStorage.getItem("category") === "no-user"){
          history.push("/login");
        }else {
          vote(val);
        }
       
      }

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
          breakpoint: { max: 600, min: 0 },
          items: 2
        },

        phoneMobile: {
          breakpoint: { max: 550, min: 0 },
          items: 1
        }
      };

      useEffect(()=>{
        getApprovedContestants();
        getMyVotes()
      },[])

  return (
    <div>
        <Carousel responsive={responsive}>
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
      
      
        {getVoteStatus === "true"?
        <div className="approve-btn-container">
          <button
         
          className='vote'
          onClick={()=>{voteFunc(val)}}
          > Vote</button>
          </div>
          :
          <div className="approve-btn-container">
          <button
          className='vote'
          onClick={()=>{voteFunc(val)}}
          > Vote</button>
          </div>
      }
      
        </div> 
        </div>  
            ))}
        </Carousel>

    </div>
  )
}

export default VoterApprovesContestant