import React, { useState, useEffect, useCallback, useRef, useContext } from 'react'
import "./contestant.css";
import { Grid,Paper } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import {validateContestant} from "./ValidateContestant";
import {db} from "../../../firebase-config/firebaseConfig";
import {collection, getDocs, query, setDoc, doc} from "firebase/firestore"
import { ContestantContext } from '../../../component/ContextFile/ContestantContext';

function ContestantForm() {

  const {currentRegUser, userDetails, getCurrentUserData, getAuthUsers, userAlreadyApplied} = useContext(ContestantContext);
  const [ userExist, setUserExist] = useState();
  const [alreadyApplied, setAlreadyApplied] = useState();
  const paperStyle={marginTop:100, height:'90vh auto',width:600, margin:"20px auto"};
  const getContestSuccess = localStorage.getItem("contest-success");
  const [contestValue, setContestValue] = useState ({
    name: "",
    surname: "",
    email: "",
    party: "",
    politicalOffice:"",
  });

  const [correctData, setCorrectData] = useState (false);
  const [contestError, setContestError] = useState ({});
  const [success, setSuccess] = useState(false);
  let history = useHistory();
  const contestCollectionRef = collection(db, "contestants");
  const inputRef = useRef(null);

  //Inserting data to firestore
  const addContestant = async() =>{    
        //using current user's id to set contestant application
      await setDoc( doc(contestCollectionRef, userDetails.uid), {
        name: contestValue.name,
        surname: contestValue.surname,
        email: userDetails.email,
        politicalparty: contestValue.party,
        Office: contestValue.politicalOffice,
        uid: userDetails.uid,
        points: 0,
  
    }).then(() =>{
      setSuccess(true);
      setTimeout(() =>{
        history.push("/home")
    }, 3000);
    })  
  }

    useEffect(()=>{
      getCurrentUserData();
      getAuthUsers();
      userAlreadyApplied();
    }, [getAuthUsers])

//handling submit
  const handleSubmit = (e) =>{
    e.preventDefault();
    setContestError(validateContestant(contestValue));
    setCorrectData (true);
     //Insert data to database once there are no more errors
    if (Object.keys(contestError).length === 0 && correctData)
    {
     addContestant();
    }
  }
 
  return (

    <Grid>
    <Paper elevation={10} style={paperStyle}>
    <div className='contest-container'>

         <form className='form-input' onSubmit={handleSubmit}>      
        <h2 className='contest-header'> Contestant Form</h2>
        <div className='input-container'>
        <label className='contest-label' > Name </label>
        {
          getContestSuccess === "true" ?  
          <input 
          id = "disable-inputs"
          className='contest-input'
          disabled = {true}
          name = "name"
          value ={contestValue.name}
          onChange = {(e) =>{
            setContestValue({...contestValue, name: e.target.value})
          }}
          ref={inputRef}
          />
          :
          <input 
          className='contest-input'
          name = "name"
          value ={contestValue.name}
          onChange = {(e) =>{
            setContestValue({...contestValue, name: e.target.value})
          }}
          ref={inputRef}
          />
        }
       
        </div>
        {contestError.name && <p className='error'> {contestError.name}</p>}

        {
          getContestSuccess === "true" ? 
          <div>
          <label className='contest-label'> Surname </label>
  
          <input 
            disabled = {true}
            id = "disable-inputs"
            className='contest-input'
            name='surname'
            value={contestValue.surname}
            onChange = { (e) =>{
              setContestValue({...contestValue, surname: e.target.value})
            }}/>
          </div>
          :
          <div>
          <label className='contest-label'> Surname </label>
  
          <input 
            className='contest-input'
            name='surname'
            value={contestValue.surname}
            onChange = { (e) =>{
              setContestValue({...contestValue, surname: e.target.value})
            }}/>
          </div>
         }

        {contestError.surname && <p className='error'> {contestError.surname}</p>}
          
       <div>
       <label className='contest-label'> Email </label>
        <p 
          className='contest-input-disable'
          name='email'
          > {userDetails.email} </p>
          {alreadyApplied ? <p className='auth-error'>{alreadyApplied}</p> : <p> </p>}
       </div>
        
         
        {
          getContestSuccess === "true" ?  

          <div>
        <label className='contest-label'> Political Party </label>
        <input 
          className='contest-input'
          disabled = {true}
          id = "disable-inputs"
          name='party'
          value={contestValue.party}
          onChange ={(e)=>{
            setContestValue({...contestValue, party: e.target.value})
          }}/>
        </div>

          :
          <div>
        <label className='contest-label'> Political Party </label>
        <input 
          className='contest-input'
          name='party'
          value={contestValue.party}
          onChange ={(e)=>{
            setContestValue({...contestValue, party: e.target.value})
          }}/>
        </div>
       
        }
         {contestError.party && <p className='error'> {contestError.party}</p>}   
   
        <div>

        <label className='contest-label'> Political Office</label>

        {
          getContestSuccess === "true" ? 

          <select 
          disabled = {true}
          id = "disable-inputs"
          name="office" 
          className="select-office"
          onChange = {(e) =>{
            setContestValue ({...contestValue, politicalOffice: e.target.value})
          }}
          >
            <option hidden
             >Please select a political office</option> 

            <option 
              value="Attorney General"
              >Attorney General
              </option>

              <option 
              value= "Governor"
              > Governor
              </option>

              <option 
              value= "Lieutenant Governor"
              >Lieutenant Governor
              </option>

              <option 
              value="State Senators"
             >State Senators
              </option> 

              <option 
              value="State Supreme Court Justices"
             >State Supreme Court Justices
              </option>  

              <option 
              value="President"
             >President
              </option>         
      </select>
          
          :

          <select 
          name="office" 
          className="select-office"
          onChange = {(e) =>{
            setContestValue ({...contestValue, politicalOffice: e.target.value})
          }}
          >
            <option hidden
             >Please select a political office</option> 

            <option 
              value="Attorney General"
              >Attorney General
              </option>

              <option 
              value= "Governor"
              > Governor
              </option>

              <option 
              value= "Lieutenant Governor"
              >Lieutenant Governor
              </option>

              <option 
              value="State Senators"
             >State Senators
              </option> 

              <option 
              value="State Supreme Court Justices"
             >State Supreme Court Justices
              </option>  

              <option 
              value="President"
             >President
              </option>         
      </select>
        
        }
     
        </div>
        {contestError.politicalOffice && <p className='error'> {contestError.politicalOffice}</p>}   
        {success ? 
        <>
         <p className='form-success'>
          Form has been submitted successfully. </p> 
          <p className='form-success'>Create an Admin account and approve or delete your application</p>
         
        </>
           : ""}
           

           {getContestSuccess === "true" 
           ? <button className='contest-applied' disabled = {true}> Already Applied</button> 
            :  <button className='contest-btn' > Submit</button> }
           
      </form>
    </div>
    </Paper>
    </Grid>
    
  )
}

export default ContestantForm