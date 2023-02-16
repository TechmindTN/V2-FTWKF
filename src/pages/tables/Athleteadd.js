
import React , {useEffect,useState,useRef} from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt} from "@fortawesome/free-solid-svg-icons";
import { Form, Col, Row, Card, Button, InputGroup,ProgressBar } from '@themesberg/react-bootstrap';
import axios from "../examples/api/axios";
import Datetime from "react-datetime";
const PARAMETER_URL='parameters/';
const LIGUE_URL='ligue/';
const ATHLETE_URL='add_athlete/';
import 'react-dropzone-uploader/dist/styles.css'
import { Phone } from "@mui/icons-material";
const Image_url='upload_photo/'
const Athleteadd = () =>{
const [selectedFile, setSelectedFile] = React.useState(null);
const [selectedFile1, setSelectedFile1] = React.useState(null);
const [selectedFile2, setSelectedFile2] = React.useState(null);
const [selectedFile3, setSelectedFile3] = React.useState(null);

const [progress, setProgress] = useState()
const [progress1, setProgress1] = useState()
const [progress2, setProgress2] = useState()
const [progress3, setProgress3] = useState()



const [addresse, setAddresse] = useState();
const [phone, setPhone] = useState();
const [zip_code, setZip] = useState();
const [first_name, setFname] = useState();
const [last_name, setLname] = useState();
const [birthday, setBirthday] = useState();
const [cin, setCin] = useState();
const [sexe, setSexe] = useState();
const [categorie, setCategorie] = useState();

const [degree, setDegree] = useState();
const [city, setCity] = useState();
const[weights,setWeights]=useState();
const[discipline,setDiscipline]=useState();
const[club,setClub]=useState();

const[grade,setGrade]=useState('');
const[success, setSuccess] = useState (false) ;
const [state,setState]=useState([]);
const [states,setStates]=useState([]);
const [state2,setState2]=useState([]);
const [state3,setState3]=useState([]);
const [state4,setState4]=useState([]);
const [state5,setState5]=useState([]);
const [state6,setState6]=useState([]);
const [state7,setState7]=useState([]);
const [state8,setState8]=useState([]);
const[errMsg, setErrMsg] = useState ('') ;


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
    const Roles=res.data.Roles;
    setState2(Degrees);
    setState3(Weights);
    setState4(Grades);
    setState(seasons);
    setState5(Categories);
    setState6(Clubs);
    setState7(Disciplines);
    setState8(Roles);
  
})},[])
useEffect(() => {
  axios.get(LIGUE_URL,``)
  .then(res => {
    const ligue = res.data;
    setState8(ligue);
})},[])

const handlesubmit = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token");
  const iden=localStorage.getItem('iden');
  const pr=localStorage.getItem('pr');
  const ph=localStorage.getItem('ph');
  const mid=localStorage.getItem('mid');
    axios.post(
      ATHLETE_URL,
      ({'athlete':{'club':club,'discipline':discipline,'id_degree':degree,'medical_photo':`https://41c5-197-14-10-36.eu.ngrok.io${mid} `,'grade_id':grade,'sex':sexe,'weights':weights,'category_id':categorie,'identity_photo':`https://41c5-197-14-10-36.eu.ngrok.io${iden} `,'photo':`https://41c5-197-14-10-36.eu.ngrok.io${ph} `},'user':{'username':phone,'password':phone},'profile':{'sexe':sexe,'first_name':first_name,'last_name':last_name,
      'country':'Tunisie','state':states,'city':city,'address':addresse,'zip_code':zip_code,'phone':phone,'birthday':birthday,
    'cin':cin,'role':'2','profile_photo':`https://41c5-197-14-10-36.eu.ngrok.io${pr} `}
      }),
       { headers: {'Content-Type': 'Application/json','Authorization':  `TOKEN ${token}`,
        'Access-Control-Allow-Origin':'Accept'} },
    ).then(res => {
     
      localStorage.setItem("at",res.data.athlete.id)
      console.log("num",res.data.athlete.id)
    //  history.push('/tables/LicenceAthlete')
      console.log(res)
      if(res.status==200||res.status==201){
      setSuccess(<div className="alert alert-success d-flex align-items-center" role="alert">
      <div>
      Athlete ajouté avec succès 
     </div>
    </div>);}
  const timer = setTimeout(() => {
    // console.log('This will run after 1 second!')
   // window.location.reload(false);
  }, 2000);
  return () => clearTimeout(timer);
  }).catch((e)=>{
    console.log(e.response.data.message)
    if(e?.response?.status=="500"){
      setSuccess('no Server response')
     } else if(e?.response?.status=="400") {
      setSuccess(<div className="alert alert-danger d-flex align-items-center" role="alert">
      <div>numero telephone déja existe </div></div>);
      } else if (e?.response?.status == "401"){
        setSuccess('unautherized');
     }else if (e?.response?.status == "404"){
      setSuccess("unautherized");
    } else{ setSuccess('Erreur');
    } 
    console.log("ay hgkaya")
   });
   



}


 return (
      
   
      <Row>
        <Form onSubmit={handlesubmit}>
        <Col xs={12} xl={12}>
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
          <h5 className="mb-4">Ajouter athlete </h5>

          <div className="text-center"><p>{success}</p></div>
          {/* <Row>
          <Col md={4} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Nom utilisateur</Form.Label>
                  <Form.Control   type="text" id="user" name="user" 
                  value={username}  onChange={(e) =>setUsername(e.target.value)}
                 
                  />
                </Form.Group>
          </Col>
          <Col md={4} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Mot de passe</Form.Label>
                  <Form.Control   type="text" id="pw" name="pw" 
                  value={password}  onChange={(e) =>setPassword(e.target.value)}
                 
                  />
                </Form.Group>
          </Col>
          <Col md={4} className="mb-3">
                <Form.Group id="Role">
                  <Form.Label>Role</Form.Label>
                  <Form.Select id="role"  name="role"  value={role}  onChange={(e) =>setRole(e.target.value)}
                                  autoComplete="off" >
                                    {state8.map((person) => (<>
                                  <option></option>
                              <option value={person.id}> 
        {person.roles}</option>    </>   ))}
                  </Form.Select>
                </Form.Group>
          </Col>
          </Row> */}
            <Row>
            <Col md={4} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>CIN ب ت و</Form.Label>
                  <Form.Control required  type="text" id="cin" name="cin" 
                  value={cin }  onChange={(e) =>setCin(e.target.value)}
                 
                  />
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Nom اسم</Form.Label>
                  <Form.Control  required type="text" id="first_name" name="first_name" placeholder="Nom" 
                     value={first_name }    onChange={(e) =>setFname(e.target.value)} 
                 
                  />
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group id="lastName">
                  <Form.Label>Prénom لقب</Form.Label>
                  <Form.Control required  type="text" id="last_name" name="last_name" placeholder="Prénom"
                           value={last_name}     onChange={(e) =>setLname(e.target.value)}
                         
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="align-items-center">
              <Col md={4} className="mb-3">
                <Form.Group id="birthday"  name="birthday" >
                  <Form.Label>Date de naissance تاريخ الميلاد</Form.Label>
                  <Datetime 
                  timeFormat={false}
                  onChange={setBirthday}
                  renderInput={(props, openCalendar) => (
                    <InputGroup>
                      <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                      <Form.Control
                        required
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
                  <Form.Label>Sexe جنس</Form.Label>
                  <Form.Select id="sex"  name="sex" required
                                  autoComplete="off" value={sexe}  onChange={(e) =>setSexe(e.target.value)}
                  >
                    <option ></option>
                    <option value="1">Femme</option>
                    <option value="2">Homme</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col sm={4} className="mb-3">
            
            <Form.Group id="category">
                    <Form.Label>Téléphone هاتف</Form.Label>
                    <Form.Control   type="text" id="phone" name="phone" required
                           value={phone}     onChange={(e) =>setPhone(e.target.value)}
                         
                  />
                  </Form.Group>
            </Col>
          
              </Row>
              <Row>
          
          <Col sm={4} className="mb-3">
          
          <Form.Group id="category">
                  <Form.Label>Ville مدينة</Form.Label>
                  <Form.Control   type="text" id="ville" name="ville" required
                           value={city}     onChange={(e) =>setCity(e.target.value)}
                         
                  />
                </Form.Group>
          </Col>
          <Col sm={4} className="mb-3">
          
          <Form.Group id="category">
                  <Form.Label>Addresse عنوان</Form.Label>
                  <Form.Control   type="text" id="addresse" name="addresse"  required
                           value={addresse}     onChange={(e) =>setAddresse(e.target.value)}
                         
                  />
                </Form.Group>
          </Col>
          <Col sm={4} className="mb-3">
            
            <Form.Group id="zip_code">
                    <Form.Label>Zip_code ترقيم البريدي</Form.Label>
                   <Form.Control   type="text" id="zip_code" name="zip_code" required
                           value={zip_code}     onChange={(e) =>setZip(e.target.value)}
                         
                  />
                  </Form.Group>
            </Col>
        </Row>
              <Row>
          <Col sm={4} className="mb-3">
            
            <Form.Group id="zip_code">
                    <Form.Label>Discipline الرياضة</Form.Label>
                    <Form.Select  required id="weight"  name="weight"  value={discipline}  onChange={(e) =>setDiscipline(e.target.value)}
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
                    <Form.Label>Gouvernerat ولاية</Form.Label>
                    <Form.Control   type="text" id="last_name" name="last_name" required
                           value={states}     onChange={(e) =>setStates(e.target.value)}
                         
                  />
                  </Form.Group>
            </Col>
            <Col sm={4} className="mb-3">
                <Form.Group id="club">
                  <Form.Label>club فريق</Form.Label>
                  <Form.Select  required id="club"  name="club"  value={club}  onChange={(e) =>setClub(e.target.value)}
                                  autoComplete="off" >
                                    <option></option>
                                    {state6.map((person) => (<>
                                  
                              <option value={person.id}> 
        {person.name}</option>    </>   ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            <Col sm={4} className="mb-3">
                <Form.Group id="weights">
                  <Form.Label>Poids وزن</Form.Label>
                  <Form.Select  required id="weight"  name="weight"  value={weights}  onChange={(e) =>setWeights(e.target.value)}
                                  autoComplete="off" >
                                    <option></option>
                                    {state3.map((person) => (<>
                                  
                              <option value={person.id}> 
        {person.masse_en_killograme}</option>    </>   ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col sm={4} className="mb-3">
            
            <Form.Group id="grade">
                    <Form.Label>Grade رتبة</Form.Label>
                    <Form.Select id="grade" required name="grade"  value={grade}  onChange={(e) =>setGrade(e.target.value)}
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
                    <Form.Label>Catégorie age العمر</Form.Label>
                    <Form.Select required id="categorie"  name="categorie"  value={categorie}  onChange={(e) =>setCategorie(e.target.value)}
                                  autoComplete="off" >
                                      <option></option>
                                    {state5.map((person) => (<>
                                  
                              <option value={person.id}> 
        {person.categorie_age}</option>    </>   ))}
                  </Form.Select>
                  </Form.Group>
            </Col>
          </Row>
              <Row>
          
         
            <Col sm={4} className="mb-3">
            
            <Form.Group id="degree">
                    <Form.Label>Degré درجة</Form.Label>
                    <Form.Select id="degree"  name="degree"  value={degree}  onChange={(e) =>setDegree(e.target.value)}
                                required  autoComplete="off" >
                                    <option></option>
                                    {state2.map((person) => (<>
                                  
                              <option value={person.id}> 
        {person.Degree}</option>    </>   ))}
                  </Form.Select>
                  </Form.Group>
            </Col>

          
          </Row>
        
          
          <div className="mt-3">
              <Button variant="primary" type="submit">Enregistrer</Button>
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
export default (Athleteadd);
