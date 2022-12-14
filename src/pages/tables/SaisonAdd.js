
import React , {useEffect,useState,useRef} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome , faCalendarAlt, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb } from '@themesberg/react-bootstrap';
import { Form, Col, Row, Nav, Card, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup, Modal,InputGroup } from '@themesberg/react-bootstrap';
import { Routes } from "../../routes";
import { Link } from 'react-router-dom';
import { PageTrafficTable, RankingTable } from "../../components/Tables";
import axios from "../examples/api/axios";
const SAISON_URL='seasons/';
const ClubAdd = () =>{
const[datas,setData]=useState('');
const [showDefault, setShowDefault] = useState(false);
const handleClose = () => setShowDefault(false);

const[id,setId]=useState([])
const errRef = useRef();

const [name, setName] = useState();
const [ligue, setLigue] = useState();
const[success,setSuccess] = useState();
const [state2,setState2]=useState([]);


const handlesubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("Seasons", name);
 
  const headers = { 
    'Authorization':  `TOKEN ${token}`,
    'Content-Type':'multipart/form-data',
    'Access-Control-Allow-Origin':'Accept'
};
try {
  const token = localStorage.getItem("token");

    axios.post(
      SAISON_URL,
       formData,
       { headers: {'Content-Type': 'multipart/form-data','Authorization':  `TOKEN ${token}`,
        'Access-Control-Allow-Origin':'Accept'} },
    )
    setSuccess("Saison ajouté");
    
}catch(error) {
  console.log(error)
}


 
}

    return (
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
          <h5 className="mb-4">Ajouter Saison</h5>
       
          <Form onSubmit={handlesubmit}>
          <div className="text-center"><p>{success}</p></div>
            <Row>
            <Col md={4} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Saison</Form.Label>
                  <Form.Control  type="text" id="name" name="name" 
                  value={name}  onChange={(e) =>setName(e.target.value)}
                 
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
export default (ClubAdd);
