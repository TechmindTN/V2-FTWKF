
import React , {useEffect,useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPen } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb } from '@themesberg/react-bootstrap';
import { Col, Row, Nav, Card, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup, Modal } from '@themesberg/react-bootstrap';
import { Routes } from "../../routes";
import { Link } from 'react-router-dom';
import axios from "../examples/api/axios";
const SUP_URL='supporter/';

const Supporteur = () =>{
const[datas,setData]=useState('');
const [showDefault, setShowDefault] = useState(false);
const handleClose = () => setShowDefault(false);
const [showDefaults, setShowDefaults] = useState();
const[id,setId]=useState([])
const [state,setState]=useState([])
useEffect(() => {
  axios.get(SUP_URL)
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
            <Breadcrumb.Item active>Supporteurs</Breadcrumb.Item>
          </Breadcrumb>
          <Row>
          <Col md={8} className="mb-3">
          <h4>Liste des supporteurs</h4>
          </Col>    
          <Col md={4} className="mb-3">
          <Button
            variant="primary" as={Link} to={Routes.SuppAdd.path}>
Ajouter Supporteur             
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
              <th className="border-0">Nom</th>
              <th className="border-0">Club </th>
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
              <td className="border-0 ">{person.id}</td>
              <td className="border-0 ">{person.name}</td>
              <td className="border-0 ">{person.profile}</td>
              <td className="border-0 "> 
              <Button variant="primary" className="my-0" onClick={(e) => setShowDefaults(
                axios.put(`validateLicence/${person.id}/`)
                .then(res => {
                  const persons = res.data;
                  setState(persons);
                  console.log(persons);
              
              })
           
                 
              )}>Details 
              </Button> &nbsp;
              <Button variant="primary" className="my-0" onClick={() => setShowDefault(true)}>Details {person.id}</Button></td>
             
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
export default (Supporteur);
