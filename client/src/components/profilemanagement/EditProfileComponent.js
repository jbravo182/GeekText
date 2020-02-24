import React from "react";
import { Form, Alert, Button, Container } from "react-bootstrap";
import { Grid, Col, Dropdown, DropdownButton } from "react-bootstrap";

function EditProfileComponent() {

    const months = ["January", "February", "March", "April", "May", "June", "July",
        "August", "September", "October", "November", "December"];

    function submitHandle(event) {
        // TODO
    }

    function checkLength(event) {
        if (event.currentTarget.value.length > event.currentTarget.maxLength) {
            event.currentTarget.value = event.currentTarget.value.slice(0, event.currentTarget.maxLength)
        }
    }

    return (
        <React.Fragment>
            <Container style={{ paddingTop: "20px" }}>
                <b>Sprint 3!</b>
                <h1>Edit Profile Placeholder</h1>
                <b>Your Credit Cards</b>
                <ul>

                </ul>
                <b>Add a Credit Card</b>
                <Form.Group controlId="EditProfileComponent.creditCardNumber">
                    <Form.Label>Credit Card Number</Form.Label>
                    <Form.Control type="number" maxLength="16" onInput={checkLength} />
                </Form.Group>
                <Form.Label>Expiration Date</Form.Label>
                <Form.Row controlId="EditProfileComponent.expirationDate">
                    <Form.Group as={Col} md="4">
                        <Form.Control as="Select">
                            {months.map((month) => {
                                return <option>{month}</option>;
                            })}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group as={Col} md="4">
                        <Form.Control type="number" maxLength="4" onInput={checkLength} placeholder="Year" />
                    </Form.Group>
                </Form.Row>
                <Form.Group controlId="EditProfileComponent.CVV">
                    <Form.Label>Security Code</Form.Label>
                    <Form.Control style={{ width: "25%" }} type="number" maxLength="3" onInput={checkLength} placeholder="CVV" />
                </Form.Group>
                <Button type="submit">Add</Button>
            </Container>
        </React.Fragment>
    )
}

export default EditProfileComponent;