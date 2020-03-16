import React, { useState, useEffect } from 'react';
import { Button, Col, Form } from "react-bootstrap";
import CreditCardsList from "./CreditCardsList"


function EditCreditCards(props) {
    const [userEmail, setUserEmail] = useState(props.email);
    
    return (
        <div className="card">
            <div className="card-header">
                <b>Edit Credit Cards</b>
            </div>
            <CreditCardsList email={userEmail}/>
        </div>
    );
}

export default EditCreditCards;