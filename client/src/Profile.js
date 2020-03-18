import React, { useState } from "react";
import EditProfileComponent from "./components/profilemanagement/EditProfileComponent";
import NavibarComponent from "./components/NavibarComponent";
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import Auth from "./utils/AuthService"
import PrivateRoute from "./components/PrivateRoute";

function Profile() {

  const[userDetails, setUserDetails] = useState(null);
  

  function setUserDetailsHandle(user){
    setUserDetails(user);    
  }

  return (
    <Router>
      <NavibarComponent/>
      <PrivateRoute path="/editProfile" component={() => <EditProfileComponent userEmail={Auth.getProfile().username}/>}/>
    </Router>
  );
}

export default Profile;
