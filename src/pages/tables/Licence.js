
import React,{useEffect,useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faBellSlash,faToggleOff , faToggleOn} from '@fortawesome/free-solid-svg-icons';

import { Breadcrumb } from '@themesberg/react-bootstrap';
import { Col, Row, Nav, Card, Button, Table,Pagination, Modal } from '@themesberg/react-bootstrap';
import axios from "../examples/api/axios";
const LICENCE_URL='licencelist_info/';
import { Link } from 'react-router-dom';
import { Routes } from "../../routes";
const Licence = () =>{
  const token = localStorage.getItem("token");
const role=localStorage.getItem("role");
  const [showDefault, setShowDefault] = useState();
  const handleClose = () => setShowDefault(false);
  const [showDefaults, setShowDefaults] = useState(); 
  const [showDefaultss, setShowDefaultss] = useState();
  const [state,setState]=useState([])
   const [state1,setState1]=useState([]);
    useEffect(() => {
      const token = localStorage.getItem("token");
      axios.post(LICENCE_URL,{userid:localStorage.getItem("id")},{ headers : {'Content-Type': 'application/json','Authorization':  `TOKEN ${token}`,
      'Access-Control-Allow-Origin':'Accept'}})
    .then(res => {
    const persons = res.data;
    console.log(persons)
    setState1(persons)}
  
    )},[])


  return (
  
    <>
        <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-xl-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item>Tables</Breadcrumb.Item>
            <Breadcrumb.Item active>Licences</Breadcrumb.Item>
          </Breadcrumb>
          <Row>
          <Col md={8} className="mb-3">
          <h4>Liste des licences</h4>
          </Col>    
          <Col md={4} className="mb-3">
          <Button
            variant="primary" as={Link} to={Routes.Role.path} >
            Ajouter Licence
            </Button>
          </Col>
          </Row>
        </div>
      </div>
      <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table  className="user-table align-items-center" responsive>
          <thead>
            <tr>
              <th className="border-bottom">Saison</th>
              <th className="border-bottom">Licence</th>
              <th className="border-bottom">CIN</th>
               <th className="border-bottom">Nom</th> 
              <th className="border-bottom">Prenom</th> 
              <th className="border-bottom">Club</th>
              <th className="border-bottom">Role</th>
              <th className="border-bottom">addresse</th>

              <th className="border-bottom">Weight</th>
              <th className="border-bottom">Grade</th>
              <th className="border-bottom">Degre</th>
              <th className="border-bottom">Etat</th>
              <th className="border-bottom">Actions</th>
              
            </tr>
          </thead>
          <tbody>
      
          {state1.map(person => (
        
        <>
        <tr >
              <td className="border-0 "  >{person.licence.seasons}</td>
              <td className="border-0 "  >{person.licence.num_licences}</td>
              <td className="border-0 "  >{person.profile.cin}</td>
              <td className="border-0 "  >{person.profile.first_name}</td>
              <td className="border-0 "  >{person.profile.last_name}</td> 
              <td className="border-0 "  >{person.licence.club}</td>
              <td className="border-0 "  >{person.licence.role}</td>
              <td className="border-0 "  >{person.profile.address}</td>
              <td className="border-0 "  >{person.licence.weight}</td>
              <td className="border-0 "  >{person.licence.grade}</td>
              <td className="border-0 "  >{person.licence.degree}</td>
              <td className="border-0 "  >
              {(() => {
        switch (person.licence.state) {
          case "Activee":   return  <FontAwesomeIcon icon={faToggleOn} color={"green"} 
          /> ;
          case "En Attente": return <FontAwesomeIcon icon={faToggleOff} color={"red"}  />;
          case "Expiree": return <FontAwesomeIcon icon={faToggleOff} color={"gray"}  />;
          default:        return "--";
        }
      })()} 
              
              </td>
              {role==1&&
              <td className="border-0 "><Button variant="primary" className="my-0" onClick={(e) => setShowDefaults(
          
                axios.put(`validateLicence/${person.licence.num_licences}/`,{ headers : {'Content-Type': 'Application/json','Authorization':  `TOKEN ${token}`,
                'Access-Control-Allow-Origin':'Accept'}})
             .then(response => {
               console.log("Valide successfully!")
               window.location.reload(false);
             })
             .catch(error => {
               console.log("Something went wrong", error)
             })

              )}>Valider</Button>
              &nbsp;  &nbsp; <Button variant="primary" className="my-0" onClick={(e) => setShowDefaultss(
          
          axios.put(`verifyLicence/${person.licence.num_licences}/`)
          .then(res => {
            const num_licences =person.num_licences;
           
            console.log(num_licences);
            setState([...state, num_licences]);
            const persons = res.data;
          
            console.log(persons);
            window.location.reload(false);
        }) 

        )}>Verifier</Button>&nbsp;
        <Button variant="primary" className="my-0" onClick={(e) => setShowDefaultss(
          
          axios.delete(`licences/${person.licence.num_licences}/`,{ headers: {'Content-Type': 'multipart/form-data','Authorization':  `TOKEN ${token}`,
          'Access-Control-Allow-Origin':'Accept'} })
          .then(res => {
            const num_licences =person.num_licences;
           
            console.log(num_licences);
            setState([...state, num_licences]);
            const persons = res.data;
          
            console.log(persons);
            window.location.reload(true);
        }) 

        )}>Supprimer</Button>&nbsp; 
        <Button variant="primary" className="my-0"  as={Link} to={Routes.LicenceUpd.path} onClick={() => 
        setShowDefault(localStorage.setItem('lic',person.licence.num_licences))}>Modifier</Button>
    
              </td> }
              {/* <Button variant="primary" className="my-0" onClick={() => setShowDefault(true)}>Details</Button></td> */}
              
              

<Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}  onClickonSubmit={() => setShowDefaults(
     axios.get(`licence_info/${person.num_licences}/`)
     .then(res => {
       const num_licences =person.num_licences;
       localStorage.setItem('lic',num_licences)
       setState1([...state1, num_licences]);
       const persons=res.data
     //   const roles=persons.map(roles => roles.user);
     //   const mapData = ([...roles]);
     //  console.log(mapData);
     //   setState1(mapData);
       }  )
      )}>
  <Modal.Header>
    <Modal.Title className="h6"> {person.num_licences}</Modal.Title>
    <Button variant="close" aria-label="Close" onClick={handleClose} />
  </Modal.Header>
  <Modal.Body>
  
       
        
       
  <div key={person}>
              <div className="border-0 "  >{person.seasons}</div></div>

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


              {/* <React.Fragment>

                <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
                  <Modal.Header>
                    <Modal.Title className="h6">Edite athletes</Modal.Title>
                    <Button variant="close" aria-label="Close" onClick={handleClose} />
                  </Modal.Header>
                  <Modal.Body>
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
              </React.Fragment> */}
              {/* </> ))} */}
              </tr></>))}
          </tbody>
        </Table>
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <Nav>
            <Pagination className="mb-2 mb-lg-0">
              <Pagination.Prev>
                Previous
              </Pagination.Prev>
              <Pagination.Item active>1</Pagination.Item>
              <Pagination.Item>2</Pagination.Item>
              <Pagination.Item>3</Pagination.Item>
              <Pagination.Item>4</Pagination.Item>
              <Pagination.Item>5</Pagination.Item>
              <Pagination.Next>
                Next
              </Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-bold">
            {/* Showing <b>{totalTransactions}</b> out of <b>25</b> entries */}
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
      

       {/* <PageTrafficTable /> */}
    </>
  );
};
export default (Licence);
