
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

const ENT_URL='add_coach/'
const PARAMETER_URL='parameters/'

const Licenceadd = () =>{

  const [state3,setState3]=useState([]);
  const [state4,setState4]=useState([]);
  const[grade, setGrade] = useState();
  const[Degrees, setDegrees] = useState();

  const[cin,setCin]=useState();
  const[username,setUsername]=useState();

  const[phone,setPhone]=useState();

  const[first_name, setF_name] = useState () ;
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
const errRef = useRef();
const[errMsg, setErrMsg] = useState ('') ;

const handlesubmit = async (e) => {
  e.preventDefault();
  
try {
  const token = localStorage.getItem("token");
  const ent=localStorage.getItem('ent');
  const deg=localStorage.getItem('deg');
  const gr=localStorage.getItem('gr');
  const ph=localStorage.getItem('ph');

  axios.post(
    ENT_URL,({'profile':{'phone':phone,'cin':cin,'first_name':first_name,'last_name':last_name,'birthday':birthday},'coach':{'grade':grade,'photo':`https://3462-197-14-10-36.eu.ngrok.io${ph} `,'degree':Degrees,
      'grade_photo':`https://3462-197-14-10-36.eu.ngrok.io${gr} `,'identity_photo':`https://3462-197-14-10-36.eu.ngrok.io${ent} `,'degree_photo':`https://3462-197-14-10-36.eu.ngrok.io${deg} `},'user':{'username':phone,'password':phone}}),
       { headers: {'Content-Type': 'application/json','Authorization':`TOKEN ${token}`,
        'Access-Control-Allow-Origin':'Accept'} }
    ).then((value) =>{
      console.log(value?.status)
      if(value?.status=="200"){
        setErrMsg(<div className="alert alert-success d-flex align-items-center" role="alert">
     <div>
     Entraineur ajouté
     </div>
   </div>)
      }
      }).catch((e)=>{
        console.log(e.response.status)
        console.log(e.status)
        if(e?.response?.status=="500"){
          setErrMsg('no Server response')
         } else if(e?.response?.status=="400") {
          setErrMsg('utilisateur deja existe ');
          } else if (e?.response?.status == "401"){
            setErrMsg('unautherized');
         }else if (e?.response?.status == "404"){
          setErrMsg("unautherized");
        } else{ setErrMsg('Erreur');
        } 
        errRef.current.focus();
        
        
      })
   
 
  //  window.location.href = "dashboard/tables/Clubs";
} catch(err){
  console.log(e.response.status)
  console.log(e.status)
  // if(e?.response?.status=="500"){
  //   setErrMsg('no Server response')
  //  } else if(e?.response?.status=="400") {
  //   setErrMsg('username ou password incorrecte');
  //   } else if (e?.response?.status == "401"){
  //     setErrMsg('unautherized');
  //  }else if (e?.response?.status == "404"){
  //   setErrMsg("unautherized");
  // } else{ setErrMsg('Erreur');
  // } 
  errRef.current.focus();
  console.log("ay hgkaya")
};



 
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
              <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>

            <Col md={4} className="mb-3">
                <Form.Group id="cin">
                  <Form.Label>CIN ب ت و</Form.Label>    
                  <Form.Control  type="text" id="cin" name="cin" placeholder="cin" 
                     value={cin }    onChange={(e) =>setCin(e.target.value)} 
                 
                  />
                </Form.Group>
                 
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group id="firstname">
                  <Form.Label>Nom اسم</Form.Label>
                  <Form.Control  type="text" id="nom" name="nom" 
                     value={first_name }    onChange={(e) =>setF_name(e.target.value)} 
                 
                  />
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group id="lastName">
                  <Form.Label>Prénom لقب</Form.Label>
                  <Form.Control  type="text" id="prenom" name="prenom" 
                     value={last_name }    onChange={(e) =>setL_name(e.target.value)} 
                 
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="align-items-center">
          
            <Col md={4} className="mb-3">
                <Form.Group id="cin">
                  <Form.Label>Telephone هاتف</Form.Label>    
                  <Form.Control  type="text" id="cin" name="cin"
                     value={phone }    onChange={(e) =>setPhone(e.target.value)} 
                 
                  />
                </Form.Group>
                 
              </Col>
            <Col md={4} className="mb-3">
                <Form.Group id="sex">
                  <Form.Label>sex جنس</Form.Label>
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
                <Form.Label>Date de naissance تاريخ الميلاد</Form.Label>
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
            <Form.Label>Grade رتبة</Form.Label>
            <Form.Select id="grade"  name="grade"  value={grade}  onChange={(e) =>setGrade(e.target.value)}
                                  autoComplete="off" >
                                      <option></option>
                                    {state4.map((person) => (<>
                                  
                              <option value={person.id}> 
        {person.Grade}</option>    </>   ))}
                  </Form.Select>
          
           
                  </Col>
         
          
                  <Col md={4} className="mb-3">
            <Form.Label>Degré درجة </Form.Label>
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

          
       
      
          </Form>
        </Card.Body>
      </Card>
      
    );

};
export default (Licenceadd);
