import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faBoxOpen, faCartArrowDown, faChartPie, faChevronDown, faClipboard, faCommentDots, faFileAlt, faPlus, faRocket, faStore } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Button, InputGroup, Dropdown } from '@themesberg/react-bootstrap';
import { Routes } from "../routes";
import { Link } from 'react-router-dom';
import Datetime from "react-datetime";
import { faCalendarAlt,faPaperclip } from '@fortawesome/free-solid-svg-icons';
import axios from "./examples/api/axios";
import { ChoosePhotoWidget, ProfileCardWidget } from "../components/Widgets";


export const Profile = () =>  {
  const [id,  setId]=useState('')
  useEffect(() => {
    setId(window.localStorage.getItem("id"));
  }, []);
  const [first_name, setFname] = useState();
  const [photo,setPhoto] = useState();
  const [last_name, setLname] = useState();
  const [country, setCountry] = useState();
  const [birthday, setBirthday] = useState();
  const [state, setState] = useState();
  const [city, setCity] = useState();
  const [address, setAddress] = useState();
  const [phone, setPhone] = useState();
  const [cin, setCin] = useState();
  const [role, setRole] = useState();
  const [categorie, setCategorie] = useState();
  const [licences, setLicences] = useState();
  const [mail, setMail] = useState();
  const [zip,setZip]= useState();
  const [img, setImg] = useState();
  const PROFILE_URL=`pro/${window.localStorage.getItem("id")}/`;
  const fetchImage = async () => {
    const res = await fetch(imageUrl);
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    setImg(imageObjectURL);
  };

  useEffect(() => {
    fetchImage();
  }, [])
  

  useEffect(() => {
    axios.get(PROFILE_URL,{
      headers: {'Content-Type': 'application/x-www-form-urlencoded','Authorization':` TOKEN ${window.localStorage.getItem("token")}`,  'Access-Control-Allow-Methods': 'Accept'},
      withCredentials: false
   })
    .then(res => {
      const persons = res.data;
      setState(persons);
      console.log(state);
      const id=persons.id
      console.log(id)
      localStorage.setItem('idP',id)
      console.log(persons.profile_photo)
      setCountry(persons.country)
      setPhoto(persons.profile_photo)

      setFname(persons.first_name)
      setLname(persons.last_name)
      setPhone(persons.phone)
      setBirthday(persons.birthday)
      setRole(persons.role)
      localStorage.setItem('rol',persons.role)
      setZip(persons.zip_code)
    if(persons.role ===1){
     setRole("arbitre")
    } else if(persons.role===2){
     setRole("Athlete")
         }
     else if(persons.role===3){
     setRole("Supporteur")
               } else{
                 setRole("Entraineur")
               }
  
  })},[])




    return (
      <>
      <Row>
    <Col xs={12} xl={8}>
      <Card border="light" className="bg-white shadow-sm mb-4">
         
        <Card.Body>
        <Row>
          <Col md={10} className="mb-3">
          <h5 className="mb-4">Informations Generales </h5></Col><img src={photo} style={{ width: 100, height: 80 }}alt="icons" />
          <Col md={2} className="mb-3">
          <Button
            variant="primary" as={Link} to={Routes.EditeProfile.path} className="mb-4">
              <FontAwesomeIcon icon={faPen}  /> Edite Profile
             
            </Button></Col>
            </Row>
          <Form >
            <Row>
            <Col md={6} className="mb-3">
                <Form.Group id="emal">
                  <Form.Label>Role: <br/> {role } </Form.Label> 
                 
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Nom : <br/> {first_name} </Form.Label>  
                 
                </Form.Group>
              </Col>
             
            </Row>

            <Row className="align-items-center">
            <Col md={6} className="mb-3">
                <Form.Group id="lastName">
                  <Form.Label>Prenom : <br/> {last_name }</Form.Label>
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="birthday"  name="birthday" >
                  <Form.Label>Date de naissance : <br/> {birthday}</Form.Label> 
              
                </Form.Group>
              </Col>
              {/* <Col md={6} className="mb-3">
                <Form.Group id="gender">
                  <Form.Label>Gendre</Form.Label>
                  <Form.Select id="gender"  name="gender" 
                                  autoComplete="off" >
                    <option value="0">Gender</option>
                    <option value="1">Femme</option>
                    <option value="2">Homme</option>
                  </Form.Select>
                </Form.Group>
              </Col> */}
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Group id="emal">
                  <Form.Label>Email :<br/>{mail} </Form.Label> 
                </Form.Group>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Group id="phone">
                  <Form.Label>Téléphone :  <br/>  {phone}</Form.Label>
                 
                </Form.Group>
              </Col>
            </Row>
  
            <h5 className="my-4">Address</h5>
            <Row>
              <Col sm={8} className="mb-3">
                <Form.Group id="address">
                  <Form.Label>Address :<br/>{address} </Form.Label> 
               
                </Form.Group>
              </Col>
              <Col sm={4} className="mb-3">
                <Form.Group id="addressNumber">
                  <Form.Label>Numero :<br/> +216 111 111 11</Form.Label> 
                
                  
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col sm={4} className="mb-3">
                <Form.Group id="country">
                  <Form.Label>pays : <br/> Tunisie </Form.Label>
                 
                </Form.Group>
              </Col>
              <Col sm={4} className="mb-3">
                <Form.Group className="mb-2">
                  <Form.Label>Gouvernerat : <br/> Tunis </Form.Label>
                 
                </Form.Group>
              </Col>
              <Col sm={4}>
                <Form.Group id="zip">
                  <Form.Label>Code Postal : <br/> {zip}</Form.Label>
               
                </Form.Group>
              </Col>
            </Row>
            
           
          
          </Form>
        </Card.Body>
      </Card></Col>
      <Col xs={12} xl={4}>
      <Row>
        <Col xs={12}>
          <ProfileCardWidget />
        </Col>
     
      </Row>
    </Col></Row>
</>
  );
};
export default(Profile)
