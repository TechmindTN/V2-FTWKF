
import React , {useEffect,useState,useRef} from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt} from "@fortawesome/free-solid-svg-icons";
import { Form, Col, Row, Card, Button, InputGroup,ProgressBar } from '@themesberg/react-bootstrap';
import axios from "../examples/api/axios";
import Datetime from "react-datetime";
const PARAMETER_URL='parameters/';
const LIGUE_URL='ligue/';
const COMP_URL='competition/';
import 'react-dropzone-uploader/dist/styles.css'
import { Phone } from "@mui/icons-material";
const Image_url='upload_photo/'
const CompUpd = () =>{
const [selectedFile, setSelectedFile] = React.useState(null);
const [selectedFile1, setSelectedFile1] = React.useState(null);
const [selectedFile2, setSelectedFile2] = React.useState(null);
const [selectedFile3, setSelectedFile3] = React.useState(null);


const [addresse, setAddresse] = useState();
const [zip_code, setZip] = useState();
const [ligue, setLigue] = useState();
const [Max_attendants, setMax_attendants] = useState();
const [categorie, setCategorie] = useState();
const [sport, setSport] = useState();
const [Max_participants, setMax_participants] = useState();
const [city, setCity] = useState();
const[name,setName]=useState();
const[duration,setDuration]=useState();
const[season,setSeason]=useState();
const[arb,setArb]=useState([]);

const[success, setSuccess] = useState (false) ;
const [state,setState]=useState([]);
const [states,setStates]=useState([]);
const [state5,setState5]=useState([]);
const [state7,setState7]=useState([]);
const [state8,setState8]=useState([]);
const [state9,setState9]=useState([]);

useEffect(() => {
  axios.get(PARAMETER_URL,``)
  .then(res => {
    const seasons = res.data.Seasons;
    const Categories = res.data.Categories;
    const Disciplines=res.data.Disciplines;
    setState(seasons);
    setState5(Categories);
    setState7(Disciplines);
    setState9(seasons);
  
})},[])
useEffect(() => {
  axios.get(LIGUE_URL,``)
  .then(res => {
    const ligue = res.data;
    setState8(ligue);
})},[])


const comp=localStorage.getItem("comp");
const COMP_URL=`comp_info/${comp}/`
const COMPs_URL=`competition/${comp}/`
useEffect(() => {
  axios.get(COMP_URL,{
    headers: {'Content-Type': 'application/x-www-form-urlencoded','Authorization':` TOKEN ${window.localStorage.getItem("token")}`,  'Access-Control-Allow-Methods': 'Accept'},
    withCredentials: false
 })  .then(res => {
  const persons = res.data;
  console.log(persons)
  // setGrade(persons.athlete.grade_id)
  // setCategorie(persons.athlete.category_id)
  // setWeights(persons.athlete.weights)
  // SetNationality("Tunisienne")
  // setIm1(persons.athlete.photo)
  // setIm2(persons.athlete.identity_photo)
  // setIm3(persons.athlete.medical_photo)
  // setCin(persons.profile.cin)
  // setFname(persons.profile.first_name)
  // setLname(persons.profile.last_name)
  // setBirthday(persons.profile.birthday)
  // setRole(persons.profile.role)
   setAddresse(persons.address)
   setSport(persons.discipline)
  setCategorie(persons.age)
  setDuration(persons.duration)
  setName(persons.name)
  setStates(persons.location)
  setCity(persons.city)
  setZip(persons.zip_code)
  setMax_attendants(persons.max_attendents)
  setMax_participants(persons.max_participants)
  // setPhone(persons.profile.phone)
  // setCode(persons.profile.zip_code)
  // setGouv(persons.profile.state)  
})
},[])

const handlesubmit = async (e) => {
  e.preventDefault();
try {
const token=localStorage.getItem("token")

    axios.put(
      COMPs_URL,
      ({'name':name,'duration':duration,'max_participants':Max_participants,'max_attendents':Max_attendants,'country':"Tunisie",'state':city
      ,'address':addresse,'zip_code':zip_code ,'location':states,'age':categorie,'season':season,'discipline':sport,'arbitrators':arb}),
       { headers: {'Content-Type': 'Application/json','Authorization':  `TOKEN ${token}`,
        'Access-Control-Allow-Origin':'Accept'} },
    ) 
    setSuccess(<div className="alert alert-success d-flex align-items-center" role="alert">
    <div>
    Compétition ajouté avec succès 
   </div>
  </div>);

  
    // window.location.href = "/tables/Athletes/"
}catch(error) {
  setSuccess(error)
}
}
    return (
      <Row>
        <Form onSubmit={handlesubmit}>
        <Col xs={12} xl={12}>
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
          <h5 className="mb-4">Ajouter Compétition </h5>
          <div className="text-center"><p>{success}</p></div>
         
            <Row>
              {/* <Col md={4} >
              <input
        type="text"
        //parse the string input
        onChange={e => setArb(JSON.parse(e.target.value))}
        className="form-control" value={arb}
        //notice the array bracket '[' and ']'
      />
              </Col> */}
            <Col md={4} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Nom Compétition </Form.Label>
                  <Form.Control   type="text" id="cin" name="cin" required
            
            value={name}     onChange={(e) =>setName(e.target.value)}
                  />
                </Form.Group>
              </Col>
             
              <Col md={4} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Descipline </Form.Label>
                  <Form.Select required id="sport"  name="sport"  value={sport}  onChange={(e) =>setSport(e.target.value)}
                                  autoComplete="off" >
                                      <option>{sport} </option>
                                    {state7.map((person) => (<>
                                  
                              <option value={person.id}> 
        {person.name}</option>    </>   ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group id="lastName">
                  <Form.Label>Lieu</Form.Label>
                  <Form.Control   required type="text" id="last_name" name="last_name"
                           value={states}     onChange={(e) =>setStates(e.target.value)}
                         
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="align-items-center">
            <Col md={4} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Durée </Form.Label>
                  <Form.Control   type="text" id="cin" name="cin" 
            required
            value={duration}     onChange={(e) =>setDuration(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group id="Age"  name="Age" >
                  <Form.Label>Age</Form.Label>
                  <Form.Select id="age"  name="categorie"  value={categorie}  onChange={(e) =>setCategorie(e.target.value)}
                             required     autoComplete="off" >
                                      <option>{categorie}</option>
                                    {state5.map((person) => (<>
                                  
                              <option value={person.id}> 
        {person.categorie_age}</option>    </>   ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group id="sex">
                  <Form.Label>Max_attendants</Form.Label>
                  <Form.Control required  type="text" id="Max_attendants" name="Max_attendants" 
                 value={Max_attendants}  onChange={(e) =>setMax_attendants(e.target.value)}
                  />
                </Form.Group>
              </Col>
            
          
              </Row>
              <Row>
              <Col sm={4} className="mb-3">
            
            <Form.Group id="category">
                    <Form.Label>Maximum participants</Form.Label>
                    <Form.Control required  type="text" id="Max_participants" name="Max_participants"
                           value={Max_participants}     onChange={(e) =>setMax_participants(e.target.value)}
                         
                  />
                  </Form.Group>
            </Col>
          <Col sm={4} className="mb-3">
          
          <Form.Group id="category">
                  <Form.Label>Ville</Form.Label>
                  <Form.Control   required type="text" id="ville" name="ville"
                           value={city}     onChange={(e) =>setCity(e.target.value)}
                         
                  />
                </Form.Group>
          </Col>
          <Col sm={4} className="mb-3">
          
          <Form.Group id="category">
                  <Form.Label>Ligue</Form.Label>
                  <Form.Select  id="ligue"  name="ligue"  value={ligue}  onChange={(e) =>setLigue(e.target.value)}
                               required   autoComplete="off" >
                                      <option>{ligue}</option>
                                    {state8.map((person) => (<>
                                  
                              <option value={person.id}> 
        {person.name}</option>    </>   ))}
                  </Form.Select>
                </Form.Group>
          </Col>
       
        </Row>
              <Row>
              <Col sm={4} className="mb-3">
            
            <Form.Group id="zip_code">
                    <Form.Label>Saison</Form.Label>
                    <Form.Select id="saison"  name="saison"  value={season}  onChange={(e) =>setSeason(e.target.value)}
                               required   autoComplete="off" >
                                      
                                    {state9.map((person) => (<>
                                  
                              <option value={person.id}> 
        {person.Seasons}</option>    </>   ))}
                  </Form.Select>
                  </Form.Group>
            </Col>
              <Col sm={4} className="mb-3">
          
          <Form.Group id="addresse">
                  <Form.Label>Addresse</Form.Label>
                  <Form.Control   type="text" id="addresse" name="addresse" 
                        required   value={addresse}     onChange={(e) =>setAddresse(e.target.value)}
                         
                  />
                </Form.Group>
          </Col>
          <Col sm={4} className="mb-3">
            
            <Form.Group id="zip_code">
                    <Form.Label>Zip_code</Form.Label>
                   <Form.Control   type="text" id="zip_code" name="zip_code" 
                          required value={zip_code}     onChange={(e) =>setZip(e.target.value)}
                         
                  />
                  </Form.Group>
            </Col>
       
         
           
          </Row>
        <Row>
          </Row> 
          <div className="mt-3">
              <Button variant="primary" type="submit">Modifier  Compétition </Button>
            </div>
        </Card.Body>
      </Card></Col>
        </Form>
  
      {/* <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
        
      
      <Row>
      <Form onSubmit={submit}>
      <Col sm={4}>
            <div className="App">
            <h5>Ajouter  photo de profile :</h5>
            <input type="file" onChange={handleFileSelect}   />
            <img src={file}  height={80}/><br/>
            {progress && <ProgressBar   now={progress} label={`${progress}%`} style={{ height: 20}} />}
        </div>
        </Col>
        <div className="mt-3" >
              <Button variant="primary" type="submit">Enregistrer</Button>
            </div> <br/></Form> 
            <Form onSubmit={submit1}>
      <Col sm={4}>
            <div className="App">
            <h5>Ajouter  Identité  :</h5>
            <input type="file" onChange={handleFileSelect1}   />
            <img src={file1}  height={80}/>
          
            {progress1 && <ProgressBar   now={progress1} label={`${progress1}%`} style={{ height: 20}} />}
        </div>
        </Col>
        <div className="mt-3" >
              <Button variant="primary" type="submit">Enregistrer</Button>
            </div><br></br>
        </Form></Row>
        <Form onSubmit={submit2}>
        <Col sm={4}>
            <div className="App">
            <h5>Ajouter Image مضمون ولادة :</h5>
            <input type="file" onChange={handleFileSelect2}   />
            <img src={file2}  height={80}/>
            
            {progress2 && <ProgressBar   now={progress2} label={`${progress2}%`} style={{ height: 20}} />}
        </div>
        </Col>
        <div className="mt-3" >
              <Button variant="primary" type="submit">Enregistrer</Button>
            </div><br></br>
        </Form>
        <Form onSubmit={submit3}>

        <Col sm={4}>
            <div className="App">
            <h5>Ajouter  Fiche médicale:</h5>
            <input type="file" onChange={handleFileSelect3}   />
            <img src={file3}  height={80}/>
     
            {progress3 && <ProgressBar   now={progress3} label={`${progress3}%`} style={{ height: 20}} />}
        </div>
        </Col>
        <div className="mt-3" >
              <Button variant="primary" type="submit">Enregistrer</Button>
            </div>
        </Form>

        </Card.Body></Card> */}
      
      {/* <Col xs={12} xl={4}>
      <Row>
            <Col xs={12}>
              <ProfileCardWidget />
            </Col>
            
          </Row>
        </Col> */}
        </Row>
         
          
          
    );

};
export default (CompUpd);
