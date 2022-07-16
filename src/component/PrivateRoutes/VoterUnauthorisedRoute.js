import React from 'react'
import { Redirect, Route, useLocation } from 'react-router-dom';
import { auth } from '../../firebase-config/firebaseConfig';

function VoterUnauthorisedRoute({...rest }) {
 //const isLoggedIn = localStorage.getItem('loggedUser')
 let location = useLocation();
 if (localStorage.getItem('category') === "Voter"){
   return <Redirect to = "/unauthorised" state = {{ from: location}} replace/>
 }
 if (localStorage.getItem('category') === "no-user"){
  return <Redirect to = "/login" state = {{ from: location}} replace/>
}
if (!auth){
  return <Redirect to = "/login" state = {{ from: location}} replace/>
}
 return (
   <Route {...rest}/>
 )
}

export default VoterUnauthorisedRoute