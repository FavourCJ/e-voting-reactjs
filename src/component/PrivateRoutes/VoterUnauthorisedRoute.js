import { Redirect, Route, useLocation } from 'react-router-dom';

function VoterUnauthorisedRoute({...rest }) {
 //const isLoggedIn = localStorage.getItem('loggedUser')

 let location = useLocation();
 if (localStorage.getItem('category') === "Voter"){
   return <Redirect to = "/unauthorised" state = {{ from: location}} replace/>
 }
 if (localStorage.getItem('category') === "no-user"){
  return <Redirect to = "/login" state = {{ from: location}} replace/>
}

 return (
   <Route {...rest}/>
 )

 
}

export default VoterUnauthorisedRoute