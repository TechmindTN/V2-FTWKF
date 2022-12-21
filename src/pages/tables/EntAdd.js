
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

const ENT_URL='coach/'
const PARAMETER_URL='parameters/'

const Licenceadd = () =>{

  const [state3,setState3]=useState([]);
  const [state4,setState4]=useState([]);
  const[grade, setGrade] = useState();
  const[Degrees, setDegrees] = useState();

  const[cin,setCin]=useState();
  const[first_name, setF_name] = useState (false) ;
  const[last_name, setL_name] = useState();
  const[sex, setSex] = useState();
  const[birthday, setBirthday] = useState();
  const[profile, setProfile] = useState();
  const[success,setSuccess] = useState();
  const [file1, setFile1] = useState();
  const [file2, setFile2] = useState();
  const [file3, setFile3] = useState();
  const [file4, setFile4] = useState();
  const [selectedFile1, setSelectedFile1] = React.useState(null);
  const [selectedFile2, setSelectedFile2] = React.useState(null);
  const [selectedFile3, setSelectedFile3] = React.useState(null);
  const [selectedFile4, setSelectedFile4] = React.useState(null);
  const [progress1, setProgress1] = useState()
  const [progress2, setProgress2] = useState()
  const [progress3, setProgress3] = useState()
  const [progress4, setProgress4] = useState()

  const Image_url='upload_photo/'
  const submit4 = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formData2 = new FormData();
      formData2.append("url",selectedFile4);
      formData2.append("path","image/coach/photo");
      formData2.append("user",localStorage.getItem('id'));
      formData2.append("season",'2');
        axios.post(
          Image_url,
           formData2,
           { headers: {"Content-Type": "multipart/form-data" ,'Authorization':  `TOKEN ${token}`,'Access-Control-Allow-Origin':'Accept'}  ,onUploadProgress: data => {
              setProgress4(Math.round((100 * data.loaded) / data.total))},},).then((value) => {const url= value.data.url;
          localStorage.setItem('ph',url)
        }
          )    }catch(error) {      console.log(error)    }  }
          
  const submit3 = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formData2 = new FormData();
      formData2.append("url",selectedFile3);
      formData2.append("path","image/coach/grade");
      formData2.append("user",localStorage.getItem('id'));
      formData2.append("season",'2');
        axios.post(
          Image_url,
           formData2,
           { headers: {"Content-Type": "multipart/form-data" ,'Authorization':  `TOKEN ${token}`,'Access-Control-Allow-Origin':'Accept'}  ,onUploadProgress: data => {
              setProgress3(Math.round((100 * data.loaded) / data.total))},},).then((value) => {const url= value.data.url;
          localStorage.setItem('gr',url)
        }
          )    }catch(error) {      console.log(error)    }  }
  const submit2 = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formData2 = new FormData();
      formData2.append("url",selectedFile2);
      formData2.append("path","image/coach/degree");
      formData2.append("user",localStorage.getItem('id'));
      formData2.append("season",'2');
        axios.post(
          Image_url,
           formData2,
           { headers: {"Content-Type": "multipart/form-data" ,'Authorization':  `TOKEN ${token}`,'Access-Control-Allow-Origin':'Accept'}  ,onUploadProgress: data => {
              setProgress2(Math.round((100 * data.loaded) / data.total))},},).then((value) => {const url= value.data.url;
          localStorage.setItem('deg',url)
        }
          )    }catch(error) {      console.log(error)    }  }
  const submit1 = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const formData2 = new FormData();
      formData2.append("url",selectedFile1);
      formData2.append("path","image/coach/identity");
      formData2.append("user",localStorage.getItem('id'));
      formData2.append("season",'2');
        axios.post(
          Image_url,
           formData2,
           { headers: {"Content-Type": "multipart/form-data" ,'Authorization':  `TOKEN ${token}`,'Access-Control-Allow-Origin':'Accept'}  ,onUploadProgress: data => {
              setProgress1(Math.round((100 * data.loaded) / data.total))},},).then((value) => {const url= value.data.url;
          localStorage.setItem('ent',url)
          ;        }          )        // window.location.href = "/tables/Athletes/"
    }catch(error) {      console.log(error)    }  }
  useEffect(() => {
    axios.get(PARAMETER_URL,``)
    .then(res => {
      const Grades=res.data.Grades;
      const Degrees=res.data.Degrees;
      setState4(Grades);
      setState3(Degrees);
  })},[])
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
function handleFileSelect4(e) {
  console.log(e.target.files);
  setFile4(URL.createObjectURL(e.target.files[0]));
  setSelectedFile4(e.target.files[0])
}

const handlesubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");
  
try {
  const token = localStorage.getItem("token");
  const ent=localStorage.getItem('ent');
  const deg=localStorage.getItem('deg');
  const gr=localStorage.getItem('gr');
  const ph=localStorage.getItem('ph');

    axios.post(
      ENT_URL
      ,({'cin':cin,'photo':`https://c3dd-197-14-10-36.ngrok.io${ph} `,'degree':Degrees,'grade_photo':`https://c3dd-197-14-10-36.ngrok.io${gr} `,'identity_photo':`https://c3dd-197-14-10-36.ngrok.io${ent} `,'degree_photo':`https://c3dd-197-14-10-36.ngrok.io${deg} `,'first_name':first_name,'last_name':last_name,'sex':sex,'birthday':birthday,'profile':profile,'grade':grade}),
       { headers: {'Content-Type': 'application/json','Authorization':`TOKEN ${token}`,
        'Access-Control-Allow-Origin':'Accept'} },
    )
    setSuccess(<div className="alert alert-success d-flex align-items-center" role="alert">
    <div>
    Entraineur ajouté
    </div>
  </div>);
  localStorage.removeItem('ent');
  localStorage.removeItem('deg');
localStorage.removeItem('ph');
localStorage.removeItem('gr');
  //  window.location.href = "dashboard/tables/Clubs";
}catch(error) {
  console.log(error)
}



 
}

    return (
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
          <h5 className="mb-4">Ajouter Entraineur </h5>
         
          {/* {state.map((person) => (
        <>
        
        
        </>))} */}
          <Form onSubmit={handlesubmit}>
          <div className="text-center"><p>{success}</p></div>
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
                <Form.Group id="cin">
                  <Form.Label>CIN</Form.Label>    
                  <Form.Control  type="text" id="cin" name="cin" placeholder="cin" 
                     value={cin }    onChange={(e) =>setCin(e.target.value)} 
                 
                  />
                </Form.Group>
                 
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group id="firstname">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control  type="text" id="nom" name="nom" 
                     value={first_name }    onChange={(e) =>setF_name(e.target.value)} 
                 
                  />
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group id="lastName">
                  <Form.Label>Prénom</Form.Label>
                  <Form.Control  type="text" id="prenom" name="prenom" placeholder="prenom" 
                     value={last_name }    onChange={(e) =>setL_name(e.target.value)} 
                 
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="align-items-center">
          
            
            <Col md={4} className="mb-3">
                <Form.Group id="sex">
                  <Form.Label>sex</Form.Label>
                  <Form.Select id="sex"  name="sex"
                                  autoComplete="off" value={sex}  onChange={(e) =>setSex(e.target.value)}
                  >
                    <option value="0">--</option>
                    <option value="Femme">Femme</option>
                    <option value="Homme">Homme</option>
                  </Form.Select>
                </Form.Group>
              </Col>
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
            <Form.Label>Grade</Form.Label>
            <Form.Select id="grade"  name="grade"  value={grade}  onChange={(e) =>setGrade(e.target.value)}
                                  autoComplete="off" >
                                      <option></option>
                                    {state4.map((person) => (<>
                                  
                              <option value={person.id}> 
        {person.Grade}</option>    </>   ))}
                  </Form.Select>
          
           
                  </Col>
         
          
                  <Col md={4} className="mb-3">
            <Form.Label>Degré</Form.Label>
            <Form.Select id="grade"  name="grade"  value={Degrees}  onChange={(e) =>setDegrees(e.target.value)}
                                  autoComplete="off" >
                                    {state3.map((person) => (<>
                                  
                              <option value={person.id}> 
        {person.Degree}</option>    </>   ))}
                  </Form.Select>
          
           
                  </Col>

          </Row>
          <div className="mt-3">
              <Button variant="primary" type="submit">Ajouter</Button>
            </div>
          </Form>
          <Form>
<br/>

          
        <Row className="align-items-center">
        <Form onSubmit={submit1}>
            
          <Col md={6} className="mb-3">
              <Form.Group id="image">
                <Form.Label>Photo d'identité:&nbsp;&nbsp;&nbsp;&nbsp;</Form.Label>
                <input type="file"   onChange={handleFileSelect1}  required />
            <img src={file1} width={80} required />
            {progress1 && <ProgressBar   now={progress1} label={`${progress1}%`} style={{ height: 20}} />}
            <div className="mt-3">
              <Button variant="primary" type="submit">Ajouter identité</Button>
            </div>
              </Form.Group>
            </Col></Form>
            <Form onSubmit={submit2}>
            <Col md={6} className="mb-3">
              <Form.Group id="image">
                <Form.Label>Degré:&nbsp;&nbsp;&nbsp;&nbsp;</Form.Label>
                <input type="file"   onChange={handleFileSelect2}  required />
            <img src={file2} width={80} required />
            {progress2 && <ProgressBar   now={progress2} label={`${progress2}%`} style={{ height: 20}} />}
            <div className="mt-3">
              <Button variant="primary" type="submit">Ajouter Degré</Button>
            </div>
              </Form.Group>
            </Col>  </Form>

        </Row>
        <Row className="align-items-center">
             <Form onSubmit={submit3}>
            <Col md={6} className="mb-3">
              <Form.Group id="image">
                <Form.Label>Grade:&nbsp;&nbsp;&nbsp;&nbsp;</Form.Label>
                <input type="file"   onChange={handleFileSelect3}  required />
            <img src={file3} width={80} required />
            {progress3 && <ProgressBar   now={progress3} label={`${progress3}%`} style={{ height: 20}} />}
            <div className="mt-3">
              <Button variant="primary" type="submit">Ajouter Grade</Button>
            </div>
              </Form.Group>
            </Col></Form><Form onSubmit={submit4}>
            <Col md={6} className="mb-3">
              <Form.Group id="image">
                <Form.Label>Photo: ملتقى المدربين&nbsp;&nbsp;&nbsp;&nbsp;</Form.Label>
                <input type="file"   onChange={handleFileSelect4}  required />
            <img src={file4} width={80} required />
            {progress4 && <ProgressBar   now={progress4} label={`${progress4}%`} style={{ height: 20}} />}
            <div className="mt-3">
              <Button variant="primary" type="submit">Ajouter Photo</Button>
            </div>
              </Form.Group>
            </Col></Form>

        </Row>
          </Form>
        </Card.Body>
      </Card>
      
    );

};
export default (Licenceadd);
