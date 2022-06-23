import React from "react";
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
import Home from "./pages/usersContainer/home/Home";
import ApprovedContestant from "./pages/approvedContestant/ApprovedContestant";

function App() {
  
  return (

    <Router>
      <Switch>
        <Route exact path="/">
          <RegForm/>
          </Route>
          <Route path="/login">
            <LoginForm/>
          </Route>
          <Route path="/admin">
            <Admin/>
          </Route>
          <Route path="/myAccount">
            <MyAccount />
          </Route>
          <Route path="/user">
            <UserList/>
          </Route>
          <Route path="/home">
            <Home/>
          </Route>
          <Route path= "/contest">
            <ContestantForm/>
          </Route>
          <Route path= "/analytics">
            <Analytics/>
          </Route>
          <Route path= "/login">
            <LoginForm/>
          </Route>
          <Route path= "/contestants">
            <ContestantsList/>
          </Route>
          <Route path = "/approved">
            <ApprovedContestant/>
          </Route>
           </Switch>
    </Router>
    
  );
}

export default App;
