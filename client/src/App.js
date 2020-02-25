import React, { useState } from "react";
import CreateAccountForm from './components/profilemanagement/CreateAccountForm';
import EditProfileComponent from "./components/profilemanagement/EditProfileComponent";
import NavibarComponent from "./components/NavibarComponent";

function App() {

  const[currPage, setCurrPage] = useState(null);
  const[userDetails, setUserDetails] = useState(null);
  const pages = {EDIT_PROFILE: 1};
  const navbar = React.createRef();

  function nameUpdateHandle(newUserDetails){
    navbar.current.updateDisplayName(newUserDetails);

    if(newUserDetails.first_name === userDetails.first_name && newUserDetails.last_name === userDetails.last_name){
      alert("Nickname updated!");
    } else {
      alert("Name updated!");
    }

    setUserDetails(newUserDetails);
  }

  return (
    <React.Fragment>
      <NavibarComponent ref={navbar} onNewPage={setCurrPage} onUserLoginLogout={setUserDetails}/>
      {userDetails === null ? <CreateAccountForm/> : null}
      {userDetails !== null && currPage === pages.EDIT_PROFILE ? 
      <EditProfileComponent userDetails={userDetails} onNameUpdate={nameUpdateHandle} onUserDetailsUpdate={setUserDetails} /> : null}
    </React.Fragment>
  );
}

export default App;
