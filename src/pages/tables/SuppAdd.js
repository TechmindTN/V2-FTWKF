
import React , {useEffect,useState,useRef} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { Form, Col, Row, Nav, Card, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup, Modal,InputGroup } from '@themesberg/react-bootstrap';
import axios from "../examples/api/axios";
import Datetime from "react-datetime";

const SUPP_URL='supporter/'
const PARAMETER_URL='parameters/'

const SuppAdd = () =>{
  const [state6,setState6]=useState([]);

  const [state4,setState4]=useState([]);
  
const[datas,setData]=useState('');
const [showDefault, setShowDefault] = useState(false);
const handleClose = () => setShowDefault(false);
  const[name,setName]=useState();
  const[club, setClub] = useState ();
  
  const[success,setSuccess] = useState();

  useEffect(() => {
    axios.get(PARAMETER_URL,``)
    .then(res => {
      const seasons = res.data.Seasons;
      const Categories = res.data.Categories;
      const Clubs=res.data.Clubs;
    
      setState6(Clubs);
      
  })},[])
const handlesubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("name", name);
  formData.append("club",club);
 
try {
  const token = localStorage.getItem("token");
    axios.post(
      SUPP_URL
      ,({'name':name,'club':club}),
       { headers: {'Content-Type': 'application/json','Authorization':`TOKEN ${token}`,
        'Access-Control-Allow-Origin':'Accept'} },
    )
    setSuccess("supporteur ajouté");
  //  window.location.href = "dashboard/tables/Supporteur";
}catch(error) {
  console.log(error)
}


 
}

    return (
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
          <h5 className="mb-4">Ajouter Supporteur </h5>
         
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
                  <Form.Label>Nom</Form.Label>    
                  <Form.Control  type="text" id="nom" name="nom"
                     value={name} onChange={(e) =>setName(e.target.value)} 
                 
                  />
                </Form.Group>
                 
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group id="cin">
                  <Form.Label>Club</Form.Label>    
                  <Form.Select id="club"  name="club"  value={club}  onChange={(e) =>setClub(e.target.value)}
                                  autoComplete="off" >
                                      <option></option>
                                    {state6.map((person) => (<>
                                  
                              <option value={person.id}> 
        {person.name}</option>    </>   ))}
                  </Form.Select>
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
