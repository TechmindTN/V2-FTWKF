
import React, { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt, faPhone, faRoad } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup, ListGroup, Image } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import { Routes } from "../../routes";
import logo from "../../assets/img/logo-ftwkf.png";
import BgImage from "../../assets/img/illustrations/signin.svg";
import axios from "./api/axios";
import Role from "../examples/Role"
import HomePage from "../HomePage";
const USER_REGEX = /^[0-9]{3,10}$/;
const PWD_REGEX = /^[0-9]{3,10}$/;
const REGISTER_URL='register/';
const Register = () => {
const inputRef = useRef(null);
const userRef = useRef();
const errRef = useRef();
const [username, setUsername] = useState('');
const [valideName , setValidName] = useState('');
const [userFocus , setUserFocus] = useState('');

const [password, setPassword] = useState('');
const [validePassword , setValidPassword] = useState('');
const [passwordFaocus , setPasswordFocus] = useState('');
const [matchpwd, setMatchPwd] = useState('');
const [valideMatch , setValidMatch] = useState('');
const [macthFaocus , setMatchFocus] = useState('');
const[errMsg, setErrMsg] = useState ('') ;
const[success, setSuccess] = useState (false) ;
const [isShown, setIsSHown] = useState(false);
const togglePassword = () => {
  setIsSHown((isShown) => !isShown);
};

const [rol, setRol] = useState('');

useEffect(() => {
  setRol(window.localStorage.getItem("rol"));
}, []);

useEffect(() => {
  window.localStorage.setItem("rol", rol);
}, [rol]);
useEffect(() => {
  const result = USER_REGEX.test(username);
  console.log(result);
  console.log(username);
  setValidName(result);
  },[username])
  
useEffect(() => {
  const result = PWD_REGEX.test(password);
  console.log(result);
  console.log(password);
  setValidPassword(result);
  const match = password === matchpwd;
  setValidMatch(match);
  },[password,matchpwd])

  useEffect(() => {
    setErrMsg('');
  },[username,password,matchpwd])


  const handlesubmit = async (e) => {
    e.preventDefault();
    const v1 =USER_REGEX.test(username);
    const v2 = PWD_REGEX.test(password);
    if(!v1 || !v2) {
      setErrMsg("Invalid entry");
      return;
    }
    
    try{
      axios.post(REGISTER_URL,({'username':username,'password':password}),
      {mode:'cors'},
       {
          headers: {'Content-Type':'application/json','Access-Control-Allow-Origin':'Accept'},
          withCredentials: false
       }
    )
    .then((response) => {;
    console.log(response?.data)
    console.log({'username':username,'password':password});
    sessionStorage.setItem("rol", JSON.stringify('rol',rol))
    const token=response.data['token'];
    localStorage.setItem('token',token)
    const id=response.data.user_info['id'];
    localStorage.setItem('id',id)
    setRol();
    setSuccess(true);
      // storing input rol
    })
    } catch(err){
      if(err?.response){
        setErrMsg('no Server response')
        } else if(err?.response?.status ===409) {
          setErrMsg('username taken');
       }  else{   setErrMsg('registration failed');
       } 
       errRef.current.focus();
    }


  }


  return (
    <>{success ? (
      <Role />
       ) : (
    <main>
      <section className="d-flex align-items-center my-5 mt-lg-4 mb-lg-5">
        <Container>
          <p className="text-center">
            <Card.Link as={Link} to={Routes.DashboardOverview.path} className="text-gray-700">
              <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Retour ?? la page d'acceuil
            </Card.Link>
          </p>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

          <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="mb-4 mb-lg-0 bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
              <div className="text-center text-md-center mb-4 mt-md-0">
              <Image src={logo}className="navbar-brand-light"  />

                </div>
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Cr??er un compte</h3>
                </div>
                <Form className="mt-4" onSubmit={handlesubmit}>
                  <Form.Group id="email" className="mb-4">
                    <Form.Label>Votre num??ro de t??l??phone</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faPhone} />
                      </InputGroup.Text>
                      <Form.Control autoFocus required type="text" placeholder="example@company.com"
                        name="username" id="username" ref={userRef} autoComplete="off" onChange={(e) =>setUsername(e.target.value)}
                        value={username}
                        aria-valid={valideName ? "false" : "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                      />
                      
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="password" className="mb-4">
                    <Form.Label>Mot de passe</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control  required type={isShown ? "text" : "password"}
                        name="password"  id="password" placeholder="Password" 
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setPasswordFocus(true)}
                      onBlur={() => setPasswordFocus(false)}
                      aria-valid={validePassword ? "false" : "true"}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group id="confirm_password" className="mb-4">
                    <Form.Label>confirmer mot de passe</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faUnlockAlt} />
                      </InputGroup.Text>
                      <Form.Control required  type={isShown ? "text" : "password"} id="confirm_password" placeholder="Password" 
                      onChange={(e) => setMatchPwd(e.target.value)}
                      onFocus={() => setMatchFocus(true)}
                      onBlur={() => setMatchFocus(false)}
                      aria-valid={valideMatch ? "false" : "true"}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group required id="rol" className="mb-4" >
                     <Form.Select name="rol" id="rol"   
                  value={rol || ''}   ref={inputRef}
                  onChange={(e) =>setRol(e.target.value)}>
      <option >Choisir votre role</option>
      <option value="athlete">Athlete</option>
      <option value="2">Entraineur</option>
      <option value="3">Pr??sident de club</option>
      <option value="4">Arbitre</option>
    </Form.Select>
                 {/* {rol} */}
                  </Form.Group>
                  <FormCheck type="checkbox" className="d-flex mb-4">
                    <FormCheck.Input required id="checkbox"
            type="checkbox"
            checked={isShown}
            onChange={togglePassword} className="me-2" />
                    <FormCheck.Label htmlFor="checkbox" className="mb-0">Afficher mot de passe?
                    </FormCheck.Label>
                  </FormCheck>

                  <Button variant="primary" type="submit" className="w-100" 
                  disabled={!valideName || !valideMatch || !validePassword ? true : false} > 
                    enregistrer
                  </Button>
                 
                </Form>

                <div className="mt-3 mb-4 text-center">
                  <span className="fw-normal">or</span>
                </div>
                <div className="d-flex justify-content-center my-4">
                  <Button variant="outline-light" className="btn-icon-only btn-pill text-facebook me-2">
                    <FontAwesomeIcon icon={faFacebookF} />
                  </Button>
                  <Button variant="outline-light" className="btn-icon-only btn-pill text-twitter me-2">
                    <FontAwesomeIcon icon={faTwitter} />
                  </Button>
                  <Button variant="outline-light" className="btn-icon-only btn-pil text-dark">
                    <FontAwesomeIcon icon={faGithub} />
                  </Button>
                </div>
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                  Vous avez d??j?? un compte ?
                    <Card.Link as={Link} to={Routes.Signin.path} className="fw-bold">
                      {` Connectez-vous ici `}
                    </Card.Link>
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      
    </main>)}
    
    </>
  );
  
};
export default Register;
