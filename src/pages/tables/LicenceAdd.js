
import React , {useEffect,useState,useRef} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome , faCalendarAlt, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb } from '@themesberg/react-bootstrap';
import { Form, Col, Row, Nav, Card, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup, Modal,InputGroup } from '@themesberg/react-bootstrap';
import { Routes } from "../../routes";
import { Link } from 'react-router-dom';
import { PageTrafficTable, RankingTable } from "../../components/Tables";
import axios from "../examples/api/axios";
import Datetime from "react-datetime";

const Licence_URL='add_licence/'
const PARAMETER_URL='parameters/'
const role_url='role/'
const Licenceadd = () =>{

  const [state,setState]=useState([]);
  const [state2,setState2]=useState([]);
  const [state3,setState3]=useState([]);
  const [state4,setState4]=useState([]);
  const [state5,setState5]=useState([]);
  const [state6,setState6]=useState([]);
  const [state7,setState7]=useState([]);


  const[ligue, setLigue] = useState();

  const[degree, setDegree] = useState();
  const[weights,setWeights]=useState();
  const[grade,setGrade]=useState('');
  const[success, setSuccess] = useState (false) ;
  const[categorie, setCategorie] = useState();
  const[season, setSeason] = useState();
  const[club, setClub] = useState();
  const[Disciplines, setDiscipline] = useState();
  const[role, setRole] = useState();
  const[nom, setNom] = useState();

  useEffect(() => {
    axios.get(PARAMETER_URL,``)
    .then(res => {
      const seasons = res.data.Seasons;
      const Categories = res.data.Categories;
      const Clubs=res.data.Clubs;
      const Grades=res.data.Grades;
      const Weights=res.data.Weights;
      const Degrees=res.data.Degrees;
      const Disciplines=res.data.Disciplines;
      setState2(Degrees);
      setState3(Weights);
      setState4(Grades);
      setState(seasons);
      setState5(Categories);
      setState6(Clubs);
      setState7(Disciplines);
  })},[])
  useEffect(() => {
    axios.get(role_url,``)
    .then(res => {
      const role = res.data;
      console.log(role);
      setState2(role);
  })},[])
const[datas,setData]=useState('');
const [showDefault, setShowDefault] = useState(false);
const handleClose = () => setShowDefault(false);

const handlesubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("categorie", Number(categorie));
  formData.append("weight", Number( weights));
  //formData.append("discipline", discipline);
  formData.append("club", club);  
  formData.append("grade", Number(grade));
  formData.append("degree", Number(degree));
  formData.append("seasons",  Number(season));
  formData.append("user", localStorage.getItem("id"));
  formData.append("role", localStorage.getItem("rol"));
const user = localStorage.getItem("id");
try {
  const token = localStorage.getItem("token");
    axios.post(
      Licence_URL
      ,({'categorie':categorie,'weight':weights,'club':club,'grade':grade,'degree':degree,'seasons':season,'user':user,'role':role,'Disciplines':Disciplines}),
       { headers: {'Content-Type': 'application/json','Authorization':`TOKEN ${token}`,
        'Access-Control-Allow-Origin':'Accept'} },
    )
    setSuccess(<div className="alert alert-success d-flex align-items-center" role="alert">
    <div>Licence Ajouté</div></div>);
    const timer = setTimeout(() => {
      // console.log('This will run after 1 second!')
      window.location.reload(false);
    }, 2000);
    return () => clearTimeout(timer);
   // window.location.href = "dashboard/tables/Licence";
}catch(error) {
  console.log(error)
}


 
}

    return (
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
          <h5 className="mb-4">Demande Licence </h5>
         
          {/* {state.map((person) => (
        <>
        
        
        </>))} */}
          <Form onSubmit={handlesubmit}>
          <div className="text-center"><p>{success}</p></div>
          {/* <Row>

          <Col md={4} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Nom</Form.Label>    
                  <Form.Control required  type="text" placeholder="nom" id="nom"  name="nom"
           autoComplete="off" value={nom}  onChange={(e) =>setNom(e.target.value)}
                    />
                 
                </Form.Group>
              </Col>
          </Row> */}
            <Row>
            {/* <Col md={4} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>N Licence</Form.Label>    
                  <Form.Control  type="text" placeholder="num_licences" id="num_licences"  name="num_licences"
           autoComplete="off" value={num_licences}  onChange={(e) =>setLicence(e.target.value)}
                    />
                 
                </Form.Group>
              </Col> */}
            <Col md={4} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Saison موسم</Form.Label>    
                  <Form.Select id="season" required name="season"  value={season}  onChange={(e) =>setSeason(e.target.value)}
                                  autoComplete="off" >
                                    {state.map((person) => (<>
                              <option value={person.id}> 
        {person.Seasons}</option>    </>   ))}
                  </Form.Select>
                 
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Dégre درجة</Form.Label>
                  <Form.Select id="Degree" required  name="degree"  value={degree}  onChange={(e) =>setDegree(e.target.value)}
                                  autoComplete="off" >
                                    {state2.map((person) => (<>
                              <option value={person.id}> 
        {person.Degree}</option>    </>   ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group id="lastName">
                  <Form.Label>grade رتبة</Form.Label>
                  <Form.Select id="grade" required name="grade"  value={grade}  onChange={(e) =>setGrade(e.target.value)}
                                  autoComplete="off" >
                                      <option></option>
                                    {state4.map((person) => (<>
                                  
                              <option value={person.id}> 
        {person.Grade}</option>    </>   ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row className="align-items-center">
          
            
              <Col sm={4} className="mb-3">
                <Form.Group id="weights">
                  <Form.Label>poid وزن</Form.Label>
                  <Form.Select id="weight" required name="weight"  value={weights}  onChange={(e) =>setWeights(e.target.value)}
                                  autoComplete="off" >
                                      <option></option>
                                    {state3.map((person) => (<>
                                  
                              <option value={person.id}> 
        {person.masse_en_killograme}</option>    </>   ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            
             
          
           
            
            <Col sm={4} className="mb-3">
            
            <Form.Group id="category">
                    <Form.Label>categorie age العمر</Form.Label>
                    <Form.Select id="categorie" required name="categorie"  value={categorie}  onChange={(e) =>setCategorie(e.target.value)}
                                  autoComplete="off" >
                                      <option></option>
                                    {state5.map((person) => (<>
                                  
                              <option value={person.id}> 
        {person.categorie_age}</option>    </>   ))}
                  </Form.Select>
                  </Form.Group>
            </Col>
            <Col sm={4} className="mb-3">
            
            <Form.Group id="category">
                    <Form.Label>Club النادي</Form.Label>
                    <Form.Select id="club"  required name="club"  value={club}  onChange={(e) =>setClub(e.target.value)}
                                  autoComplete="off" >
                                      <option></option>
                                    {state6.map((person) => (<>
                                  
                              <option value={person.id}> 
        {person.name}</option>    </>   ))}
                  </Form.Select>
                  </Form.Group>
                     
            {/* <Form.Group id="category">
                    <Form.Label>Ligue</Form.Label>
                    <Form.Select id="ligue"  name="ligue"  value={ligue}  onChange={(e) =>setLigue(e.target.value)}
                                  autoComplete="off" >
                                      <option></option>
                                    {state6.map((person) => (<>
                                  
                              <option value={person.id}> 
        {person.ligue}</option>    </>   ))}
                  </Form.Select>
                  </Form.Group> */}
            </Col>
            <Col sm={4} className="mb-3">
            
            <Form.Group id="category">
                    <Form.Label>Descipline الرياضة</Form.Label>
                    <Form.Select id="Disciplines" required name="Disciplines"  value={Disciplines}  onChange={(e) =>setDiscipline(e.target.value)}
                                  autoComplete="off" >
                                      <option></option>
                                    {state7.map((person) => (<>
                                  
                              <option value={person.id}> 
        {person.name}</option>    </>   ))}
                  </Form.Select>
                   
                  </Form.Group>
            </Col>
            <Col sm={4} className="mb-3">
            
            <Form.Group id="category">
                    <Form.Label>Profile</Form.Label>
                    <Form.Select id="role"  name="role" required value={role}  onChange={(e) =>setRole(e.target.value)}
                                  autoComplete="off" >
                                      <option></option>
                                    {state2.map((person) => (<>
                                  
                              <option value={person.id}> 
        {person.roles}</option>    </>   ))}
                  </Form.Select>
                  </Form.Group>
            </Col>
          </Row>
          <div className="mt-3">
              <Button variant="primary" type="submit">Ajouter</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    );

};
export default (Licenceadd);
