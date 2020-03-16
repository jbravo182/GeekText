import React, { useState, useRef, useEffect} from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Grid, Col, Spinner} from "react-bootstrap";
import EditNickname from "./EditNickname";
import EditPersonalInfo from "../profilemanagement/EditPersonalInfo";
import EditShippingAddresses from "./EditShippingAddresses";
import EditCreditCards from "./EditCreditCards";
import API from "../../utils/API";

function EditProfileComponent(props) {
    const [nickname, setNickname] = useState("");
    const [email, setEmail] = useState(props.userEmail);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [homeAddress, setHomeAddress] = useState("");
    const [renderChildren, setRenderChildren] = useState(false);

    useEffect(() => {
        API.getUser({ email: email }).then(res => {
            setNickname(res.data.nickname);
            setFirstName(res.data.firstName);
            setLastName(res.data.lastName);
            setHomeAddress(res.data.homeAddress);
            setRenderChildren(true);
        })
    }, []);


    function setPersonalInfo(newFirstName, newLastName, newEmail, newHomeAddress){
        setFirstName(newFirstName);
        setLastName(newLastName);
        setEmail(newEmail);
        setHomeAddress(newHomeAddress);
    
        alert("Personal Information Updated!")
    }

    function newNicknameHandle(newNickname){
        setNickname(newNickname);

        alert("Nickname Updated!");
    }


    function getUserDetails(){
        return {
            nickname: nickname,
            email: email,
            firstName: firstName,
            lastName: lastName,
            homeAddress: homeAddress
        };
    }

    return (
        <React.Fragment>
            <Container style={{ paddingTop: "20px" }}>
            {renderChildren ?
                    <React.Fragment>
                        <EditNickname nickname={nickname} email={email} onNicknameUpdate={newNicknameHandle} />
                        <EditPersonalInfo firstName={firstName} lastName={lastName} email={email} homeAddress={homeAddress} onNewPersonalInfo={setPersonalInfo} />
                        <EditShippingAddresses email={email} />
                        <EditCreditCards email={email}/>
                    </React.Fragment>
                    : <Spinner animation="border" variant="primary" />}
            </Container>
        </React.Fragment>
    )
}

export default EditProfileComponent;