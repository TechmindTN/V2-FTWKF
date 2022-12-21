
import React , {useEffect,useState,useRef} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome , faCalendarAlt, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb } from '@themesberg/react-bootstrap';
import { Form, Col, Row, Nav, Card, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup, Modal,InputGroup } from '@themesberg/react-bootstrap';
import { Routes } from "../../routes";
import { Link } from 'react-router-dom';
import { PageTrafficTable, RankingTable } from "../../components/Tables";
import axios from "../examples/api/axios";
import { NoMeals } from "@mui/icons-material";
const CLUB_URL='add_club/';
const LIGUE_URL='ligue/';
const ClubAdd = () =>{


const [name, setName] = useState();
const [ligue, setLigue] = useState();
const [username, setUser] = useState();
const [password, setPassword] = useState();
const [club, setClub] = useState();
const [Prenom, setprenom] = useState();
const [ville, setVille] = useState();
const [state, setState] = useState();
const [addresse, setAddresse] = useState();
const [zip_code, setZip_code] =  useState();
const [phone, setPhone] = useState();
const [birthday, setBirthday] = useState();
const [cin, setCin] = useState();

const[success,setSuccess] = useState();
const [state2,setState2]=useState([]);
const Image_url='upload_photo/'
const [selectedFile, setSelectedFile] = React.useState(null);
const handleFileSelect = (event) => {
  setSelectedFile(event.target.files[0])
}
useEffect(() => {
  axios.get(LIGUE_URL,``)
  .then(res => {
    const ligue = res.data;
    console.log(ligue);
    setState2(ligue);
   
})},[])
const handlesubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append('club', {'name':club,'ligue':ligue});
  
 
  try {
    const token = localStorage.getItem("token");
    const formData2 = new FormData();
  
    formData2.append("url",selectedFile);
    formData2.append("path","image/club/logo");
    formData2.append("user",localStorage.getItem('id'));
    formData2.append("season",'2');
      axios.post(
        Image_url,
         formData2,
         { headers: {"Content-Type": "multipart/form-data" ,'Authorization':  `TOKEN ${token}`,
          'Access-Control-Allow-Origin':'Accept'} },
      ).then((value) => {
        const url= value.data.url;
        localStorage.setItem('urlc',url)
        //console.log(url)
      }
        )
      // window.location.href = "/tables/Athletes/"
  }catch(error) {
    console.log(error)
  }
try {
  const token = localStorage.getItem("token");
  const url=localStorage.getItem('urlc');

    axios.post(
      CLUB_URL,
      ({'club':{'name':club,'ligue':ligue,'logo':`https://c3dd-197-14-10-36.ngrok.io${url} `},'user':{'username':username,'password':password},'profile':{'first_name':name,'last_name':Prenom,
    'country':'Tunisie','state':state,'city':ville,'address':addresse,'zip_code':zip_code,'phone':phone,'birthday':birthday,
  'cin':cin,'role':'7'}
    }),
       { headers: {'Content-Type': 'Application/json','Authorization':  `TOKEN ${token}`,
        'Access-Control-Allow-Origin':'Accept'} },
    )
    setSuccess("Club ajouté");
   

}catch(error) {
  console.log(error)
}
localStorage.removeItem('urlc');
window.location.href = "http://localhost:3000/#/tables/Clubs"


 
}

    return (
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
          <h5 className="mb-4">Ajouter Club </h5>
       
          <Form onSubmit={handlesubmit}>
          <div className="text-center"><p>{success}</p></div>
          <Row>
          <Col md={4} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Nom utilisateur</Form.Label>
                  <Form.Control  type="text" id="name" name="name" 
                  value={username}  onChange={(e) =>setUser(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Password</Form.Label>
                  <Form.Control  type="text" id="name" name="name" 
                  value={password}  onChange={(e) =>setPassword(e.target.value)}
                  />
                </Form.Group>
              </Col>
              
          </Row>
            <Row>
            <Col md={4} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Club</Form.Label>
                  <Form.Control  type="text" id="name" name="name" 
                  value={club}  onChange={(e) =>setClub(e.target.value)}
                 
                  />
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Ligue</Form.Label>
                  <Form.Select id="ligue"  name="ligue"  value={ligue}  onChange={(e) =>setLigue(e.target.value)}
                                  autoComplete="off" >
                                    {state2.map((person) => (<>
                                      <option> 
        </option> <option value={person.id}> 
        {person.id}</option>    </>   ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Image</Form.Label>
                 
      <input type="file" onChange={handleFileSelect}  />
                </Form.Group>
              </Col>
            </Row>
           <Row>
           <Col md={4} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control  type="text" id="name" name="name" 
                  value={name}  onChange={(e) =>setName(e.target.value)}
                 
                  />
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Prenom</Form.Label>
                  <Form.Control  type="text" id="prenom" name="prenom" 
                  value={Prenom}  onChange={(e) =>setprenom(e.target.value)}
                 
                  />
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Gouvernerat</Form.Label>
                  <Form.Control  type="text" id="gouvernerat" name="gouvernerat" 
                  value={state}  onChange={(e) =>setState(e.target.value)}
                 
                  />
                </Form.Group>
              </Col>
              </Row><Row>
              <Col md={4} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Ville</Form.Label>
                  <Form.Control  type="text" id="ville" name="ville" 
                  value={ville}  onChange={(e) =>setVille(e.target.value)}
                 
                  />
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group id="Addresse">
                  <Form.Label>Addresse</Form.Label>
                  <Form.Control  type="text" id="name" name="name" 
                  value={addresse }  onChange={(e) =>setAddresse(e.target.value)}
                 
                  />
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Zip_code</Form.Label>
                  <Form.Control  type="text" id="name" name="name" 
                  value={zip_code}  onChange={(e) =>setZip_code(e.target.value)}
                 
                  />
                </Form.Group>
              </Col></Row><Row>
              <Col md={4} className="mb-3">
                <Form.Group id="phone">
                  <Form.Label>Téléphone</Form.Label>
                  <Form.Control  type="text" id="phone" name="phone" 
                  value={phone}  onChange={(e) =>setPhone(e.target.value)}
                 
                  />
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group id="birthday">
                  <Form.Label>Date de naissance</Form.Label>
                  <Form.Control  type="date" id="name" name="name" 
                    value={birthday}  onChange={(e) =>setBirthday(e.target.value)}
                 
                  />
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group id="CIN">
                  <Form.Label>CIN</Form.Label>
                  <Form.Control  type="text" id="cin" name="cin" 
                  value={cin }  onChange={(e) =>setCin(e.target.value)}
                 
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
