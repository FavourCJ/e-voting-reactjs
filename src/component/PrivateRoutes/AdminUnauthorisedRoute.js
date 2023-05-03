import { Redirect, Route } from "react-router-dom";
import {useLocation} from "react-router-dom";

function AdminUnauthorisedRoute({...rest }) {
  //const isLoggedIn = localStorage.getItem('loggedUser')
  
  let location = useLocation();
  
  if (localStorage.getItem('category') === "Admin"){
    return <Redirect to = "/unauthorised" state = {{ from: location}} replace/>
  }

  if (localStorage.getItem('category') === "no-user"){
    return <Redirect to = "/login" state = {{ from: location}} replace/>
  }

  return (
    <Route {...rest}/>
  )

}

export default AdminUnauthorisedRoute