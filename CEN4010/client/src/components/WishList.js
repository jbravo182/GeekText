import React, { useState } from "react";
import API from "../utils/API";
import { Form, Alert, Button, Container, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, FormGroup, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, ListGroup, ListGroupItem, Badge, UncontrolledCollapse } from "reactstrap";

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
             <DropdownItem divider />
             <DropdownItem onClick = {toggle}>New List</DropdownItem>
           </DropdownMenu>
         </Dropdown>
    </Form>





          <a href ="#" id = "toggler" style = {{paddingLeft: "5px", paddingTop: "10px"}}>View Lists</a>
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
                </Modal>

        </div>


        <div>
        <UncontrolledCollapse toggler = "#toggler">
          <ListGroup flush style = {{marginRight: "75%"}}>
            <ListGroupItem tag = "a" href = "#" id="toggle-fiction">Fiction<Badge pill style = {{marginLeft: "2%"}}>6</Badge></ListGroupItem>
              <UncontrolledCollapse toggler = "#toggle-fiction">

                  <p style = {{marginLeft: "10%", marginBottom: "0px", marginTop: "2%"}}>Of Mice and Men</p>
                  <p style = {{marginLeft: "10%", marginBottom: "0px"}}>Maximum Ride</p>
                  <p style = {{marginLeft: "10%", marginBottom: "0px"}}>Game of Thrones</p>
                  <p style = {{marginLeft: "10%", marginBottom: "0px"}}>God is Dead</p>
                  <p style = {{marginLeft: "10%", marginBottom: "0px"}}>Epitomes of Conviction</p>
                  <p style = {{marginLeft: "10%", marginBottom: "2%"}}>Hell Buried</p>

              </UncontrolledCollapse>
            <ListGroupItem tag = "a" href = "#" id = "toggle-horror">Horror<Badge pill style = {{marginLeft: "2%"}}>3</Badge></ListGroupItem>

              <UncontrolledCollapse toggler = "#toggle-horror">

                  <p style = {{marginLeft: "10%", marginBottom: "0px", marginTop: "2%"}}>The Shining</p>
                  <p style = {{marginLeft: "10%", marginBottom: "0px"}}>Scratches</p>
                  <p style = {{marginLeft: "10%", marginBottom: "2%"}}>The Hostile Hospital</p>


              </UncontrolledCollapse>
            <ListGroupItem tag = "a" href = "#" id = "toggle-SH">Self-Help<Badge pill style = {{marginLeft: "2%"}}>1</Badge></ListGroupItem>
              <UncontrolledCollapse toggler = "#toggle-SH">

                  <p style = {{marginLeft: "10%", marginBottom: "2%", marginTop: "2%"}}>How To Be A Badass</p>



              </UncontrolledCollapse>
            <ListGroupItem tag = "a" href = "#" id = "toggle-bio">Biography<Badge pill style = {{marginLeft: "2%"}}>5</Badge></ListGroupItem>

            <UncontrolledCollapse toggler = "#toggle-bio">

                <p style = {{marginLeft: "10%", marginBottom: "0px", marginTop: "2%"}}>Slash: A Rockstars Guide to Life</p>
                <p style = {{marginLeft: "10%", marginBottom: "0px"}}>Some Book About Oprah</p>
                <p style = {{marginLeft: "10%", marginBottom: "0px"}}>Morgan Freeman Has A Cool Voice: Heres Why</p>
                <p style = {{marginLeft: "10%", marginBottom: "0px"}}>Obama? Obama.</p>
                <p style = {{marginLeft: "10%", marginBottom: "0px"}}>A Day In The Life of a Wendy's Employee</p>

            </UncontrolledCollapse>

          </ListGroup>
          </UncontrolledCollapse>

        </div>

      </div>



  )
}
export default WishList;
