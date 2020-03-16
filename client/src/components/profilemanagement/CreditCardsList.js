import React, {useState, useEffect} from "react";
import {Card, Col, Button, ListGroup, ButtonGroup, Form} from "react-bootstrap";
import API from "../../utils/API";

function CreditCardsList(props) {
    const [userEmail]  = useState(props.email);
    const [trueCreditCards, setTrueCreditCards] = useState([]);
    const [creditCards, setCreditCards] = useState([]);    
    const [creditCardNumber, setCreditCardNumber] = useState("");
    const [CVV, setCVV] = useState("");
    const [expirationMonth, setExpirationMonth] = useState("January");
    const [expirationYear, setExpirationYear] = useState("");
    const [formCheck, setFormCheck] = useState(false);

    useEffect(() => {
        updateTrueCreditCards();
    }, []);

    useEffect(() => {checkIfEmpty()});

    const months = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

        function checkLength(event) {
            let inString = event.currentTarget.value;
            let inChar = (inString).charCodeAt(inString.length-1);
    
            if (inChar < 48 || inChar > 57) {
                event.currentTarget.value = inString.slice(0, inString.length-1);
            }
    
            if (inString.length > event.currentTarget.maxLength) {
                event.currentTarget.value = inString.slice(0, event.currentTarget.maxLength);
            }
        }
    
        function checkIfEmpty() {
            if (!creditCardNumber || !expirationYear || !CVV) {
                setFormCheck(false);
            }
            else if (creditCardNumber.length < 1 || expirationYear.length < 1 || CVV.length < 1) {
                setFormCheck(false);
            }
            else {
                setFormCheck(true);
            }
        }


    function updateTrueCreditCards() {
        API.getCreditCardsByUser({email: userEmail})
            .then(res => {
                setTrueCreditCards(res.data);
                setCreditCards(res.data);
            })
            .catch(err => console.log(err));
    }

    function updateCreditCardNumber(event) {
        setCreditCardNumber(event.target.value);
    }

    function updateCVV(event) {
        setCVV(event.target.value);
    }

    function updateExpirationMonth(event) {
        setExpirationMonth(event.target.value);
    }

    function updateExpirationYear(event) {
        setExpirationYear(event.target.value);
    }

    function editCreditCardExpMonthHandle(month, index) {
        let newCreditCard = creditCards[index];
        newCreditCard.expirationMonth = month;

        let newCreditCards = creditCards;
        newCreditCards[index] = newCreditCard;
        setCreditCards(newCreditCards);
    }

    function editCreditCardExpYearHandle(year, index) {
        let newCreditCard = creditCards[index];
        newCreditCard.expirationYear = year;

        let newCreditCards = creditCards;
        newCreditCards[index] = newCreditCard;
        setCreditCards(newCreditCards);
    }

    function editCreditCardCVVHandle(cvv, index) {
        let newCreditCard = creditCards[index];
        newCreditCard.cvv = cvv;

        let newCreditCards = creditCards;
        newCreditCards[index] = newCreditCard;
        setCreditCards(newCreditCards);
    }

    function editCreditCardCCNHandle(ccn, index) {
        let newCreditCard = creditCards[index];
        newCreditCard.creditCardNum = ccn;

        let newCreditCards = creditCards;
        newCreditCards[index] = newCreditCard;
        setCreditCards(newCreditCards);
    }

    function deleteHandle(index) {
        API.removeCreditCard(trueCreditCards[index]).then(() =>{
            updateTrueCreditCards();
        }).catch(err => console.log(err));
    }

    function editHandle(index) {
        const creditCardUpdate = {
            primaryKeys: {email: userEmail, creditCardNum: trueCreditCards[index].creditCardNumber},
            updates: {$set: {"creditCardNum": creditCards[index].creditCardNum,
                    "cvv": creditCards[index].cvv,
                    "expirationYear": creditCards[index].expirationYear,
                    "expirationMonth": creditCards[index].expirationMonth}}};
        API.updateCreditCard(creditCardUpdate).then(() => {
            updateTrueCreditCards();
            alert("Credit Card updated!");
        }).catch(err => {console.log("Error updating credit card: " + err)})
    }

    function addHandle(event) {
        event.preventDefault();
        API.addCreditCard({ 
            email: userEmail,
            creditCardNum: creditCardNumber,
            expirationMonth: expirationMonth,
            expirationYear: expirationYear,
            cvv: CVV })
            .then(() => {
                updateTrueCreditCards();
                setCreditCardNumber("");
                setCVV("");
                setExpirationMonth("");
                setExpirationYear("");
                // window.location.reload();
            })
            .catch(err => console.log(err));
    }

    return (
        <React.Fragment>
            <Card>
                {creditCards.map((creditCard, index) => (
                    <ListGroup key={index}>
                        <ListGroup.Item key={index}>
                        <Form.Group controlId="EditProfileComponent.creditCardNumber">
                                <Form.Label> Credit Card Number</Form.Label>
                                <Form.Control type="text" maxLength="16" onInput={checkLength} placeholder={creditCard.creditCardNum} onChange={(event) => {editCreditCardCCNHandle(event.target.value, index)}}/>
                            </Form.Group>
                            <Form.Label> Expiration Date</Form.Label>
                            <Form.Row controlId="EditProfileComponent.expirationDate">
                                <Form.Group as={Col} md="4">
                                    <Form.Control as="select" placeholder={creditCard.expirationMonth} onChange={(event) => {editCreditCardExpMonthHandle(event.target.value, index)}}>
                                        {months.map((month) => {
                                            return <option>{month}</option>;
                                        })}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col} md="4">
                                    <Form.Control type="text" maxLength="4" onInput={checkLength} placeholder={creditCard.expirationYear} onChange={(event) => {editCreditCardExpYearHandle(event.target.value, index)}}/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Group controlId="EditProfileComponent.CVV">
                                <Form.Label> Security Code</Form.Label>
                                <Form.Control style={{ width: "25%" }} type="text" maxLength="3" onInput={checkLength}  onChange={(event) => {editCreditCardCVVHandle(event.target.value, index)}} placeholder={creditCard.cvv}/>
                            </Form.Group>
                            <ButtonGroup className="float-right">
                                <Button onClick={() => editHandle(index)}>Save Changes</Button>
                                <Button onClick={() => deleteHandle(index)} variant="danger">Delete</Button>
                            </ButtonGroup>
                        </ListGroup.Item>
                    </ListGroup>
                ))}
            </Card>
            <Form onSubmit={addHandle}>
            <div className="card-header">
                <b>New Credit Card</b>
            </div>
            <Card>
            <Form.Group controlId="EditProfileComponent.creditCardNumber">
                    <Form.Label> Credit Card Number</Form.Label>
                    <Form.Control type="text" maxLength="16" onInput={checkLength} value={creditCardNumber} onChange={updateCreditCardNumber}/>
                </Form.Group>
                <Form.Label> Expiration Date</Form.Label>
                <Form.Row controlId="EditProfileComponent.expirationDate">
                    <Form.Group as={Col} md="4">
                        <Form.Control as="select" value={expirationMonth} onChange={updateExpirationMonth}>
                            {months.map((month) => {
                                return <option>{month}</option>;
                            })}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} md="4">
                        <Form.Control type="text" maxLength="4" onInput={checkLength} value={expirationYear} onChange={updateExpirationYear} placeholder="Year"/>
                    </Form.Group>
                </Form.Row>
                <Form.Group controlId="EditProfileComponent.CVV">
                    <Form.Label> Security Code</Form.Label>
                    <Form.Control style={{ width: "25%" }} type="text" maxLength="3" onInput={checkLength} value={CVV} onChange={updateCVV} placeholder="CVV"/>
                    <Button className="float-right" type="submit" disabled={!formCheck}>Add credit card</Button>
                </Form.Group>
                </Card>
                
            </Form>
        </React.Fragment>
    )
}
export default CreditCardsList; 