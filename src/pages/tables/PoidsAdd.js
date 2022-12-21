
import React , {useEffect,useState,useRef} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { Form, Col, Row, Nav, Card, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup, Modal,InputGroup } from '@themesberg/react-bootstrap';
import axios from "../examples/api/axios";

const POID_URL='weights/'

const SuppAdd = () =>{

  
const[datas,setData]=useState('');
const [showDefault, setShowDefault] = useState(false);
const handleClose = () => setShowDefault(false);
const[poids, setPoids] = useState ();
const[success,setSuccess] = useState();

const handlesubmit = async (e) => {
  e.preventDefault();
try {
  const token = localStorage.getItem("token");
    axios.post(
      POID_URL
      ,({'masse_en_killograme':poids}),
       { headers: {'Content-Type': 'application/json','Authorization':`TOKEN ${token}`,
        'Access-Control-Allow-Origin':'Accept'} },
    )
    setSuccess("Poids ajouté");
  //  window.location.href = "dashboard/tables/Supporteur";
}catch(error) {
  console.log(error)
}


 
}

    return (
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
          <h5 className="mb-4">Ajouter Poids </h5>
         
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
                  <Form.Label>Poids</Form.Label>    
                  <Form.Control  type="text" id="nom" name="nom"
                     value={poids} onChange={(e) =>setPoids(e.target.value)} 
                 
                  />
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
export default (SuppAdd);
