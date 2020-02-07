import React, { useState } from "react";
import API from "../utils/API";
import { Form, Alert, Button, Container } from "react-bootstrap";

function LoginForm() {
    const [error, setError] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function submitHandle(event) {
        event.preventDefault();
        const credentials = {
            "email": email,
            "password": password
        }
        API.login(credentials)
            .then(res => localStorage.setItem("auth_token", res.data))
            .catch(err => setError(true));
    }

    function passwordChangeHandle(event) {
        setPassword(event.currentTarget.value);
    }

    function emailChangeHandle(event) {
        setEmail(event.currentTarget.value);
    }

    function dismissHandle() {
        setError(false);
    }

    return (
        <React.Fragment>
            <Container style={{ paddingTop: "20px" }}>
                {error ? <Alert dismissable variant="danger" onClose={dismissHandle}>Incorrect Email or Password</Alert> : null}
                <Form onSubmit={e => submitHandle(e)}>
                    <Form.Group controlId="LoginForm.email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="foo@bar.com" value={email} onChange={emailChangeHandle} />
                    </Form.Group>
                    <Form.Group controlId="LoginForm.password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" value={password} onChange={passwordChangeHandle} />
                    </Form.Group>
                    <Button type="Submit">Submit Form</Button>
                </Form>
            </Container>
        </React.Fragment>
    )
}

export default LoginForm;