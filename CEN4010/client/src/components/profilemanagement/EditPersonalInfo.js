import React, { useState } from 'react';
import API from '../../utils/API';






//Edit ALL (first and second name)
function EditALL(props) {
    const [userEmail, setUserEmail] = useState(props.email);
    const [officialUserEmail, setOfficialUserEmail] = useState(props.email);
    const [userFirstName, setUserFirstName] = useState(props.firstName);
    const [userLastName, setUserLastName] = useState(props.lastName);
    const [userHomeAddress, setUserHomeAddress] = useState(props.homeAddress);

    function updateFirstName(event) {
        setUserFirstName(event.target.value);
    }

    function updateLastName(event) {
        setUserLastName(event.target.value);
    }

    function updateHomeAddress(event) {
        setUserHomeAddress(event.target.value);
    }

    function updateUserEmail(event) {
        setUserEmail(event.target.value);
    }

    function submitALL(event) {
        event.preventDefault();
        if (userEmail !== officialUserEmail) {
            const newUserEmailUpdate = { primaryKeys: { email: officialUserEmail }, updates: { $set: { "email": userEmail } } };
            API.updateUserEmail(newUserEmailUpdate).then(() => {
                setOfficialUserEmail(newUserEmailUpdate.updates.$set.email);

                const newPersonalInfo = {
                    primaryKeys: { email: newUserEmailUpdate.updates.$set.email },
                    updates: {
                        $set: {
                            "firstName": userFirstName,
                            "lastName": userLastName,
                            "email": userEmail,
                            "homeAddress": userHomeAddress
                        }
                    }
                };

                API.updateUser(newPersonalInfo)
                    .then(() => props.onNewPersonalInfo(
                        newPersonalInfo.updates.$set.firstName,
                        newPersonalInfo.updates.$set.lastName,
                        newPersonalInfo.updates.$set.homeAddress))
                    .catch(err => alert("Error updating personal info: " + err));
            }).catch(err => alert("Error updating email: " + err));
        } else {
            const newPersonalInfo = {
                primaryKeys: { email: officialUserEmail },
                updates: {
                    $set: {
                        "firstName": userFirstName,
                        "lastName": userLastName,
                        "homeAddress": userHomeAddress
                    }
                }
            };

            API.updateUser(newPersonalInfo)
                .then(() => props.onNewPersonalInfo(
                    newPersonalInfo.updates.$set.firstName,
                    newPersonalInfo.updates.$set.lastName,
                    newPersonalInfo.updates.$set.email,
                    newPersonalInfo.updates.$set.homeAddress))
                .catch(err => alert(err));
        }
    }

    function alphaCheck(event) {
        let alphaNum = /^[^0-9*|/,#-%.?!":<>[\]{}`\\()';@^&~+_=$]+$/;
        if (!alphaNum.test(event.key)) {
            event.preventDefault();
        }
    }


    return(
        <div className="card">
            <div className="card-header">
                <b>Edit Personal Information</b>
            </div>
            <div className="card-body">
                <form onSubmit={submitALL}>
                    <div className="form-row">
                        <div className="form-group col">
                            <label htmlFor="userFirstName">First Name:</label>
                            <input id="userFirstName" className="form-control" type="text" placeholder="" value={userFirstName} onKeyPress={alphaCheck} onChange={updateFirstName} />
                        </div>
                        <div className="form-group col">
                            <label htmlFor="userLastName">Last Name:</label>
                            <input id="userLastName" className="form-control" type="text" placeholder="" value={userLastName} onKeyPress={alphaCheck} onChange={updateLastName} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="userEmail">Email:</label>
                        <input id="userEmail" className="form-control" type="email" placeholder="" value={userEmail} onChange={updateUserEmail} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="userAddress">Address:</label>
                        <input id="userAddress" className="form-control" type="text" placeholder=" " value={userHomeAddress} onChange={updateHomeAddress} />
                    </div>
    
    
                    <button className="btn btn-primary float-right" type="submit">Save Changes</button>
                </form>
            </div>
        </div>
    );
}



export default EditALL;