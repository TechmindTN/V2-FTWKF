
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

const ARBITRE_URL='arbitrator/'

const ArAdd = () =>{

  const [state4,setState4]=useState([]);
  
const[datas,setData]=useState('');
const [showDefault, setShowDefault] = useState(false);
const handleClose = () => setShowDefault(false);
  const[grade, setGrade] = useState();
  const[cin,setCin]=useState();
  const[first_name, setF_name] = useState (false) ;
  const[last_name, setL_name] = useState();
  const[sex, setSex] = useState();
  const[birthday, setBirthday] = useState();
  const[profile, setProfile] = useState();
  const[success,setSuccess] = useState();
const handlesubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("cin", cin);
  formData.append("first_name",first_name);
  //formData.append("discipline", discipline);
  formData.append("last_name", last_name);  
  formData.append("sex", sex);
  formData.append("birthday", birthday);
  formData.append("grade",grade);
try {
  const token = localStorage.getItem("token");
    axios.post(
      ARBITRE_URL
      ,({'cin':cin,'first_name':first_name,'last_name':last_name,'sex':sex,'birthday':birthday,'profile':profile}),
       { headers: {'Content-Type': 'application/json','Authorization':`TOKEN ${token}`,
        'Access-Control-Allow-Origin':'Accept'} },
    )
    setSuccess("Arbitre ajouté");
  //  window.location.href = "dashboard/tables/Clubs";
}catch(error) {
  console.log(error)
}


 
}

    return (
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
          <h5 className="mb-4">Ajouter Arbitre </h5>
         
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
                <Form.Group id="lastName">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control  type="text" id="prenom" name="prenom" placeholder="Nom" 
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
        
         
          
           

          </Row>
          <div className="mt-3">
              <Button variant="primary" type="submit">Ajouter</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    );

};
export default (ArAdd);
