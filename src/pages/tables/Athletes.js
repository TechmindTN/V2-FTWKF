
import React , {useEffect,useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPen } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb } from '@themesberg/react-bootstrap';
import { Col, Row, Nav, Card, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup, Modal } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import { Routes } from "../../routes";

import axios from "../examples/api/axios";
const ATHLETE_URL='athletelist_info/';
const Athletes = () =>{
const[datas,setData]=useState('');
const [showDefault, setShowDefault] = useState(false);
const handleClose = () => setShowDefault(false);
const [showDefaults, setShowDefaults] = useState();
  const[id,setId]=useState([])
 

const [state,setState]=useState([])
const token = localStorage.getItem("token");
useEffect(() => {
  axios.get(ATHLETE_URL, { headers: {'Content-Type': 'multipart/form-data','Authorization':  `TOKEN ${token}`,
  'Access-Control-Allow-Origin':'Accept'} })
  .then(res => {
    const persons = res.data;
    setState(persons);
    console.log(state)

})},[])
const [file, setFile] = useState();
function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
}


  return (
    <>
      <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-xl-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item>Tables</Breadcrumb.Item>
            <Breadcrumb.Item active>Athletes</Breadcrumb.Item>
          </Breadcrumb>
          <Row>
          <Col md={8} className="mb-3">
          <h4>Liste des athletes</h4>
          </Col>    
      
          <Col md={4} className="mb-3">
          <Button
            variant="primary" as={Link} to={Routes.Athleteadd.path} >
            Ajouter athlete 
             
            </Button>
          </Col>
          </Row>
          <div >

    </div>


         

          {/* <button onClick={callAPI}>Call API</button>
          {<pre>{JSON.stringify(user)}</pre>} */}
       </div>
      </div>
      <Card border="light" className="shadow-sm mb-4">
      <Card.Body className="pb-0">
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0">CIN</th>
              <th className="border-0">Nom</th>
              <th className="border-0">Prenom</th>
              <th className="border-0">Date Naissance</th>
              <th className="border-0">Addresse </th>
              <th className="border-0">Age</th>
              <th className="border-0">Grade</th>
              <th className="border-0">Degré</th>
              <th className="border-0">Role</th>
              <th className="border-0">Photo</th>
              <th className="border-0">Actions</th>
              {/* <th className="border-0">sexe</th>
              <th className="border-0">Club</th>
              <th className="border-0">Ligue</th>
              <th className="border-0">Ligue</th> */}
             
            </tr>
          </thead>
          <tbody>
          {state.map(person => (
        <><tr>
              <td className="border-0 ">{person.profile.cin}</td>
              <td className="border-0 ">{person.profile.last_name}</td>
              <td className="border-0 ">{person.profile.first_name}</td>
              <td className="border-0 ">{person.profile.birthday}</td>
              <td className="border-0 ">{person.profile.address}</td>
              <td className="border-0 ">            {person.athlete.category_id}           </td>
              <td className="border-0 ">            {person.athlete.grade_id}           </td>
              <td className="border-0 ">            {person.athlete.id_degree}           </td>
              <td className="border-0 ">            {person.profile.role}           </td>
              <td className="border-0 ">       <img      width={150} src={person.athlete.identity_photo}    />       </td>
              <td className="border-0 "> 
              <Button variant="primary" className="my-0" onClick={(e) => setShowDefaults(
                 
                axios.delete(`athlete/${person.athlete.id}/`, { headers: {'Content-Type': 'multipart/form-data','Authorization':  `TOKEN ${token}`,
                'Access-Control-Allow-Origin':'Accept'} })
                .then(res => {
                  const num_licences =person.profile.id;
                  setState([...state, num_licences]);
                  window.location.reload(true);
              })                 
              )}>Supprimer 
              </Button> &nbsp;
              <Button variant="primary" className="my-0"  as={Link} to={Routes.AthleteUpd.path} onClick={() => setShowDefault(
                localStorage.setItem('at',person.profile.id)
                
             )}>Modifier</Button></td>
             
              <React.Fragment>

                <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
                  <Modal.Header>
                    <Modal.Title className="h6"> {person.profile.id}</Modal.Title>
                    <Button variant="close" aria-label="Close" onClick={handleClose} />
                  </Modal.Header>
                  <Modal.Body>
                 {person.profile.id}
                    <p>With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.</p>
                    <p>The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.</p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      I Got It
                    </Button>
                    <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </React.Fragment>
              {/* </> ))} */}
            </tr></>))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>

       {/* <PageTrafficTable /> */}
    </>
  );
};
export default (Athletes);
