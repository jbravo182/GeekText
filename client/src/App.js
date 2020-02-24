import React, { useState } from "react";
import CreateAccountForm from './components/profilemanagement/CreateAccountForm';
import EditProfileComponent from "./components/profilemanagement/EditProfileComponent";
import NavibarComponent from "./components/NavibarComponent";

function App() {

  const[currPage, setCurrPage] = useState(null);
  const[userDetails, setUserDetails] = useState(null);
  const pages = {EDIT_PROFILE: 1};


  return (
    <React.Fragment>
      <NavibarComponent onNewPage={setCurrPage} onLogout={setUserDetails} onLoginSuccessful={setUserDetails}/>
      {userDetails === null ? <CreateAccountForm/> : null}
      {userDetails !== null && currPage === pages.EDIT_PROFILE ? <EditProfileComponent/> : null}
    </React.Fragment>
  );
}

export default App;
