import React, { useState, useEffect, useCallback, useRef } from 'react'
import "./contestant.css";
import { Grid,Paper } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import {validateContestant} from "./ValidateContestant";
import {auth, db} from "../../../firebase-config/firebaseConfig";
import {collection, getDocs, query, where, setDoc, doc} from "firebase/firestore"
import { onAuthStateChanged } from 'firebase/auth';

function ContestantForm() {

  const [userDetails, setUserDetails] = useState([]);
  const [currentRegUser, setCurrentRegUser] = useState ({});
  const [ userExist, setUserExist] = useState();
  const [alreadyApplied, setAlreadyApplied] = useState();
  const paperStyle={marginTop:100, height:'90vh auto',width:600, margin:"20px auto"};
  
  const [contestValue, setContestValue] = useState ({
    name: "",
    surname: "",
    email: "",
    passportNumber: "",
    party: "",
    politicalOffice:"",
  });

  const [correctData, setCorrectData] = useState (false);
  const [contestError, setContestError] = useState ({});
  const [success, setSuccess] = useState(false);
  let history = useHistory();
  const contestCollectionRef = collection(db, "contestants");
  const inputRef = useRef(null);
  
  onAuthStateChanged (auth, (currentUser) =>{
    setCurrentRegUser(currentUser);
  })

  //retrieving current user details from registered db collection
  const getCurrentUserData = async()=>{
    const specificData = query(collection(db, "registered"), where("uid", "==", currentRegUser.uid));
      const querySnapshot = await getDocs(specificData);
    querySnapshot.forEach((doc) => {
      setUserDetails(doc.data()); 
    }); 
  }

  //Inserting data to firestore
  const addContestant = useCallback(async() =>{  
     //Insert data to database once there are no more errors
    if (Object.keys(contestError).length === 0 && correctData){ 
    //grabbing contestant collection db
    const contestantCollection = query(collection(db, "contestants"));
    const queryContestantSnapshot = await getDocs(contestantCollection);
    queryContestantSnapshot.forEach( async (doc) => {
      if (doc.data().email == currentRegUser.email){
        setUserExist(true);
        setAlreadyApplied("User can only apply to one position")
      }
      else if (doc.data().email != currentRegUser.email){
        setUserExist(false);
      }
    })

    if(userExist == true){
      setAlreadyApplied("User can only apply to one position");
    }
    else if( userExist == false){
        //using current user's id to set contestant application
      await setDoc( doc(contestCollectionRef, userDetails.uid), {
        name: contestValue.name,
        surname: contestValue.surname,
        email: userDetails.email,
        passportNumber: userDetails.passportNum,
        politicalparty: contestValue.party,
        Office: contestValue.politicalOffice,
        uid: userDetails.uid,
        points: 0,
  
    }).then(() =>{
      setSuccess(true);
      setTimeout(() =>{
          history.push("/home")
      }, 3000)  
    })}}});

    useEffect(()=>{
      getCurrentUserData();
    })

//handling submit
  const handleSubmit = (e) =>{
    e.preventDefault();
    setContestError(validateContestant(contestValue));
    setCorrectData (true);
     addContestant();
     //this.props.setContestants(this.state)
     
  }

 useEffect (() => {
  inputRef.current.focus();

  },[]);
 
  return (

    <Grid>
    <Paper elevation={10} style={paperStyle}>
    <div className='contest-container'>

         <form className='form-input' onSubmit={handleSubmit}>      
        <h2 className='contest-header'> Contestant Form</h2>
        <div className='input-container'>
        <label className='contest-label' > Name </label>
        <input 
          className='contest-input'
          name = "name"
          value ={contestValue.name}
          onChange = {(e) =>{
            setContestValue({...contestValue, name: e.target.value})
          }}
          ref={inputRef}
          />
        </div>
        {contestError.name && <p className='error'> {contestError.name}</p>}
         
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

        {contestError.surname && <p className='error'> {contestError.surname}</p>}
          
       <div>
       <label className='contest-label'> Email </label>
        <p 
          className='contest-input-disable'
          name='email'
          > {userDetails.email} </p>
          {alreadyApplied ? <p className='auth-error'>{alreadyApplied}</p> : <p> </p>}
       </div>

        <div>
        <label className='contest-label'> Passport Number</label>
        <p 
          className='contest-input-disable'
          name='passportNumber'
          >
            {userDetails.passportNum}
            </p>
            {alreadyApplied ? <p className='auth-error'>{alreadyApplied}</p> : <p> </p>}
        </div>
         
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
        {contestError.party && <p className='error'> {contestError.party}</p>}   
      
        <div>

        <label className='contest-label'> Political Office</label>

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
        </div>
        {contestError.politicalOffice && <p className='error'> {contestError.politicalOffice}</p>}   
        {success ? <p className='form-success'>Form has been submitted successfully. Create an Admin account and approve or delete your application</p> : <p> </p>}
           {alreadyApplied ? <button className='contest-applied' disabled = {true}> Already Applied</button> : <button className='contest-btn' > Submit</button> }
      </form>
    </div>
    </Paper>
    </Grid>
    
  )
}

export default ContestantForm