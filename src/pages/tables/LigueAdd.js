
import React , {useEffect,useState,useRef} from "react";
import { Form, Col, Row, Card,  Button} from '@themesberg/react-bootstrap';
import axios from "../examples/api/axios";

const LIGUE_URL='ligue/';
const LigueAdd = () =>{
const[datas,setData]=useState('');
const [showDefault, setShowDefault] = useState(false);
const handleClose = () => setShowDefault(false);

const[id,setId]=useState([])
const errRef = useRef();

const [name, setName] = useState();
const[success,setSuccess] = useState();


const handlesubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("name", name);
 
try {
  const token = localStorage.getItem("token");

    axios.post(
      LIGUE_URL,
       formData,
       { headers: {'Content-Type': 'Application/json','Authorization':  `TOKEN ${token}`,
        'Access-Control-Allow-Origin':'Accept'} },
    )
    setSuccess("Ligue ajouté");
    
}catch(error) {
  console.log(error)
}


 
}

    return (
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
          <h5 className="mb-4">Ajouter Ligue</h5>
       
          <Form onSubmit={handlesubmit}>
          <div className="text-center"><p>{success}</p></div>
            <Row>
            <Col md={4} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Ligue</Form.Label>
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
export default (LigueAdd);
