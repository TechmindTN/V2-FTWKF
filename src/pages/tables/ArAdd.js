
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
import moment from "moment-timezone";

const ARBITRE_URL='add_arbitrator/'

const ArAdd = () =>{
  const[grade, setGrade] = useState();
  const[cin,setCin]=useState();
  const[phone,setPhone]=useState();
  const[first_name, setF_name] = useState (false) ;
  const[last_name, setL_name] = useState();
  const[sex, setSex] = useState();
  const[birthday, setBirthday] = useState();
  const[password, setPassword] = useState();
  const[addresse, setAddresse] = useState();
  const[ville,setVille] = useState();
  const[gouv,setGouv] = useState();
  const[code,setCode] = useState();

  const[username, setUsername] = useState();
  const[success,setSuccess] = useState();
  const [progress1, setProgress1] = useState()
  const [progress, setProgress] = useState()
  const [file, setFile] = useState();
  const [file1, setFile1] = useState();
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [selectedFile1, setSelectedFile1] = React.useState(null);
  function handleFileSelect1(e) {
    console.log(e.target.files);
    setFile1(URL.createObjectURL(e.target.files[0]));
    setSelectedFile1(e.target.files[0])
}
function handleFileSelect(e) {
  console.log(e.target.files);
  setFile(URL.createObjectURL(e.target.files[0]));
  setSelectedFile(e.target.files[0])
}
const Image_url='upload_photo/'
const submit = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem("token");
    const formData2 = new FormData();
    formData2.append("url",selectedFile);
    formData2.append("path","image/arbitrator/identity");
    formData2.append("user",localStorage.getItem('id'));
    formData2.append("season",'2');
      axios.post(
        Image_url,
         formData2,
         { headers: {"Content-Type": "multipart/form-data" ,'Authorization':  `TOKEN ${token}`,'Access-Control-Allow-Origin':'Accept'}  ,onUploadProgress: data => {
            setProgress(Math.round((100 * data.loaded) / data.total))},},).then((value) => {const url= value.data.url;
        localStorage.setItem('ar',url)
      }
        )    }catch(error) {      console.log(error)    }  }

        const submit1 = async (e) => {
          e.preventDefault();
          try {
            const token = localStorage.getItem("token");
            const formData2 = new FormData();
            formData2.append("url",selectedFile1);
            formData2.append("path","image/arbitrator/grade");
            formData2.append("user",localStorage.getItem('id'));
            formData2.append("season",'2');
              axios.post(
                Image_url,
                 formData2,
                 { headers: {"Content-Type": "multipart/form-data" ,'Authorization':  `TOKEN ${token}`,'Access-Control-Allow-Origin':'Accept'}  ,onUploadProgress: data => {
                    setProgress1(Math.round((100 * data.loaded) / data.total))},},).then((value) => {const url= value.data.url;
                localStorage.setItem('ph',url)
              }
                )    }catch(error) {console.log(error)    }  }
const handlesubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");
try {  const token = localStorage.getItem("token");
const ar= localStorage.getItem('ar')
const ph= localStorage.getItem('ph')
    axios.post(ARBITRE_URL,({'arbitrator':{'identity_photo':`https://c3dd-197-14-10-36.ngrok.io${ar} `,'photo':`https://c3dd-197-14-10-36.ngrok.io${ph} `,'grade':'2'},'profile':{'cin':cin,'first_name':first_name,'last_name':last_name,'sex':sex,'birthday':birthday,'country':"Tunisie"},'user':{'password':password,'username':username}}),
       { headers: {'Content-Type': 'application/json','Authorization':`TOKEN ${token}`,
        'Access-Control-Allow-Origin':'Accept'} },)
    setSuccess("Arbitre ajouté"); 
    localStorage.removeItem("ar")
    //window.location.href = "dashboard/tables/Clubs";
}catch(error) {  console.log(error)}}

    return (
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
          <h5 className="mb-4">Ajouter Arbitre </h5>
         <Form onSubmit={handlesubmit}>
          <div className="text-center"><p>{success}</p></div>
          <Row>
              <Col md={4} className="mb-3">
                <Form.Group id="username">
                  <Form.Label>username</Form.Label>    
                  <Form.Control  type="text" id="username" name="username" 
                     value={username }    onChange={(e) =>setUsername(e.target.value)}                                    />
                </Form.Group>
                 
              </Col>
        
              <Col md={4} className="mb-3">
                <Form.Group id="pwd">
                  <Form.Label>Mot de passe</Form.Label>
                  <Form.Control  type="text" id="pwd" name="pwd"  value={password } onChange={(e) =>setPassword(e.target.value)} />
                </Form.Group>
              </Col>
            
            </Row>
            <Row>
            <Col md={3} className="mb-3">
                <Form.Group id="cin">
                  <Form.Label>CIN</Form.Label>    
                  <Form.Control  type="text" id="cin" name="cin" placeholder="cin" 
                     value={cin }    onChange={(e) =>setCin(e.target.value)}                                    />
                </Form.Group>
                 
              </Col>
              
        
              <Col md={3} className="mb-3">
                <Form.Group id="lastName">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control  type="text" id="prenom" name="prenom" placeholder="Nom" value={first_name } onChange={(e) =>setF_name(e.target.value)} />
                </Form.Group>
              </Col>
              <Col md={3} className="mb-3">
                <Form.Group id="lastName">
                  <Form.Label>Prénom</Form.Label>
                  <Form.Control  type="text" id="prenom" name="prenom" placeholder="prenom" 
                     value={last_name }    onChange={(e) =>setL_name(e.target.value)}      />
                </Form.Group>
              </Col>
              <Col md={3} className="mb-3">
                <Form.Group id="cin">
                  <Form.Label>addresse</Form.Label>    
                  <Form.Control  type="text" id="addresse" name="addresse"  
                     value={addresse }    onChange={(e) =>setAddresse(e.target.value)}                                    />
                </Form.Group>
                 
              </Col>
            </Row>
            <Row className="align-items-center">
         <Col md={3} className="mb-3">
                <Form.Group id="sex">
                  <Form.Label>sex</Form.Label>
                  <Form.Select id="sex"  name="sex"autoComplete="off" value={sex}  onChange={(e) =>setSex(e.target.value)}       >
                    <option value="0">--</option>
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
                     value={phone }    onChange={(e) =>setPhone(e.target.value)}      />
              </Form.Group>
             
            </Col>
            <Col md={3} className="mb-3">
              <Form.Group  >
                <Form.Label>ville</Form.Label>
                <Form.Control  type="text" id="phone" name="phone"
                     value={ville }    onChange={(e) =>setVille(e.target.value)}      />
              </Form.Group>
             
            </Col>
         
          
           

          </Row>
          <Row>
          <Col md={3} className="mb-3">
              <Form.Group  >
                <Form.Label>gouvernerat</Form.Label>
                <Form.Control  type="text" id="phone" name="phone"
                     value={gouv }    onChange={(e) =>setGouv(e.target.value)}      />
              </Form.Group>
             
            </Col>
            <Col md={3} className="mb-3">
              <Form.Group  >
                <Form.Label>code postal </Form.Label>
                <Form.Control  type="text" id="phone" name="phone"
                     value={code }    onChange={(e) =>setCode(e.target.value)}      />
              </Form.Group>
             
            </Col>
          </Row>
          <div className="mt-3">
              <Button variant="primary" type="submit">Ajouter</Button>
            </div>
          </Form><br/>
          
          <Row>
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

            </Row>
        </Card.Body>
      </Card>
    );

};
export default (ArAdd);
