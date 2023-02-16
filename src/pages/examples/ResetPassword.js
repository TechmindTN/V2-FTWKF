
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { Col, Row, Form, Card, Button, Container, InputGroup } from '@themesberg/react-bootstrap';
import axios from "./api/axios";


export default () => {
  const [pw,setPw]=useState();
  const [success, setSuccess] = useState (false) ;

  const submit = async (e) => {
    e.preventDefault();
console.log("aaaa")  ;
axios.put(`change_password/${localStorage.getItem("id")}/`,{"password":pw},{ headers : {'Content-Type': 'Application/json','Authorization':  `TOKEN ${localStorage.getItem("token")}`,
                'Access-Control-Allow-Origin':'Accept'}})
             .then(response => {
               console.log("Valide successfully!")
               //window.location.reload(false);
               if(response.status==200){
                setSuccess(<div className="alert alert-success d-flex align-items-center" role="alert">
                <div>Mot de passe changé avec succes</div></div>);
               }
             })
             .catch(error => {
               console.log("Something went wrong", error)
             })


              }
  
  return (
    <main>
      <section className="bg-soft d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
        <Container>
        <Form onSubmit={submit}>
          <Row className="justify-content-center">
            <p className="text-center">
            <div className="text-center"><p>{success}</p></div>

              {/* <Card.Link as={Link} to={Routes.Signin.path} className="text-gray-700">
                <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Back to sign in
              </Card.Link> */}
            </p>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                <h3 className="mb-4">Changer  mot de passe</h3>
                <Form>
                  {/* <Form.Group id="email" className="mb-4">
                    <Form.Label>Your Email</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faEnvelope} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="email" placeholder="example@company.com" />
                    </InputGroup>
                  </Form.Group> */}
                  {/* <Form.Group id="password" className="mb-4">
                    <Form.Label>Your Password</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control required type="password" placeholder="Password" />
                    </InputGroup>
                  </Form.Group> */}
                  <Form.Group id="confirmPassword" className="mb-4">
                    <Form.Label>8 chiffres maximum</Form.Label> 
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control required type="text" value={pw} onChange={(e) =>setPw(e.target.value)} maxLength={8}/>
                    </InputGroup>
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                    changer mot de passe
                  </Button>
                </Form>
              </div>
            </Col>
          </Row></Form>
        </Container>
      </section>
    </main>
  );
};
