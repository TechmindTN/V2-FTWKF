
import React , {useEffect,useState,useRef} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faCalendarAlt} from "@fortawesome/free-solid-svg-icons";
import { Form, Col, Row,Card,Button,InputGroup } from '@themesberg/react-bootstrap';
import axios from "../examples/api/axios";
import Datetime from "react-datetime";
const at=localStorage.getItem("at")
const ARBITRE_URL=`edit_arbitrator_profile/${at}/`

const ArUpd = () =>{
  const[grade, setGrade] = useState();
  const[cin,setCin] = useState();
  const[phone,setPhone]=useState();
  const[first_name, setF_name] = useState () ;
  const[last_name, setL_name] = useState();
  const[sex, setSex] = useState();
  const[birthday, setBirthday] = useState();
  const[add, setAddresse] = useState([]);
  const[ville,setVille] = useState();
  const[gouv,setGouv] = useState();
  const[code,setCode] = useState();
  const[success,setSuccess] = useState();
  const[state2,setState2] = useState([]);
  const[state4,setState4] = useState([]);
  const handlesubmit = async (e) => {
  e.preventDefault();
const token = localStorage.getItem("token");
try {  const token = localStorage.getItem("token");
const ar= localStorage.getItem('ar')
const gr= localStorage.getItem('gr')
    axios.put(ARBITRE_URL,({'arbitrator':{'grade':grade},'profile':{'city':ville,'address':add,'sexe':sex,'phone':phone,'cin':cin,'first_name':first_name,'last_name':last_name,'sex':sex,'birthday':birthday,'country':"Tunisie",'role':1,'zip_code':code}}),
       { headers: {'Content-Type': 'application/json','Authorization':`TOKEN ${token}`,
        'Access-Control-Allow-Origin':'Accept'} },)
    setSuccess("Arbitre ajouté"); 
    const timer = setTimeout(() => {
      // console.log('This will run after 1 second!')
    //  window.location.reload(false);
    }, 2000);
    return () => clearTimeout(timer);
    //localStorage.removeItem("ar")
    //window.location.href = "dashboard/tables/Clubs";
  }catch(error) {  console.log(error)}}
  const at=localStorage.getItem("at");
  const ARB_URL=`arbitrator_info/${at}/`
  useEffect(() => {
  axios.get(ARB_URL,{
    headers: {'Content-Type': 'application/json','Authorization':` TOKEN ${window.localStorage.getItem("token")}`,  'Access-Control-Allow-Methods': 'Accept'},
    withCredentials: false
 })
  .then(res => {
    const persons = res.data;
    console.log(persons)
    setCin(persons.profile.cin)
    setF_name(persons.profile.first_name)
    setGrade(persons.arbitrator.grade)
    setL_name(persons.profile.last_name)
    setBirthday(persons.profile.birthday)
    setAddresse(persons.profile.address)
    setVille(persons.profile.city)
    setPhone(persons.profile.phone)
    setCode(persons.profile.zip_code)
    setGouv(persons.profile.state)  
})
  },[])
  const PARAMETER_URL='parameters/'
useEffect(() => {
  axios.get(PARAMETER_URL,``)
  .then(res => {
    const Grades=res.data.Grades;
    const Degrees=res.data.Degrees;
    setState2(Degrees);
    setState4(Grades);
})},[])
    return (
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
          <h5 className="mb-4">Modifier Arbitre </h5>
         <Form onSubmit={handlesubmit}>
          <div className="text-center"><p>{success}</p></div>
         
            <Row>
            <Col md={3} className="mb-3">
                <Form.Group id="cin">
                  <Form.Label>CIN</Form.Label>    
                  <Form.Control  type="text" id="cin" name="cin" 
                     value={cin}    onChange={(e) =>setCin(e.target.value)}                                    />
                </Form.Group>
                 
              </Col>
              
        
              <Col md={3} className="mb-3">
                <Form.Group id="lastName">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control  type="text" id="prenom" name="prenom"  value={first_name} onChange={(e) =>setF_name(e.target.value)} />
                </Form.Group>
              </Col>
              <Col md={3} className="mb-3">
                <Form.Group id="lastName">
                  <Form.Label>Prénom</Form.Label>
                  <Form.Control  type="text" id="prenom" name="prenom"
                     value={last_name}    onChange={(e) =>setL_name(e.target.value)}      />
                </Form.Group>
              </Col>
              <Col md={3} className="mb-3">
                <Form.Group id="lastName">
                  <Form.Label>Addresse</Form.Label>
                  <Form.Control  type="text" id="prenom" name="prenom"
                     value={add}    onChange={(e) =>setAddresse(e.target.value)}      />
                </Form.Group>
              </Col>
                 
            </Row>
            <Row className="align-items-center">
         <Col md={3} className="mb-3">
                <Form.Group id="sex">
                  <Form.Label>sex</Form.Label>
                  <Form.Select id="sex"  name="sex"autoComplete="off" value={sex}  onChange={(e) =>setSex(e.target.value)}       >
                    <option value="0"></option>
                    <option value="Femme">Femme</option>
                    <option value="Homme">Homme</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={3} className="mb-3">
              <Form.Group  >
                <Form.Label>Date de naissance</Form.Label>
                <Datetime
                  timeFormat={false}
                  onChange={setBirthday}
                  renderInput={(props, openCalendar) => (
                    <InputGroup>
                      <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                      <Form.Control
                        
                        type="date" id="birthday"  name="birthday"
                        placeholder="mm/dd/yyyy" value={birthday}
                        autoComplete="off" onChange={(e) =>setBirthday(e.target.value)}
                        />
                    </InputGroup>
                  )} />
              </Form.Group>
             
            </Col>
            <Col md={3} className="mb-3">
              <Form.Group  >
                <Form.Label>Numéro de téléphone</Form.Label>
                <Form.Control  type="text" id="phone" name="phone"
                     value={phone}    onChange={(e) =>setPhone(e.target.value)}      />
              </Form.Group>
             
            </Col>
            <Col md={3} className="mb-3">
              <Form.Group  >
                <Form.Label>ville</Form.Label>
                <Form.Control  type="text" id="phone" name="phone"
                     value={ville}    onChange={(e) =>setVille(e.target.value)}      />
              </Form.Group>
             
            </Col>
         
          
           

          </Row>
          <Row>
          <Col md={3} className="mb-3">
              <Form.Group  >
                <Form.Label>gouvernerat</Form.Label>
                <Form.Control  type="text" id="phone" name="phone"
                     value={gouv}    onChange={(e) =>setGouv(e.target.value)}      />
              </Form.Group>
             
            </Col>
            <Col md={3} className="mb-3">
              <Form.Group  >
                <Form.Label>code postal </Form.Label>
                <Form.Control  type="text" id="phone" name="phone"
                     value={code}    onChange={(e) =>setCode(e.target.value)}      />
              </Form.Group>
             
            </Col>  
            <Col md={3} className="mb-3">
              <Form.Group  >
                <Form.Label>Grade </Form.Label>
          
                      <Form.Select id="grade"  name="grade"autoComplete="off" value={grade}  onChange={(e) =>setGrade(e.target.value)}       >
                      {state4.map((person) => (<>
                                  
                                  <option value={person.id}> 
            {person.Grade}</option>    </>   ))}
                  </Form.Select>
              </Form.Group>
             
            </Col>
          </Row>
          <div className="mt-3">
              <Button variant="primary" type="submit">Ajouter</Button>
            </div>
          </Form><br/>
          
          {/* <Row>
          <Form onSubmit={submit}>
              <Col md={6} className="mb-3">
                <Form.Group id="cin">
                  <Form.Label>Photo d'identité : &nbsp;&nbsp;</Form.Label>    
                  <input type="file"   onChange={handleFileSelect}  required />
            <img src={file} width={80} required />
            {progress && <ProgressBar   now={progress} label={`${progress}%`} style={{ height: 20}} />}
            <div className="mt-3">
              <Button variant="primary" type="submit">Ajouter identité</Button>
            </div>
                </Form.Group>
                
              </Col></Form>
              <Form onSubmit={submit1}>
              <Col md={6} className="mb-3">
                <Form.Group id="lastName">
                  <Form.Label>Grade Arbitrage :&nbsp;&nbsp;</Form.Label>
                  <input type="file"   onChange={handleFileSelect1}  required />
            <img src={file1} width={80} required />
            {progress1 && <ProgressBar   now={progress1} label={`${progress1}%`} style={{ height: 20}} />}
            <div className="mt-3">
              <Button variant="primary" type="submit">Ajouter Grade Arbitrage</Button>
            </div>
                </Form.Group>
              </Col>
              
            </Form>

            </Row> */}
        </Card.Body>
      </Card>
    );

};
export default (ArUpd);
