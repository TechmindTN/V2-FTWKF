
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
const PARAMETER_URL='parameters/'

const ATHLETE_URL=`athlete/${localStorage.getItem("at")}/`

const Athleteadd = () =>{
const[datas,setData]=useState('');
const [showDefault, setShowDefault] = useState(false);
const handleClose = () => setShowDefault(false);

const[id,setId]=useState([])
const errRef = useRef();

const [first_name, setFname] = useState();
const [last_name, setLname] = useState();
const [birthday, setBirthday] = useState();
const [cin, setCin] = useState();
const [sexe, setSexe] = useState();
const [categorie, setCategorie] = useState();
const [licences, setLicences] = useState();
const[weights,setWeights]=useState();
const[nationality,SetNationality]=useState('');
const[grade,setGrade]=useState('');
const[success, setSuccess] = useState (false) ;
const [state,setState]=useState([]);
const [state2,setState2]=useState([]);
const [state3,setState3]=useState([]);
const [state4,setState4]=useState([]);
const [state5,setState5]=useState([]);
const [state6,setState6]=useState([]);
const [state7,setState7]=useState([]);
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
const handlesubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("first_name", first_name);
  formData.append("last_name", last_name);
  formData.append("cin", cin);
  formData.append("birthday", birthday);
  formData.append("sex", sexe);
  formData.append("category_id", categorie);
  formData.append("weights", weights);
  formData.append("nationality", nationality);
  formData.append("grade_id", grade);
  const headers = { 
    'Authorization':  `TOKEN ${token}`,
    'Content-Type':'multipart/form-data',
    'Access-Control-Allow-Origin':'Accept'
};
try {
  const token = localStorage.getItem("token");

    axios.put(
      ATHLETE_URL,
       formData,
       { headers: {'Content-Type': 'multipart/form-data','Authorization':  `TOKEN ${token}`,
        'Access-Control-Allow-Origin':'Accept'} },
    )
    setSuccess("Athlete modifié");
    window.location.href = "http://localhost:3000/#/tables/Athletes";
    localStorage.removeItem("at");
 
}catch(error) {
  console.log(error)
}


 
}

    return (
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
          <h5 className="mb-4">Ajouter athlete </h5>
       
          <Form onSubmit={handlesubmit}>
          <div className="text-center"><p>{success}</p></div>
            <Row>
            <Col md={4} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>CIN</Form.Label>
                  <Form.Control  type="text" id="cin" name="cin" 
                  value={cin }  onChange={(e) =>setCin(e.target.value)}
                 
                  />
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control  type="text" id="first_name" name="first_name" placeholder="Nom" 
                     value={first_name }    onChange={(e) =>setFname(e.target.value)} 
                 
                  />
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group id="lastName">
                  <Form.Label>Prénom</Form.Label>
                  <Form.Control  type="text" id="last_name" name="last_name" placeholder="Prénom"
                           value={last_name}     onChange={(e) =>setLname(e.target.value)}
                         
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="align-items-center">
              <Col md={4} className="mb-3">
                <Form.Group id="birthday"  name="birthday" >
                  <Form.Label>Date de naissance</Form.Label>
                  <Datetime
                  timeFormat={false}
                  onChange={setBirthday}
                  renderInput={(props, openCalendar) => (
                    <InputGroup>
                      <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                      <Form.Control
                        
                        type="date" id="birthday"  name="birthday"
                        placeholder="mm/dd/yyyy" value={birthday? birthday : "--/--/----"}
                        autoComplete="off" onChange={(e) =>setBirthday(e.target.value)}
                        />
                    </InputGroup>
                  )} />
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group id="sex">
                  <Form.Label>Sexe</Form.Label>
                  <Form.Select id="sex"  name="sex"
                                  autoComplete="off" value={sexe}  onChange={(e) =>setSexe(e.target.value)}
                  >
                    <option value="0">sex</option>
                    <option value="1">Femme</option>
                    <option value="2">Homme</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            
              <Col sm={4} className="mb-3">
                <Form.Group id="weights">
                  <Form.Label>Poids</Form.Label>
                  <Form.Select id="weight"  name="weight"  value={weights}  onChange={(e) =>setWeights(e.target.value)}
                                  autoComplete="off" >
                                      <option></option>
                                    {state3.map((person) => (<>
                                  
                              <option value={person.id}> 
        {person.masse_en_killograme}</option>    </>   ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              </Row>
              <Row>
             
          
              <Col sm={4} className="mb-3">
            
            <Form.Group id="nationality">
                    <Form.Label>Nationalité</Form.Label>
                    <Form.Control  type="text" placeholder="Nationalité" id="Nationalité"  name="Nationalité"
           autoComplete="off"  value={nationality}  onChange={(e) =>SetNationality(e.target.value)}
                    />
                  </Form.Group>
            </Col>
            <Col sm={4} className="mb-3">
            
            <Form.Group id="grade">
                    <Form.Label>Grade</Form.Label>
                    <Form.Select id="grade"  name="grade"  value={grade}  onChange={(e) =>setGrade(e.target.value)}
                                  autoComplete="off" >
                                      <option></option>
                                    {state4.map((person) => (<>
                                  
                              <option value={person.id}> 
        {person.Grade}</option>    </>   ))}
                  </Form.Select>
                  </Form.Group>
            </Col>
            <Col sm={4} className="mb-3">
            
            <Form.Group id="category">
                    <Form.Label>Catégorie</Form.Label>
                    <Form.Select id="categorie"  name="categorie"  value={categorie}  onChange={(e) =>setCategorie(e.target.value)}
                                  autoComplete="off" >
                                      <option></option>
                                    {state5.map((person) => (<>
                                  
                              <option value={person.id}> 
        {person.categorie_age}</option>    </>   ))}
                  </Form.Select>
                  </Form.Group>
            </Col>
          </Row>
          <div className="mt-3">
              <Button variant="primary" type="submit">Enregistrer</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    );

};
export default (Athleteadd);
