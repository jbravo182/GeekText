import React, { useState } from "react";
import API from "../utils/API";
import { Form, Alert, Button, Container, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, FormGroup, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, ListGroup, ListGroupItem, Badge } from "reactstrap";

const WishList = (props) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle2 = () => setDropdownOpen(prevState => !prevState);

  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);
  const [unmountOnClose, setUnmountOnClose] = useState(true);

    const toggle = () => setModal(!modal);
    const changeUnmountOnClose = e => {
        let value = e.target.value;
        setUnmountOnClose(JSON.parse(value));

  }

  return(

    <div className="ShoppingListMain" style = {{paddingLeft: "100px", paddingTop: "100px"}}>

    <h1 style ={{marginBottom: "0px"}}>Book Wish List</h1>
    <p>Add a book to an existing Wish List or create a new list </p>
        <div className="header">
        <Form inline>
      <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
        <Input type="form" placeholder="Enter the name of a book" />
      </FormGroup>
      <Dropdown isOpen={dropdownOpen} toggle={toggle2} size = "sm">
      <DropdownToggle caret>
          Add
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem header>Your Lists</DropdownItem>
        <DropdownItem divider />
          <DropdownItem>Fiction</DropdownItem>
             <DropdownItem>Horror</DropdownItem>
             <DropdownItem>Self-Help</DropdownItem>
             <DropdownItem>Biography</DropdownItem>
           </DropdownMenu>
         </Dropdown>
    </Form>





          <Button type="Submit" size = "sm" style = {{marginTop: "5px"} } onClick={toggle}>New List</Button>
          <a href ="#" style = {{paddingLeft: "10px"}}>View Lists</a>
        </div>

        <div>

            <Modal isOpen={modal} toggle={toggle} className={className} unmountOnClose={unmountOnClose}>
                <ModalHeader toggle={toggle}>Create a new List</ModalHeader>
                <ModalBody>
                    <Input type="textform"/>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Create List</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>

        </div>

        <div>
          <ListGroup flush>
            <ListGroupItem tag = "a" href = "#">Fiction<Badge pill style = {{marginLeft: "2%"}}>6</Badge></ListGroupItem>
            <ListGroupItem tag = "a" href = "#">Horror<Badge pill style = {{marginLeft: "2%"}}>3</Badge></ListGroupItem>
            <ListGroupItem tag = "a" href = "#">Self-Help<Badge pill style = {{marginLeft: "2%"}}>1</Badge></ListGroupItem>
            <ListGroupItem tag = "a" href = "#">Biography<Badge pill style = {{marginLeft: "2%"}}>5</Badge></ListGroupItem>
          </ListGroup>


        </div>
      </div>



  )
}
export default WishList;
