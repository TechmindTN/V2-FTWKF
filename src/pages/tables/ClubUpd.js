
import React , {useEffect,useState,useRef} from "react";
import { Form, Col, Row, Card, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup, Modal,InputGroup } from '@themesberg/react-bootstrap';
import axios from "../examples/api/axios";
const PARAMETER_URL='ligue/'
const ClubUpd = () =>{
const [name, setName] = useState();
const[success, setSuccess] = useState (false) ;
const [state3,setState3]=useState([]);
const [im1,setIm1]=useState([]);
const [Ligue,setLigue] = useState([])
const cl=localStorage.getItem('cl')
const CLUB_URL=`club/${cl}/`;
useEffect(() => {
  axios.get(PARAMETER_URL,``)
  .then(res => {
   console.log(res.data)
   setState3(res.data)
})},[])

useEffect(() => {

axios.get(CLUB_URL,{
  headers: {'Content-Type': 'application/x-www-form-urlencoded','Authorization':` TOKEN ${window.localStorage.getItem("token")}`,  'Access-Control-Allow-Methods': 'Accept'},
  withCredentials: false
})
.then(res => {
  const persons = res.data;
  console.log(persons)
  setName(persons.name)
  setLigue(persons.ligue)
  setIm1(persons.logo)
}
)},[])

const handlesubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("name", name);
  formData.append("ligue", Ligue);
try {
  const token = localStorage.getItem("token");
    axios.put(
      CLUB_URL,
       formData,
       { headers: {'Content-Type': 'multipart/form-data','Authorization':  `TOKEN ${token}`,'Access-Control-Allow-Origin':'Accept'} },
    )
    setSuccess(<div className="alert alert-success d-flex align-items-center" role="alert">
    <div>Club modifié</div></div>);
   // window.location.href = "http://localhost:3000/#/tables/Clubs";
    localStorage.removeItem("cl");
 
}catch(error) {
  console.log(error)
}

}


function handleFileSelect3(e) {
  console.log(e.target.files);
  setIm1(URL.createObjectURL(e.target.files[0]));
  setSelectedFile3(e.target.files[0])
}

    return (
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
          <h5 className="mb-4">Modifier Club </h5>
          <Form onSubmit={handlesubmit}>
          <div className="text-center"><p>{success}</p></div>
            <Row>
            <Col md={3} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Nom Club</Form.Label>
                  <Form.Control  type="text" id="cin" name="cin" 
                  value={name }  onChange={(e) =>setName(e.target.value)}
                 
                  />
                </Form.Group>
              </Col>
            
             
              <Col sm={3} className="mb-3">
                <Form.Group id="ligue">
                  <Form.Label>Ligue</Form.Label>
                  <Form.Select id="ligue"  name="ligue"  value={Ligue}  onChange={(e) =>setLigue(e.target.value)}
                                  autoComplete="off" >
                                    {state3.map((person) => (<>
                              <option value={person.id}> 
        {person.name}</option>    </>   ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col sm={3} className="mb-3">
            
            <Form.Group id="category">
                    <Form.Label>Logo  </Form.Label><br/>
                   <img src={im1} width={80} height={80} />
                   <input type="file" onChange={handleFileSelect3}   />
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
export default (ClubUpd);
