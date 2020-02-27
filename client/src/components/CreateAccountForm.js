import React, { useState } from "react";
import API from "./utils/API";
import { Form, Alert, Button, Container } from "react-bootstrap";

function CreateAccountForm() {
    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");

    function submitHandle(event) {
        event.preventDefault();
        const user = {
            "first": firstName,
            "last": lastName,
            "email": email,
            "password": password
        }
        API.createAccount(user)
            .then(res => console.log("Account Created"))
            .catch(err => setError(true));

        function passwordChangeHandle(event) {
            setPassword(event.currentTarget.value);
        }

        function emailChangeHandle(event) {
            setEmail(event.currentTarget.value);
        }

        function firstNameChangeHandle(event) {
            setFirstName(event.currentTarget.value);
        }

        function lastNameChangeHandle(event) {
            setLastName(event.currentTarget.value);
        }

        function dismissHandle() {
            setError(false);
        }

        return (
            <React.Fragment>
                <Container style={{ paddingTop: "20px" }}>
                    {error ? <Alert dismissable variant="danger" onClose={dismissHandle}>There was an error creating your Account</Alert> : null}
                    <Form onSubmit={e => submitHandle(e)}>
                        <Form.Group controlId="CreateAccountForm.firstName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control type="text" value={firstName} onChange={firstNameChangeHandle} />
                        </Form.Group>
                        <Form.Group controlId="CreateAccountForm.lastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" value={lastName} onChange={lastNameChangeHandle} />
                        </Form.Group>
                        <Form.Group controlId="CreateAccountForm.email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="foo@bar.com" value={email} onChange={emailChangeHandle} />
                        </Form.Group>
                        <Form.Group controlId="CreateAccountForm.password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={password} onChange={passwordChangeHandle} />
                        </Form.Group>
                        <Button type="submit">Submit Form</Button>
                    </Form>
                </Container>
            </React.Fragment>
        )
    }
}

export default CreateAccountForm;