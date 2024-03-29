
import React , {useEffect,useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faTrashAlt,faEdit,faCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb } from '@themesberg/react-bootstrap';
import { Col, Row, Nav, Card, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup, Modal } from '@themesberg/react-bootstrap';
import { Routes } from "../../routes";
import { Link, useHistory  } from "react-router-dom";

import axios from "../examples/api/axios";
const ATHLETE_URL='athletelist_info/';
const Athletes = () =>{
const history = useHistory();
const[datas,setData]=useState('');
const [showDefault, setShowDefault] = useState(false);
const handleClose = () => setShowDefault(false);
const [showDefaults, setShowDefaults] = useState();
const [state,setState]=useState([])
const token = localStorage.getItem("token");

const [lang, setLang] = useState([]);
 
const handleChange = e => {
  const { value, checked } = e.target;
  if (checked) {
    // push selected value in list
    setLang(prev => [...prev, value]);

  } else {
    // remove unchecked value from the list
    setLang(prev => prev.filter(x => x !== value));

  }

}

   useEffect(() => {
    axios.post(ATHLETE_URL,
       {
      headers: {
        "Content-type": "application/json",
        "Authorization": `Token ${token}`
      }
    })
    .then(res => {
      const persons = res.data;
      setState(persons);
  
  })},[])




  return (
    <>
      <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-xl-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item>Tables</Breadcrumb.Item>
            <Breadcrumb.Item active>Athletes</Breadcrumb.Item>
          </Breadcrumb>
        
          <div >

    </div>


         

          {/* <button onClick={callAPI}>Call API</button>
          {<pre>{JSON.stringify(user)}</pre>} */}
       </div>
      </div>
      <Row>
          <Col md={2} className="mb-3">
          <h4>Liste des athletes</h4>
          </Col>    
      
          <Col md={2} className="mb-3">
          <Button
            variant="primary" as={Link} to={Routes.updphotos.path} >
           <FontAwesomeIcon icon={faPlus} color={"white"}  />  athlete 
             
            </Button>
          </Col>
          </Row>
      <Card border="light" className="shadow-sm mb-4">
      <Card.Body className="pb-0">
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0">//</th>
              <th className="border-0">Licences</th>
              <th className="border-0">Nom</th>
              <th className="border-0">Prenom</th>
              <th className="border-0">Date Naissance</th>
              <th className="border-0">Addresse </th>
              <th className="border-0">Téléphone </th>
              <th className="border-0">Age</th>
              <th className="border-0">Grade</th>
              <th className="border-0">Degré</th>
              <th className="border-0">Poids</th>
              <th className="border-0">Photo</th>
              <th className="border-0">Identité</th>
              <th className="border-0">fiche médicale</th>
              <th className="border-0">Actions</th>
              {/* <th className="border-0">sexe</th>
              <th className="border-0">Club</th>
              <th className="border-0">Ligue</th>
              <th className="border-0">Ligue</th> */}
             
            </tr>
          </thead>
          <tbody>
          {state.map((person) => (
        <><tr key={person.athlete.id}>
<td className="border-0 " > <input   value={person.athlete.id} type="checkbox" onChange={handleChange}/></td>
              <td className="border-0 "><div >{person.profile.licences}</div></td>
              <td className="border-0 ">{person.profile.last_name}</td>
              <td className="border-0 ">{person.profile.first_name}</td>
              <td className="border-0 ">{person.profile.birthday}</td>
              <td className="border-0 ">{person.profile.address}</td>
              <td className="border-0 ">{person.profile.phone}</td>
              <td className="border-0 ">{person.athlete.category_id}</td>
              <td className="border-0 ">{person.athlete.grade_id}</td>
              <td className="border-0 ">{person.athlete.id_degree}</td>
              <td className="border-0 ">{person.athlete.weights}</td>
              <td className="border-0 "><img height={80} width={80} src={person.athlete.photo}    /></td>
              <td className="border-0 "><img height={80} width={80} src={person.athlete.identity_photo}    /></td>
              <td className="border-0 "><img height={80} width={80} src={person.athlete.medical_photo}    /></td>

              <td className="border-0 "> 
            
              <Button variant="primary" className="my-0"  as={Link} to={Routes.LicenceAthlete.path} onClick={() => setShowDefault(
                localStorage.setItem('at',person.athlete.id),
                localStorage.setItem('ph',person.athlete.photo),
                localStorage.setItem('iden',person.athlete.identity_photo),
                localStorage.setItem('mid',person.athlete.medical_photo),
                localStorage.setItem('role',person.profile.role),
                
             )}><FontAwesomeIcon icon={faCheck} color={"white"}  /></Button>  &nbsp;
              <Button variant="primary" className="my-0" onClick={(e) => setShowDefaults(
             axios.delete(`athlete/${person.athlete.id}/`, { headers : {'Content-Type': 'multipart/form-data','Authorization':  `TOKEN ${token}`,
       'Access-Control-Allow-Origin':'Accept'}})
    .then(response => {
      console.log("deleted successfully!")
      window.location.reload(false);
    })
    .catch(error => {
      console.log("Something went wrong", error)
    })
              )}><FontAwesomeIcon icon={faTrashAlt} color={"white"}  />
              </Button> &nbsp;
              <Button variant="primary" className="my-0"  as={Link} to={Routes.AthleteUpd.path} onClick={() => setShowDefault(
                localStorage.setItem('at',person.athlete.id)
                
             )}><FontAwesomeIcon icon={faEdit} color={"white"}  /></Button> <br/>
              <div>
           
</div>
             </td>
            
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
        <div>{localStorage.setItem("checked",lang)}</div>
      </Card.Body>
    </Card>

       {/* <PageTrafficTable /> */}
    </>
  );
};
export default (Athletes);
