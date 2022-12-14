
import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt, faPhone, faRoad } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup, ListGroup, Image } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import { Routes } from "../../routes";
import logo from "../../assets/img/logo-ftwkf.png";
import Settings from "../Settings";
import BgImage from "../../assets/img/illustrations/signin.svg";
import axios from "./api/axios";
const REGISTER_URL='register/';


const Register = () => {

const inputRef = useRef(null);
const userRef = useRef();
const [rol, setRol] = useState('');

useEffect(() => {
  setRol(window.localStorage.getItem("rol"));
}, []);

useEffect(() => {
  window.localStorage.setItem("rol", rol);
}, [rol]);






  // const handlesubmit = async (e) => {
  //   e.preventDefault();    
  //   try{
  //     axios.post(REGISTER_URL,({'username':username,'password':password}),
  //     {mode:'cors'},
  //      {
  //         headers: {'Content-Type':'application/json','Access-Control-Allow-Origin':'Accept'},
  //         withCredentials: false
  //      }
  //   )
  //   .then((response) => {;
  //   console.log(response?.data)
  
  //   })
  //   } catch(err){
  //     if(err?.response){
  //       setErrMsg('no Server response')
  //       } else if(err?.response?.status ===409) {
  //         setErrMsg('username taken');
  //      }  else{   setErrMsg('registration failed');
  //      } 
  //      errRef.current.focus();
  //   }


  // }
  useEffect(() => {
    fetch(`https://cc3d-197-0-144-55.eu.ngrok.io/api/role/`,{
      headers: {'Content-Type': 'application/json','Authorization':'TOKEN 7d724f4762ff08ebbf6aa9a8534ef4c737c1f9462b9acf43b2b108ade86c90d5',  'Access-Control-Allow-Methods': 'Accept'},
      withCredentials: false
   })
      .then(async (response) => {
      
    const data = await response.json();
    const roles=data.map(roles => roles.roles)
    const mapData = JSON.stringify([...roles]);
    console.log(roles);
 

      })
    
  }, []);
 
  return (
    
    
      <section className="d-flex align-items-center my-58 mt-lg-4 mb-lg-5">
      <Container>


        
       <form >
        <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
          <Col xs={12} className="d-flex align-items-center justify-content-center">
            <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
            <div className="text-center text-md-center mb-4 mt-md-0">
            <Image src={logo}className="navbar-brand-light"  />

              </div>
              <div className="text-center text-md-center mb-4 mt-md-0">
                <h3 className="mb-0">Register successful </h3>
              </div>
             
          <p className="text-gray-700 text-center">
             Choisir votre role
        </p>

        <Form.Group required id="rol" className="mb-4" >
                     <Form.Select name="rol" id="rol"   required
                  value={rol || ''}   ref={inputRef}
                  onChange={(e) =>setRol(e.target.value)}>
 <option >    Choisir votre role</option>
      <option value="1">Arbitre</option>
      <option value="2">Athlete</option>
      <option value="3">Club</option>
      <option value="4">Coach</option>     

     
    </Form.Select>
                 {/* {rol} */}
                  </Form.Group>
                  <p className="text-center">
            <Card.Link as={Link} to={Routes.Settings.path} className="text-gray-700">
              <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Continuer
            </Card.Link>
          </p>
            </div>
          </Col>
        </Row>
        </form>
      </Container>
    </section>      
   
  );
  
};
export default Register;
