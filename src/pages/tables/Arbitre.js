
import React , {useEffect,useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faTrashAlt,faEdit, faCheck } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb } from '@themesberg/react-bootstrap';
import { Col, Row, Card, Button, Table,Modal ,Form } from '@themesberg/react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { Routes } from "../../routes";
const PARAMETER_URL='parameters/'
import Container from 'react-bootstrap/Container';

import axios from "../examples/api/axios";
const ARBITRE_URL='arbitratorlist_info/';
const Arbitre = () =>{
  const [grade,setGrades]=useState();
  const [state4,setState4]=useState([]);
  useEffect(() => {
    axios.get(PARAMETER_URL)
   .then(res => {

    
     const grades=res.data.Grades;

     
     setState4(grades)
     
     //console.log(club)


 })},[])
const location = useLocation();
useEffect(() => {
window.localStorage.setItem("loc",location.state);
const loc=localStorage.getItem("loc");
console.log(loc) 
  }, []);
const ok = localStorage.getItem("ok");
const token = localStorage.getItem("token");
const [showDefault, setShowDefault] = useState(false);
const handleClose = () => setShowDefault(false);
const [showDefaults, setShowDefaults] = useState();  
const [state,setState]=useState([]);
const [lang, setLang] = useState([]);
const [succ,setSucc] = useState();
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
  axios.post(ARBITRE_URL,  {
     "grade":grade
    
  },{
    headers: {
      "Content-type": "application/json",
      "Authorization": `Token ${token}`
    }
  })
  .then(res => {
    const persons = res.data;
    setState(persons);
    console.log(persons)
    setSucc(
      <>
       {persons.map((person) => (
        <><tr>
              <td className="border-0 "> <input  value={person.arbitrator.id} type="checkbox" onChange={handleChange} /></td>
              <td className="border-0 ">{person.profile.id}</td>
              <td className="border-0 ">{person.profile.cin}</td>
              <td className="border-0 ">{person.profile.last_name}</td>
              <td className="border-0 ">{person.profile.first_name}</td>
              <td className="border-0 ">{person.profile.sexe}</td>
              <td className="border-0 ">{person.profile.birthday}</td>
              <td className="border-0 ">{person.profile.phone}</td>
              <td className="border-0 ">{person.profile.address}</td>
              <td className="border-0 ">{person.arbitrator.club}</td>
              <td className="border-0 ">{person.arbitrator.grade}</td>
              <td className="border-0 "><img src={person.arbitrator.identity_photo}  height={80} width={80}/></td>
              <td className="border-0 "><img src={person.arbitrator.photo} height={80} width={80}/></td>
            
              <td className="border-0 "> 
              {show.current && <>
              <Button variant="primary" className="my-0"  as={Link} to={Routes.LicenceAthlete.path} onClick={() => setShowDefault(
                localStorage.setItem('at',person.arbitrator.id),
                localStorage.setItem('ph',person.arbitrator.photo),
                localStorage.setItem('iden',person.arbitrator.identity_photo),
                localStorage.setItem('mid',person.arbitrator.medical_photo),
                localStorage.setItem('role',"1"),
                
             )}><FontAwesomeIcon icon={faCheck} color={"white"}  /></Button> &nbsp;
              
              <Button variant="primary" className="my-0" onClick={() => setShowDefaults(
                axios.delete(`arbitrator/${person.arbitrator.id}/`,{ headers : {'Content-Type': 'multipart/form-data','Authorization':  `TOKEN ${token}`,
                'Access-Control-Allow-Origin':'Accept'}})
                .then(response => {
                  console.log("deleted successfully!")
                  window.location.reload(false);
                })
                .catch(error => {
                  console.log("Something went wrong", error)
                })
           
                 
              )}><FontAwesomeIcon icon={faTrashAlt} color={"white"}  />
              </Button>&nbsp;
              <Button variant="primary" className="my-0" as={Link} to={Routes.ArUpd.path} onClick={() => setShowDefault(                localStorage.setItem('at',person.arbitrator.id),
)}><FontAwesomeIcon icon={faEdit} color={"white"}  /> 
              </Button></> }  </td>  
             
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
      
      </>
    )
})},[grade])
const [success, setSuccess] = useState (false) ;

const comp=localStorage.getItem("comp");
const COMPs_URL=`competition/${comp}/`;
localStorage.setItem("checked",lang);
const role=localStorage.getItem("id");
const show = useRef(false);

  if (role==1)
  {
    show.current = true;
   // console.log( show.current );
  }
  else
  {
    show.current = false;
   // console.log( show.current );
  }
const handlesubmit = async (e) => {
  e.preventDefault();
try {
const token=localStorage.getItem("token")

    axios.put(
      COMPs_URL,
      ({  "arbitrators":lang}),
       { headers: {'Content-Type': 'Application/json','Authorization':  `TOKEN ${token}`,
        'Access-Control-Allow-Origin':'Accept'} }) .then(

          localStorage.removeItem('ok')
        )
    setSuccess(<div className="alert alert-success d-flex align-items-center" role="alert">
    <div>
    Liste des arbitres et des athletes  ajouté avec succès 
   </div>
  </div>);
  // const timer = setTimeout(() => {
  //   // console.log('This will run after 1 second!')
  //   window.location.reload(false);
  // }, 3000);
  return () => clearTimeout(timer);
 
}catch(error) {
  setSuccess(error)
}
}
  return (
    <>
      <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-xl-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item>Tables</Breadcrumb.Item>
            <Breadcrumb.Item active>Arbitres</Breadcrumb.Item>
          </Breadcrumb>
     

       
       </div>
    
      </div>    
      <Row className="align-items-center">
          <Col md={3} >
          <h4>Liste des arbitres</h4>
          </Col>    
          <Col md={3} >
          
          <Button   variant="primary" as={Link} to={Routes.photosarb.path}>
Ajouter arbitre             
            </Button>
          </Col>          <Col md={3} >
          {ok ? (
          <Button
            variant="primary" onClick={handlesubmit}>
Ajouter a compétition          
            </Button>):(<p></p>)}
          </Col>
          <Col md={3} className="mb-3">  
                   
          Grade :<Form.Select id="grade"   name="grade"  value={grade}  onChange={(e) =>setGrades(e.target.value)}
                                  autoComplete="off" >
                                    <option></option>
                                    {state4.map((person) => (<>
                                  
                              <option value={person.id}> 
        {person.Grade}</option>    </>   ))}
                  </Form.Select>
                  </Col>
          </Row>

      <Card border="light" className="shadow-sm mb-4">
      <Card.Body className="pb-0">
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0">//</th>
              <th className="border-0">Licence</th>
              <th className="border-0">CIN</th>
              <th className="border-0">Nom</th>
              <th className="border-0">Prenom</th>
              <th className="border-0">Sexe</th>
              <th className="border-0">Date de naissance </th>
              <th className="border-0">téléphone </th>
              <th className="border-0">Addresse </th>
              <th className="border-0">Club </th>
              <th className="border-0">Grade </th>
              <th className="border-0">Grade Photo </th>
              <th className="border-0">Identité Photo </th>

              <th className="border-0">Actions</th>
              {/* <th className="border-0">sexe</th>
              <th className="border-0">Club</th>
              <th className="border-0">Ligue</th>
              <th className="border-0">Ligue</th> */}
             
            </tr>
          </thead>
          <tbody>
         {succ}
          </tbody>
          {/* <div>{localStorage.setItem("checked",lang)}</div> */}
        </Table>
      </Card.Body>
    </Card>

       {/* <PageTrafficTable /> */}
    </>
  );
};
export default (Arbitre);
