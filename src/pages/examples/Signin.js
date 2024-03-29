
import React, { useRef, useState, useEffect, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faPhone, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup, Image } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import logo from "../../assets/img/logo-ftwkf.png";
import { Routes } from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";
import HomePage from '../HomePage';
import DashboardOverview from '../HomePage';
import axios from "./api/axios";
import AuthContext from "./context/AuthProvider";
const LOGIN_URL='login/';



const Login = ()=> {


const{ setAuth } = useContext(AuthContext);
const userRef = useRef();
const errRef = useRef();
const [username, setUsername] = useState('');
const [password , setPassword] = useState('');
const [id, setId] = useState('');

const[errMsg, setErrMsg] = useState ('') ;
const [isShown, setIsSHown] = useState(false);
const isLoading = useRef(false);
const isSuccess = useRef(false);
const togglePassword = () => {
   ((isShown) => !isShown);
};

useEffect(() => {
  setErrMsg('');
},[username,password])

const handleSubmit = async (e) =>{
  e.preventDefault();
  
  axios.post(LOGIN_URL,
  ({'username':username,'password':password}),
   {mode:'cors'},
    {
       headers: {'Content-Type':'application/json','Access-Control-Allow-Origin':'Accept'},
       withCredentials: false
    }
 ).then((value) => {
 //console.log(value?.status)
 isLoading.current = true;
 localStorage.setItem("isLoading",isLoading.current)
 console.log(isLoading.current);
 
  if(value?.status=="200"){
    setUsername('');
    setPassword('');
    
    isSuccess.current=true;
    const token=value.data['token'];
    const id=value.data.user_data['id'];
    const username=value.data.user_data['username'];
    localStorage.setItem('token',token)
    localStorage.setItem('id',id)
    localStorage.setItem('username',username);
    localStorage.setItem('club', value.data.club['id']);
  }
 }).catch((e)=>{
  console.log(e.response.status)
  console.log(e.status)
  if(e?.response?.status=="500"){
    setErrMsg('no Server response')
   } else if(e?.response?.status=="400") {
    setErrMsg('username ou password incorrecte');
    } else if (e?.response?.status == "401"){
      setErrMsg('unautherized');
   }else if (e?.response?.status == "404"){
    setErrMsg("unautherized");
  } else{ setErrMsg('Erreur');
  } 
  errRef.current.focus();
  console.log("ay hgkaya")
 });
 
   

  
}

 
  return (
    <> 
    {isLoading.current ? (
        <section className="d-flex align-items-center my-58 mt-lg-4 mb-lg-5">
        <Container>
         
          <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
              <div className="text-center text-md-center mb-4 mt-md-0">
              <Image src={logo}className="navbar-brand-light"  />

                </div>
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Connexion réussie {username}</h3>
                </div>
                <p className="text-center">
            <Card.Link as={Link} to={Routes.DashboardOverview.path} className="text-gray-700">
              <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Continuer l'inscription
            </Card.Link>
          </p>

               
              </div>
            </Col>
          </Row>
        </Container>
      </section>
        ) : (
    <main>
      <section className="d-flex align-items-center my-58 mt-lg-4 mb-lg-5">
        <Container>
          <p className="text-center">
            <Card.Link as={Link} to={Routes.Presentation.path} className="text-gray-700">
              <FontAwesomeIcon icon={faAngleLeft} className="me-2" /> Retour à la page d'accueil
            </Card.Link>
          </p>
    
          <Row className="justify-content-center form-bg-image" style={{ backgroundImage: `url(${BgImage})` }}>
            <Col xs={12} className="d-flex align-items-center justify-content-center">
              <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500 ">
              <div className="text-center"><p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p></div>
              <div className="text-center text-md-center mb-4 mt-md-0">
              <Image src={logo}className="navbar-brand-light"  />

                </div>
                <div className="text-center text-md-center mb-4 mt-md-0">
                  <h3 className="mb-0">Connecter à notre plateforme</h3>
                </div>
                <Form className="mt-4" onSubmit={handleSubmit}>
                  <Form.Group id="username" className="mb-4">
                    <Form.Label>Votre numero téléphone</Form.Label>
                    <InputGroup>
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faPhone} />
                      </InputGroup.Text>
                      <Form.Control  required type="text" 
                      name="username" id="username" ref={userRef} autoComplete="off" onChange={(e) => setUsername(e.target.value)}
                      value={username}
                      />
                    </InputGroup>
                  </Form.Group>
                  <Form.Group>
                    <Form.Group id="password" className="mb-4">
                      <Form.Label>Mot de passe</Form.Label>
                      <InputGroup>
                        <InputGroup.Text>
                          <FontAwesomeIcon icon={faUnlockAlt} />
                        </InputGroup.Text>
                        <Form.Control  required type={isShown ? "text" : "password"}
                        name="password" id="password" onChange={(e) => setPassword(e.target.value)}
                      value={password}
                        />
                      </InputGroup>
                      
                    </Form.Group>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                      <Form.Check type="checkbox">
                        <FormCheck.Input className="me-2"    id="checkbox"
            type="checkbox"
            checked={isShown}
            onChange={togglePassword}/>
                        <FormCheck.Label  htmlFor="checkbox" className="mb-0">Afficher mot de passe?</FormCheck.Label>
                      </Form.Check>
                      {/* <Card.Link className="small text-end">Lost password?</Card.Link> */}
                    </div>
                  </Form.Group>
                  <Button variant="primary" type="submit" className="w-100">
                  s'inscrire                  </Button>
                </Form>

                {/* <div className="mt-3 mb-4 text-center">
                  <span className="fw-normal">or login with</span>
                </div> */}
                {/* <div className="d-flex justify-content-center my-4">
                  <Button variant="outline-light" className="btn-icon-only btn-pill text-facebook me-2">
                    <FontAwesomeIcon icon={faFacebookF} />
                  </Button>
                  <Button variant="outline-light" className="btn-icon-only btn-pill text-twitter me-2">
                    <FontAwesomeIcon icon={faTwitter} />
                  </Button>
                  <Button variant="outline-light" className="btn-icon-only btn-pil text-dark">
                    <FontAwesomeIcon icon={faGithub} />
                  </Button>
                </div> */}
                <div className="d-flex justify-content-center align-items-center mt-4">
                  <span className="fw-normal">
                  Vous n'êtes pas inscrit ?                    <Card.Link as={Link} to={Routes.Signup.path} className="fw-bold">
                      {` Créez un compte `}
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

}
export default (Login);