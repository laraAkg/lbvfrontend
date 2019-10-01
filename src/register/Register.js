import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
class Register extends React.Component {

    handleButtonClick = () => {
        alert(">>> Clicked");
    }

  render() {
    return (
    <div style={{width:'800px', margin:'0 auto'}}>
       <Form>
         <Form.Group as={Row} controlId="formMail">
           <Form.Label column sm={2}>
             Email
           </Form.Label>
           <Col sm={10}>
             <Form.Control type="email" placeholder="Email" />
           </Col>
         </Form.Group>

         <Form.Group as={Row} controlId="formPassword">
           <Form.Label column sm={2}>
             Password
           </Form.Label>
           <Col sm={10}>
             <Form.Control type="password" placeholder="Password" />
           </Col>
         </Form.Group>

         <Form.Group as={Row} controlId="formConfirmPassword">
           <Form.Label column sm={2}>
             Confirm Password
           </Form.Label>
           <Col sm={10}>
             <Form.Control type="password" placeholder="Confirm Password" />
           </Col>
         </Form.Group>

<Col sm={10}>
        <Form.Check inline
          type="radio"
          label="Male"
          name="sexRadios"
          id="maleRadio"
        />
        <Form.Check inline
          type="radio"
          label="Female"
          name="sexRadios"
          id="femaleRadio"
        />
      </Col>


         <Form.Group as={Col} controlId="formDropdown">
               <Form.Label>State</Form.Label>
               <Form.Control as="select">
                 <option>Choose...</option>
                 <option>...</option>
               </Form.Control>
             </Form.Group>
   <Form.Group as={Row}>
           <Col sm={{ span: 10, offset: 2 }}>
             <Button type="submit">Sign in</Button>
           </Col>
         </Form.Group>
       </Form>
       </div>
    );
  }
}
export default Register;
