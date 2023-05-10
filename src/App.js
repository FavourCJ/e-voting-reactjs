import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Admin from "./pages/adminContainer/admin/Admin"
import LoginForm from "./pages/login/LoginForm"
import RegForm from "./pages/regForm/RegForm"
import ContestantForm from "./pages/usersContainer/Contest/ContestantForm"
import UserList from "./pages/adminContainer/usersListContainer/UserList";
import Analytics from "./pages/adminContainer/analytics/Analytics"
import ContestantsList from "./pages/adminContainer/contestantsListContainer/ContestantsList"
import VoterUnauthorisedRoute from "./component/PrivateRoutes/VoterUnauthorisedRoute";
import AdminUnauthorisedRoute from "./component/PrivateRoutes/AdminUnauthorisedRoute";
import ApprovedContestant from "./pages/adminContainer/approvedContestant/ApprovedContestant";
import Home from "./pages/usersContainer/home/Home";
import UnAuthorized from "./component/PrivateRoutes/UnAuthorized";
import PrivateRoute from "./component/PrivateRoutes/PrivateRoute";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase-config/firebaseConfig";
import MyAccount from "./component/myAccount/MyAccount";

function App() {
  const getUserCategory = window.localStorage.getItem("category");
 
  const checkUserAuth = ()=>{
    onAuthStateChanged (auth, (user) =>{
      if (!user){
        window.localStorage.setItem('category', "no-user");
      }
    })
   
  }

  useEffect(()=>{
    checkUserAuth();
   
  },[])

  return (

    <Router>
      <Switch>
      {getUserCategory === "Admin"? 
        <Route exact path= "/">
        <Admin/>
      </Route>
      :
      getUserCategory === "Voter" ?
      <Route exact path= "/">
        <Home/>
      </Route>
     :
     <Route exact path="/">
     <Home/>
   </Route>
  
    }
    
          <Route path="/login">
            <LoginForm/>
          </Route>

          <Route path="/register">
            <RegForm/>
          </Route>
          
          //User with admin role or category are not authorized to access these pages
          <AdminUnauthorisedRoute path= "/contest" component = {ContestantForm}/>
          <AdminUnauthorisedRoute path= "/home" component = {Home}/>
         
        
          //User with voter role or category are not authorized to access these pages
          <VoterUnauthorisedRoute path= "/analytics" component = {Analytics}/>      
          <VoterUnauthorisedRoute path="/user" component = {UserList}/>    
          <VoterUnauthorisedRoute path= "/contestants" component = {ContestantsList}/>
          
          <VoterUnauthorisedRoute path = "/approved" component = {ApprovedContestant}/>
          <PrivateRoute path = "/unauthorised" component = {UnAuthorized}/>
          <PrivateRoute path= "/my-account" component = {MyAccount}/>
          

           </Switch>
    </Router>
    
  );
}

export default App;
