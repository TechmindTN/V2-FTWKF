
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

const [file, setFile] = useState();
const [file1, setFile1] = useState();
const [file2, setFile2] = useState();
const [file3, setFile3] = useState();

const [addresse, setAddresse] = useState();
const [phone, setPhone] = useState();
const [zip_code, setZip] = useState();
const [first_name, setFname] = useState();
const [last_name, setLname] = useState();
const [birthday, setBirthday] = useState();
const [cin, setCin] = useState();
const [sexe, setSexe] = useState();
const [categorie, setCategorie] = useState();
const [username, setUsername] = useState();
const [password, setPassword] = useState();
const [degree, setDegree] = useState();
const [city, setCity] = useState();
const[weights,setWeights]=useState();
const[role,setRole]=useState();
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
const submit = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem("token");
    const formData2 = new FormData();
  
    formData2.append("url",selectedFile);
    formData2.append("path","image/profile/");
    formData2.append("user",localStorage.getItem('id'));
    formData2.append("season",'2');
      axios.post(
        Image_url,
         formData2,
         { headers: {"Content-Type": "multipart/form-data" ,'Authorization':  `TOKEN ${token}`,
          'Access-Control-Allow-Origin':'Accept'}  ,onUploadProgress: data => {
            //Set the progress value to show the progress bar
            setProgress(Math.round((100 * data.loaded) / data.total))
          },},
      ).then((value) => {
        const url= value.data.url;
        localStorage.setItem('pr',url) 
      }
        )
  }catch(error) {
    console.log(error)
  }
}
const submit1 = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem("token");
    const formData2 = new FormData();
  
    formData2.append("url",selectedFile1);
    formData2.append("path","image/athlete/identity");
    formData2.append("user",localStorage.getItem('id'));
    formData2.append("season",'2');
      axios.post(
        Image_url,
         formData2,
         { headers: {"Content-Type": "multipart/form-data" ,'Authorization':  `TOKEN ${token}`,
          'Access-Control-Allow-Origin':'Accept'}  ,onUploadProgress: data => {
            //Set the progress value to show the progress bar
            setProgress1(Math.round((100 * data.loaded) / data.total))
          },},
      ).then((value) => {
        const url= value.data.url;
        localStorage.setItem('iden',url) 
      }
        )
  }catch(error) {
    console.log(error)
  }
}
const submit2 = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem("token");
    const formData2 = new FormData();
  
    formData2.append("url",selectedFile2);
    formData2.append("path","image/athlete/photo");
    formData2.append("user",localStorage.getItem('id'));
    formData2.append("season",'2');
      axios.post(
        Image_url,
         formData2,
         { headers: {"Content-Type": "multipart/form-data" ,'Authorization':  `TOKEN ${token}`,
          'Access-Control-Allow-Origin':'Accept'}  ,onUploadProgress: data => {
            //Set the progress value to show the progress bar
            setProgress2(Math.round((100 * data.loaded) / data.total))
          },},
      ).then((value) => {
        const url= value.data.url;
        localStorage.setItem('im',url) 
      }
        )
  }catch(error) {
    console.log(error)
  }
}
const submit3 = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem("token");
    const formData2 = new FormData();
  
    formData2.append("url",selectedFile3);
    formData2.append("path","image/athlete/medical");
    formData2.append("user",localStorage.getItem('id'));
    formData2.append("season",'2');
      axios.post(
        Image_url,
         formData2,
         { headers: {"Content-Type": "multipart/form-data" ,'Authorization':  `TOKEN ${token}`,
          'Access-Control-Allow-Origin':'Accept'}  ,onUploadProgress: data => {
            //Set the progress value to show the progress bar
            setProgress3(Math.round((100 * data.loaded) / data.total))
          },},
      ).then((value) => {
        const url= value.data.url;
        localStorage.setItem('mid',url) 
      }
        )
  }catch(error) {
    console.log(error)
  }
}
const handlesubmit = async (e) => {
  e.preventDefault();
try {
  const token = localStorage.getItem("token");
  const iden=localStorage.getItem('iden');
  const pr=localStorage.getItem('pr');
  const im=localStorage.getItem('im');
  const mid=localStorage.getItem('mid');

    axios.post(
      ATHLETE_URL,
      ({'athlete':{'id_degree':degree,'medical_photo':`https://c3dd-197-14-10-36.ngrok.io${mid} `,'grade_id':grade,'sex':sexe,'weights':weights,'categorie_id':categorie,'identity_photo':`https://c3dd-197-14-10-36.ngrok.io${iden} `,'photo':`https://c3dd-197-14-10-36.ngrok.io${im} `},'user':{'username':username,'password':password},'profile':{'first_name':first_name,'last_name':last_name,
      'country':'Tunisie','state':states,'city':city,'address':addresse,'zip_code':zip_code,'phone':phone,'birthday':birthday,
    'cin':cin,'role':role,'profile_photo':`https://c3dd-197-14-10-36.ngrok.io${pr} `}
      }),
       { headers: {'Content-Type': 'Application/json','Authorization':  `TOKEN ${token}`,
        'Access-Control-Allow-Origin':'Accept'} },
    )
    setSuccess(<div class="alert alert-success d-flex align-items-center" role="alert">
    <div>
    Athlete ajouté avec succès 
   </div>
  </div>);

  
    // window.location.href = "/tables/Athletes/"
}catch(error) {
  setSuccess(error)
}


}


function handleFileSelect(e) {
  console.log(e.target.files);
  setFile(URL.createObjectURL(e.target.files[0]));
  setSelectedFile(e.target.files[0])
}
function handleFileSelect1(e) {
  console.log(e.target.files);
  setFile1(URL.createObjectURL(e.target.files[0]));
  setSelectedFile1(e.target.files[0])
}
function handleFileSelect2(e) {
  console.log(e.target.files);
  setFile2(URL.createObjectURL(e.target.files[0]));
  setSelectedFile2(e.target.files[0])
}
function handleFileSelect3(e) {
  console.log(e.target.files);
  setFile3(URL.createObjectURL(e.target.files[0]));
  setSelectedFile3(e.target.files[0])
}
    return (
      
   
      <Row>
        <Form onSubmit={handlesubmit}>
        <Col xs={12} xl={8}>
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
          <h5 className="mb-4">Ajouter athlete </h5>
          <div className="text-center"><p>{success}</p></div>
          <Row>
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
          </Row>
            <Row>
            <Col md={4} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>CIN</Form.Label>
                  <Form.Control   type="text" id="cin" name="cin" 
                  value={cin }  onChange={(e) =>setCin(e.target.value)}
                 
                  />
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control   type="text" id="first_name" name="first_name" placeholder="Nom" 
                     value={first_name }    onChange={(e) =>setFname(e.target.value)} 
                 
                  />
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group id="lastName">
                  <Form.Label>Prénom</Form.Label>
                  <Form.Control   type="text" id="last_name" name="last_name" placeholder="Prénom"
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
                    <option value="0"></option>
                    <option value="1">Femme</option>
                    <option value="2">Homme</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col sm={4} className="mb-3">
            
            <Form.Group id="category">
                    <Form.Label>Téléphone</Form.Label>
                    <Form.Control   type="text" id="phone" name="phone"
                           value={phone}     onChange={(e) =>setPhone(e.target.value)}
                         
                  />
                  </Form.Group>
            </Col>
          
              </Row>
              <Row>
          
          <Col sm={4} className="mb-3">
          
          <Form.Group id="category">
                  <Form.Label>Ville</Form.Label>
                  <Form.Control   type="text" id="ville" name="ville"
                           value={city}     onChange={(e) =>setCity(e.target.value)}
                         
                  />
                </Form.Group>
          </Col>
          <Col sm={4} className="mb-3">
          
          <Form.Group id="category">
                  <Form.Label>Addresse</Form.Label>
                  <Form.Control   type="text" id="addresse" name="addresse" 
                           value={addresse}     onChange={(e) =>setAddresse(e.target.value)}
                         
                  />
                </Form.Group>
          </Col>
        </Row>
              <Row>
          <Col sm={4} className="mb-3">
            
            <Form.Group id="zip_code">
                    <Form.Label>Zip_code</Form.Label>
                   <Form.Control   type="text" id="zip_code" name="zip_code" 
                           value={zip_code}     onChange={(e) =>setZip(e.target.value)}
                         
                  />
                  </Form.Group>
            </Col>
       
            <Col sm={4} className="mb-3">
            
            <Form.Group id="category">
                    <Form.Label>Gouvernerat</Form.Label>
                    <Form.Control   type="text" id="last_name" name="last_name"
                           value={states}     onChange={(e) =>setStates(e.target.value)}
                         
                  />
                  </Form.Group>
            </Col>
            <Col sm={4} className="mb-3">
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
          
            <Col sm={4} className="mb-3">
            
            <Form.Group id="grade">
                    <Form.Label>Grade</Form.Label>
                    <Form.Select id="grade"  name="grade"  value={grade}  onChange={(e) =>setGrade(e.target.value)}
                                  autoComplete="off" >
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
            <Col sm={4} className="mb-3">
            
            <Form.Group id="degree">
                    <Form.Label>Degré</Form.Label>
                    <Form.Select id="degree"  name="degree"  value={degree}  onChange={(e) =>setDegree(e.target.value)}
                                  autoComplete="off" >
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
  
      <Card border="light" className="bg-white shadow-sm mb-4">
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

        </Card.Body></Card>
      
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
