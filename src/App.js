import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Admin from "./pages/adminContainer/admin/Admin"
import MyAccount from "./component/myAccount/MyAccount"
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
import VoterAccount from "./pages/usersContainer/VoterAccount/VoterAccount";
import AdminAccount from "./pages/adminContainer/AdminAccount/AdminAccount";
import { auth } from "./firebase-config/firebaseConfig";

function App() {
  const getUserCategory = window.localStorage.getItem("category");

  const checkUserAuth = ()=>{
    if (!auth){
      window.localStorage.setItem('category', "no-user");
    }
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
          <AdminUnauthorisedRoute path= "/my-voter-profile" component = {VoterAccount}/>
        
        
          //User with voter role or category are not authorized to access these pages
          <VoterUnauthorisedRoute path= "/analytics" component = {Analytics}/>      
          <VoterUnauthorisedRoute path="/user" component = {UserList}/>    
          <VoterUnauthorisedRoute path= "/contestants" component = {ContestantsList}/>
          <VoterUnauthorisedRoute path= "/my-admin-account" component = {AdminAccount}/>

          <VoterUnauthorisedRoute path = "/approved" component = {ApprovedContestant}/>
          <PrivateRoute path = "/unauthorised" component = {UnAuthorized}/>
          

           </Switch>
    </Router>
    
  );
}

export default App;
