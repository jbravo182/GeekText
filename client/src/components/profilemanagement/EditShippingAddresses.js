import React, { useEffect, useState } from 'react';
import API from '../../utils/API';
import ShippingAddressList from './ShippingAddressList';
import { Card, Form, Button } from 'react-bootstrap';


const EditShippingAddresses = (props) => {
    const [email] = useState(props.email);
    
    return (
    <Card>
      <Card.Header>
        <b>Edit Shipping Addresses</b>
      </Card.Header>
      <Card.Body>
        <ShippingAddressList email={email}/>
      </Card.Body>
    </Card>
  );
}
    
   
    







  
  

export default EditShippingAddresses;