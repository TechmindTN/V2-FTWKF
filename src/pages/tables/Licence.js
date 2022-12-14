
import React,{useEffect,useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb } from '@themesberg/react-bootstrap';
import { Col, Row, Nav, Card, Button, Table,Pagination, Modal } from '@themesberg/react-bootstrap';
import axios from "../examples/api/axios";
const LICENCE_URL=`licencelist_info/`;
import { Link } from 'react-router-dom';
import { Routes } from "../../routes";
const INFO_URL='licence_info/';
const Licence = () =>{
  const token = localStorage.getItem("token");

  const [showDefault, setShowDefault] = useState();
  const handleClose = () => setShowDefault(false);
  const [showDefaults, setShowDefaults] = useState(); 
  const [showDefaultss, setShowDefaultss] = useState();
  const [showDefault1, setShowDefault1] = useState();
  const [state,setState]=useState([]);
   const [state1,setState1]=useState([]);
   useEffect(() => {
  axios.get(LICENCE_URL)
  .then(res => {
    const persons = res.data;
    setState(persons);
    const lic=res.data;
   // console.log(persons[0].user);
    persons.map(x => console.log(x.user));
    for (var index = 0; index < persons.length; index++) {
     
         console.log(`FirstName=${persons[index].first_name} LastName= ${details[index].first_name}`);
      
   }
    // console.log(lic);
    // console.log(persons);
    //console.log(Object.values(persons));

    const roles=persons.map(roles => roles.user);
    const mapData = ([...roles]);
   console.log(mapData);
    setState1(mapData);
    
    
})},[])


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
            variant="primary" as={Link} to={Routes.LicenceAdd.path} >
            Ajouter Licence
             
            </Button>
    
          </Col>
          </Row>
          
        </div>
      </div>
      <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">Saison</th>
              <th className="border-bottom">Licence</th>
              <th className="border-bottom">Club</th>
              <th className="border-bottom">Role</th>
              <th className="border-bottom">Weight</th>
              <th className="border-bottom">Grade</th>
              <th className="border-bottom">Degre</th>
              <th className="border-bottom">Etat</th>
              <th className="border-bottom">Actions</th>
              
            </tr>
          </thead>
          <tbody>
          {state.map(x => console.log(x.user))}
          {state.map(person => (
       
        
        <>
       
        <tr key={person}>
              <td className="border-0 "  >{person.seasons}</td>
              <td className="border-0 "  >{person.num_licences}</td>
              <td className="border-0 "  >{person.club}</td>
              <td className="border-0 "  >{person.role}</td>
              <td className="border-0 "  >{person.weight}</td>
              <td className="border-0 "  >{person.grade}</td>
              <td className="border-0 "  >{person.degree}</td>
              <td className="border-0 "  >{person.state}</td>
              <td className="border-0 "><Button variant="primary" className="my-0" onClick={(e) => setShowDefaults(
          
                axios.put(`validateLicence/${person.num_licences}/`)
                .then(res => {
                  const num_licences =person.num_licences;
                 
                  console.log(num_licences);
                  setState([...state, num_licences]);
                  const persons = res.data;
                
                  console.log(persons);
                  window.location.reload(false);
              }) 

              )}>Valider</Button>
              &nbsp;  &nbsp; <Button variant="primary" className="my-0" onClick={(e) => setShowDefaultss(
          
          axios.put(`verifyLicence/${person.num_licences}/`)
          .then(res => {
            const num_licences =person.num_licences;
           
            console.log(num_licences);
            setState([...state, num_licences]);
            const persons = res.data;
          
            console.log(persons);
            window.location.reload(false);
        }) 

        )}>Verifier</Button>&nbsp;<Button variant="primary" className="my-0" onClick={(e) => setShowDefaultss(
          
          axios.delete(`licences/${person.num_licences}/`,{ headers: {'Content-Type': 'multipart/form-data','Authorization':  `TOKEN ${token}`,
          'Access-Control-Allow-Origin':'Accept'} })
          .then(res => {
            const num_licences =person.num_licences;
           
            console.log(num_licences);
            setState([...state, num_licences]);
            const persons = res.data;
          
            console.log(persons);
            window.location.reload(false);
        }) 

        )}>Supprimer</Button>&nbsp; 
        <Button variant="primary" className="my-0" onClick={() => setShowDefault(true
        
        )}>Details</Button>
    
              </td> 
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
