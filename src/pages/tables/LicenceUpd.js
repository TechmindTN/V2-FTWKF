
import React , {useEffect,useState,useRef} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { Form, Col, Row, Nav, Card, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup, Modal,InputGroup } from '@themesberg/react-bootstrap';
import axios from "../examples/api/axios";
import Datetime from "react-datetime";
const PARAMETER_URL='parameters/'
import {useHistory  } from "react-router-dom";

const LicenceUpd = () =>{
  const history = useHistory()

const[datas,setData]=useState('');
const [showDefault, setShowDefault] = useState(false);
const handleClose = () => setShowDefault(false);
const [first_name, setFname] = useState();
const [last_name, setLname] = useState();
const [birthday, setBirthday] = useState();
const [cin, setCin] = useState();
const [sexe, setSexe] = useState();
const [categorie, setCategorie] = useState();
const [ville, setVille] = useState();
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
const [addresse,setAddresse]=useState();
const [Role,setRole]=useState();
const [phone,setPhone]=useState();
const [code,setCode]=useState();
const [gouv,setGouv]=useState();
const [club,setClub]=useState();
const [sport,setSport]=useState();
const [user,setUser]=useState()

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
    console.log(res.data)
    setState2(Degrees);
    setState3(Weights);
    setState4(Grades);
    setState(seasons);
    setState5(Categories);
    setState6(Clubs);
    setState7(Disciplines);
})},[])
const lic=localStorage.getItem("lic");
const LICENCE_URL=`licence_info/${lic}/`
useEffect(() => {
  axios.get(LICENCE_URL,{
    headers: {'Content-Type': 'application/x-www-form-urlencoded','Authorization':` TOKEN ${window.localStorage.getItem("token")}`,  'Access-Control-Allow-Methods': 'Accept'},
    withCredentials: false
 })
  .then(res => {
    const persons = res.data;
    console.log(persons)
     setGrade(persons.grade)
     setCategorie(persons.categorie)
     setWeights(persons.weight)
     SetNationality("Tunisienne")
     setCin(persons.profile.cin)
     setFname(persons.profile.first_name)
     setLname(persons.profile.last_name)
     setBirthday(persons.profile.birthday)
     setRole(persons.role)
     setAddresse(persons.profile.address)
     setVille(persons.profile.city)
     setPhone(persons.profile.phone)
     setCode(persons.profile.zip_code)
     setGouv(persons.profile.state)
     setClub(persons.club)
     setSport(persons.discipline)
     setUser(persons.user)
     setSexe(persons.profile.sexe)
})
},[])
const handlesubmit = async (e) => {
  e.preventDefault();
 
try {
  const lic=localStorage.getItem("lic");
  const LICENCEs=`licences/${lic}/`
  const token = localStorage.getItem("token");
    axios.put(
      LICENCEs,
      ({'num_licences':lic,'grade':grade,'categorie':categorie,'club':club,'discipline':sport,'weight':weights,
      'user':{'first_name':first_name,'last_name':last_name,'user':user,'sexe':sexe,
         'country':'Tunisie','state':gouv,'address':addresse,'zip_code':code,'phone':phone,'birthday':birthday,
       'cin':cin}
    }), { headers: {'Content-Type': 'Application/json','Authorization':  `TOKEN ${token}`,
        'Access-Control-Allow-Origin':'Accept'} },
    )
    setSuccess(<div className="alert alert-success d-flex align-items-center" role="alert">
    <div>Licence modifié</div></div>);
          const timer = setTimeout(() => {
            // console.log('This will run after 1 second!')
       //     history.push('/tables/Licence')
          }, 2000);
          return () => clearTimeout(timer);
   // window.location.href = "http://localhost:3000/#/tables/Athletes";
  // localStorage.removeItem("at");
 
}catch(error) {
  console.log(error)
}



 
}

    return (
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
          <h5 className="mb-4">Modifier Licence </h5>
       
          <Form onSubmit={handlesubmit}>
          <div className="text-center"><p>{success}</p></div>
            <Row>
            <Col md={3} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>CIN</Form.Label>
                  <Form.Control  type="text" id="cin" name="cin" 
                  value={cin }  onChange={(e) =>setCin(e.target.value)}
                 
                  />
                </Form.Group>
              </Col>
              <Col md={3} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control  type="text" id="first_name" name="first_name" placeholder="Nom" 
                     value={first_name }    onChange={(e) =>setFname(e.target.value)} 
                 
                  />
                </Form.Group>
              </Col>
              <Col md={3} className="mb-3">
                <Form.Group id="lastName">
                  <Form.Label>Prénom</Form.Label>
                  <Form.Control  type="text" id="last_name" name="last_name" placeholder="Prénom"
                           value={last_name}     onChange={(e) =>setLname(e.target.value)}
                         
                  />
                </Form.Group>
              </Col>
              <Col md={3} className="mb-3">
                <Form.Group id="lastName">
                  <Form.Label>Role</Form.Label>
                  <Form.Control  type="text" id="last_name" name="last_name" placeholder="Prénom"
                           value={Role}     onChange={(e) =>setRole(e.target.value)}
                         
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="align-items-center">
              <Col md={3} className="mb-3">
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
              <Col md={3} className="mb-3">
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
            
              <Col sm={3} className="mb-3">
                <Form.Group id="weights">
                  <Form.Label>Addresse</Form.Label>
                  <Form.Control  type="text"  id="addresse"  name="addresse"
           autoComplete="off"  value={addresse}  onChange={(e) =>setAddresse(e.target.value)}
                    />
                </Form.Group>
              </Col>
              <Col sm={3} className="mb-3">
                <Form.Group id="weights">
                  <Form.Label>Poids</Form.Label>
                  <Form.Select id="weight"  name="weight"  value={weights}  onChange={(e) =>setWeights(e.target.value)}
                                  autoComplete="off" >
                                      
                                    {state3.map((person) => (<>
                                  
                              <option value={person.id}> 
        {person.masse_en_killograme}</option>    </>   ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              </Row>
              <Row>
             
          
              <Col sm={3} className="mb-3">
            
            <Form.Group id="nationality">
                    <Form.Label>Nationalité</Form.Label>
                    <Form.Control  type="text" placeholder="Nationalité" id="Nationalité"  name="Nationalité"
           autoComplete="off"  value={nationality}  onChange={(e) =>SetNationality(e.target.value)}
                    />
                  </Form.Group>
            </Col>
            <Col sm={3} className="mb-3">
            
            <Form.Group id="grade">
                    <Form.Label>Grade</Form.Label>
                    <Form.Select id="grade"  name="grade"  value={grade}  onChange={(e) =>setGrade(e.target.value)}
                                  autoComplete="off" >
                                      <option>{grade} </option>
                                    {state4.map((person) => (<>
                                  
                              <option value={person.id}> 
        {person.Grade}</option>    </>   ))}
                  </Form.Select>
                  </Form.Group>
            </Col>
            <Col sm={3} className="mb-3">
            
            <Form.Group id="category">
                    <Form.Label>Catégorie</Form.Label> 
                    <Form.Select id="categorie"  name="categorie"  value={categorie}  onChange={(e) =>setCategorie(e.target.value)}
                                  autoComplete="off" >
                                      <option> {categorie}  </option>
                                    {state5.map((person) => (<>
                                  
                              <option value={person.id}> 
        {person.categorie_age}</option>    </>   ))}
                  </Form.Select>
                  </Form.Group>
            </Col>
            <Col sm={3} className="mb-3">
            
            <Form.Group id="category">
                    <Form.Label>Ville</Form.Label>
                    <Form.Control  type="text" id="ville"  name="ville"
           autoComplete="off"  value={ville}  onChange={(e) =>setVille(e.target.value)}
                    />
                  </Form.Group>
            </Col>
          </Row>
          <Row>
          <Col sm={3} className="mb-3">
            
            <Form.Group id="category">
                    <Form.Label>Téléphone :</Form.Label>
                    <Form.Control  type="text" id="phone"  name="phone"
           autoComplete="off"  value={phone}  onChange={(e) =>setPhone(e.target.value)}
                    />
                  </Form.Group>
            </Col>
            <Col sm={3} className="mb-3">
            
            <Form.Group id="category">
                    <Form.Label>Gouvernerat :</Form.Label>
                    <Form.Control  type="text" id="gouv"  name="gouv"
           autoComplete="off"  value={gouv}  onChange={(e) =>setGouv(e.target.value)}
                    />
                  </Form.Group>
            </Col>
            <Col sm={3} className="mb-3">
            
            <Form.Group id="category">
                    <Form.Label>Code Postal :</Form.Label>
                    <Form.Control  type="text" id="code"  name="code"
           autoComplete="off"  value={code}  onChange={(e) =>setCode(e.target.value)}
                    />
                  </Form.Group>
            </Col>
            
          </Row>
          <Row>
          <Col sm={3} className="mb-3">
            
            <Form.Group id="category">
                    <Form.Label>Discipline :</Form.Label>
                    <Form.Select id="sport"  name="sport"  value={sport}  onChange={(e) =>setSport(e.target.value)}
                                  autoComplete="off" >
                                      <option>{sport} </option>
                                    {state7.map((person) => (<>
                                  
                              <option value={person.id}> 
        {person.name}</option>    </>   ))}
                  </Form.Select>
                  </Form.Group>
            </Col>
            <Col sm={3} className="mb-3">
            
            <Form.Group id="category">
                    <Form.Label>Club :</Form.Label>
                    <Form.Select id="club"  name="club"  value={club}  onChange={(e) =>setClub(e.target.value)}
                                  autoComplete="off" >
                                      <option>{club} </option>
                                    {state6.map((person) => (<>
                                  
                              <option value={person.id}> 
        {person.name}</option>    </>   ))}
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
export default (LicenceUpd);
