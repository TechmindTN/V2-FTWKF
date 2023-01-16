
import React , {useEffect,useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPen } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb } from '@themesberg/react-bootstrap';
import { Col, Row, Nav, Card, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup, Modal } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import { Routes } from "../../routes";

import axios from "../examples/api/axios";
const ENT_URL='coachlist_info/';
const ATHLETE_URLs='athlete/'

const Entraineur = () =>{
const[datas,setData]=useState('');
const [showDefault, setShowDefault] = useState(false);
const handleClose = () => setShowDefault(false);
const [showDefaults, setShowDefaults] = useState();
  const[id,setId]=useState([])
  const token = localStorage.getItem("token");

const [state,setState]=useState([])
useEffect(() => {
  axios.get(ENT_URL,
  { headers: {'Content-Type': 'multipart/form-data','Authorization':  `TOKEN ${token}`,
    'Access-Control-Allow-Origin':'Accept'} })
  .then(res => {
    const persons = res.data;
    setState(persons);
    console.log(persons)

})},[])





  return (
    <>
      <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-xl-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item>Tables</Breadcrumb.Item>
            <Breadcrumb.Item active>Entraineurs</Breadcrumb.Item>
          </Breadcrumb>
          <Row>
          <Col md={8} className="mb-3">
          <h4>Liste des entraineurs</h4>
          </Col>    
          <Col md={4} className="mb-3">
          <Button
            variant="primary" as={Link} to={Routes.photosent.path} >
Ajouter entraineur             
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
            <th className="border-0">ID</th> 
            <th className="border-0">CIN</th>
              <th className="border-0">Nom</th>
              <th className="border-0">Prenom</th>
              <th className="border-0">Sexe</th>
              <th className="border-0">Date Naissance</th>
              <th className="border-0">Profile </th>
              <th className="border-0">Grade </th>
              <th className="border-0">Photo </th>
              <th className="border-0">Degré </th>
              <th className="border-0">Actions</th>
              {/* <th className="border-0">sexe</th>
              <th className="border-0">Club</th>
              <th className="border-0">Ligue</th>
              <th className="border-0">Ligue</th> */}
             
            </tr>
          </thead>
          <tbody>
          {state.map((person) => (
        <><tr>
           <td className="border-0 ">{person.coach.id}</td>
              <td className="border-0 ">{person.profile.cin}</td>
              <td className="border-0 ">{person.profile.last_name}</td>
              <td className="border-0 ">{person.profile.first_name}</td>
              <td className="border-0 ">{person.sex}</td>
              <td className="border-0 ">{person.profile.birthday}</td>
              <td className="border-0 ">{person.coach.grade}</td>
              <td className="border-0 "><img  src={person.coach.identity_photo} width={100} /></td>
              <td className="border-0 "><img  src={person.coach.degree_photo}  width={100} /></td>
              <td className="border-0 "><img  src={person.coach.grade_photo} width={100} /></td>
              <td className="border-0 "> 
              <Button variant="primary" className="my-0" onClick={(e) => setShowDefaults(
                
                axios.delete(`coach/${person.coach.id}/`,{ headers: {'Content-Type': 'multipart/form-data','Authorization':  `TOKEN ${token}`,
                'Access-Control-Allow-Origin':'Accept'} })
                .then(res => {
                  const persons = res.data;
                  setState(persons);
                  console.log(persons);
                  window.location.reload(false);          
              })
           
                 
              )}>Supprimer 
              </Button> &nbsp;
              <Button variant="primary" className="my-0"  as={Link} to={Routes.EntUpd.path} onClick={() => setShowDefault(
                localStorage.setItem('ent',person.coach.id)
                
             )}>Modifier</Button>
              {/* <Button variant="primary" className="my-0" onClick={() => setShowDefault(true)}>Details {person.id}</Button> */}
              </td>
             
              <React.Fragment>

                <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
                  <Modal.Header>
                    <Modal.Title className="h6"> {person.id}</Modal.Title>
                    <Button variant="close" aria-label="Close" onClick={handleClose} />
                  </Modal.Header>
                  <Modal.Body>
                 {person.cin}
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
export default (Entraineur);
