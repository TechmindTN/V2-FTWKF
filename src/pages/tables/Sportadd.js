
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

const ATHLETE_URL='athlete/'

const Sportadd = () =>{
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


// const handlesubmit = async (e) => {
//   e.preventDefault();
  
//   try{
//     axios.post(ATHLETE_URL,({'first_name':first_name,'last_name':last_name,'birthday':birthday,'cin':cin,'sexe':sexe,
  
//   'categorie':categorie,'weights':weights,'nationality':nationality,'grade':grade}),
//     {mode:'cors'},
//      {
//         headers: {'Content-Type':'application/json','Authorization':`TOKEN 9ddb70db158ba7ee75a067198c4d3e563e265767bd8f4a047ae077f1d72667c1`,'Access-Control-Allow-Origin':'Accept',},
//         withCredentials: true
//      }
//   )
//   .then((response) => {;
//   console.log(response?.data)
  
//   setSuccess(true);
//     // storing input rol
//   })
//   } catch(err){
//     if(err?.response){
//       setErrMsg('no Server response')
//       } 
//      errRef.current.focus();
//   }


// }
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

    axios.post(
      ATHLETE_URL,
       formData,
       { headers: {'Content-Type': 'multipart/form-data','Authorization':  `TOKEN ${token}`,
        'Access-Control-Allow-Origin':'Accept'} },
    )
    setSuccess("Athlete added");
    // window.location.href = "/tables/Athletes/"
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
                  <Form.Label>first_name</Form.Label>
                  <Form.Control  type="text" id="first_name" name="first_name" placeholder="first_name" 
                     value={first_name }    onChange={(e) =>setFname(e.target.value)} 
                 
                  />
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group id="lastName">
                  <Form.Label>last_name</Form.Label>
                  <Form.Control  type="text" id="last_name" name="last_name" placeholder="last_name"
                           value={last_name}     onChange={(e) =>setLname(e.target.value)}
                         
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="align-items-center">
              <Col md={4} className="mb-3">
                <Form.Group id="birthday"  name="birthday" >
                  <Form.Label>birthday</Form.Label>
                  <Datetime
                    timeFormat={false}
                   
                    renderInput={(props, openCalendar) => (
                      <InputGroup>
                        <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                        <Form.Control
                          required
                          type="text" id="birthday"  name="birthday"
                          onChange={(e) =>setBirthday(e.target.value)}
                          placeholder="yyyy/mm/dd" value={birthday? birthday : "----/--/--"}
                          autoComplete="off" 
                          />
                      </InputGroup>
                    )} />
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group id="sex">
                  <Form.Label>sex</Form.Label>
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
                  <Form.Label>weights</Form.Label>
                  <Form.Control  type="text" id="weights"  name="weights"
         autoComplete="off"   value={weights}   onChange={(e) =>setWeights(e.target.value)}
                  />
                </Form.Group>
              </Col>
              </Row>
              <Row>
             
          
              <Col sm={4} className="mb-3">
            
            <Form.Group id="nationality">
                    <Form.Label>nationality</Form.Label>
                    <Form.Control  type="text" placeholder="nationality" id="nationality"  name="nationality"
           autoComplete="off"  value={nationality}  onChange={(e) =>SetNationality(e.target.value)}
                    />
                  </Form.Group>
            </Col>
            <Col sm={4} className="mb-3">
            
            <Form.Group id="grade">
                    <Form.Label>grade</Form.Label>
                    <Form.Control  type="text" placeholder="grade" id="grade"  name="grade"
           autoComplete="off" value={grade}  onChange={(e) =>setGrade(e.target.value)}
                    />
                  </Form.Group>
            </Col>
            <Col sm={4} className="mb-3">
            
            <Form.Group id="category">
                    <Form.Label>category</Form.Label>
                    <Form.Control  type="text" placeholder="category" id="category"  name="category"
           autoComplete="off" value={categorie}  onChange={(e) =>setCategorie(e.target.value)}
                    />
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
export default (Sportadd);
