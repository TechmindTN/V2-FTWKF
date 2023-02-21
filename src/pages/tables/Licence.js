
import React,{useEffect,useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faEdit, faHome, faRecycle, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faBellSlash,faToggleOff , faToggleOn} from '@fortawesome/free-solid-svg-icons';
import {TransactionsTable, PageTrafficTable } from "../../components/Tables";

import { Breadcrumb } from '@themesberg/react-bootstrap';
import { Col, Row, Nav, Card, Button, Table,Pagination, Modal , Form } from '@themesberg/react-bootstrap';
import axios from "../examples/api/axios";
const LICENCE_URL='licencelist_info/';
import { Link } from 'react-router-dom';
import { Routes } from "../../routes";
const PARAMETER_URL='parameters/'
const Licence = () =>{
  const [succ,setSucc] = useState();
  const token = localStorage.getItem("token");
  const role=localStorage.getItem("id");
  const [showDefault, setShowDefault] = useState();
  const handleClose = () => setShowDefault(false);
  const [showDefaults, setShowDefaults] = useState(); 
  const [showDefaultss, setShowDefaultss] = useState();
  const [state,setState]=useState([])
  const [state1,setState1]=useState([]);
  const[club, setClub] = useState();
  const[season, setSeason] = useState();
  const[roles, setRoles] = useState();
  const [state6,setState6]=useState([]);
  const [state5,setState5]=useState([]);
  const [state4,setState4]=useState([]);
  const [etat,setEtat]=useState();
  const [activated, setActivated]=useState("");
  const [statess,setStatess]=useState();
  const SAISON_URL='seasons/';

    useEffect(() => {
      axios.get(SAISON_URL)
      .then(res => {
        const saison=res.data;

        const arb2=saison.map(arb => arb.activated)
        const mapData2 = [...arb2];
        console.log(mapData2)
        saison.forEach(element => {
      if( element.activated==true){console.log(element.Seasons),setActivated(element.Seasons),localStorage.setItem("season",element.Seasons)}
    });
    })},[])
  useEffect(() => {
     axios.get(PARAMETER_URL)
    .then(res => {
      const Clubs=res.data.Clubs;
      const Seasons=res.data.Seasons;
      const Roles=res.data.Roles;
      setState6(Clubs);
      setState5(Seasons)
      setState4(Roles)
      
      //console.log(club)


  })},[])


 const id = localStorage.getItem("id")
 if(id==1) {
 useEffect(() => {

    let aa=etat;
    console.log(aa)   ;
    // if(etat==1){setEtat("Activee")} else if(etat==2){setEtat("En Attente")} else if(etat==3) {setEtat("Expiree")} 
     const token = localStorage.getItem("token");
    axios.post(LICENCE_URL,{userid:localStorage.getItem("id"),club:club,season:season,role:roles,state:etat},{ headers : {'Content-Type': 'application/json','Authorization':  `TOKEN ${token}`,
    'Access-Control-Allow-Origin':'Accept'}})
  .then(res => {
  const persons = res.data;
  console.log(persons)
  setState1(persons)
  setSucc(    

    <>

    {persons.map(person => (
  
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
    case "Activee"   : return  <FontAwesomeIcon icon={faToggleOn} color={"green"} /> ;
    case "En Attente": return <FontAwesomeIcon icon={faToggleOff} color={"red"}  />;
    case "Expiree"   : return <FontAwesomeIcon icon={faToggleOff} color={"gray"}  />;
    default          : return "--";
  }
})()} 
        
        </td>
        {role==1 &&
        <td className="border-0 ">
  
        
        {person.licence.state=="En Attente" &&<Button   variant="primary" onClick={(e) => setShowDefaults(
    
          axios.put(`validateLicence/${person.licence.num_licences}/`,{ headers : {'Content-Type': 'Application/json','Authorization':  `TOKEN ${token}`,
          'Access-Control-Allow-Origin':'Accept'}})
       .then(response => {
         console.log("Valide successfully!")
         //window.location.reload(false);
       })
       .catch(error => {
         console.log("Something went wrong", error)
       })

        )}>
        <FontAwesomeIcon icon={faCheck} color={"white"}  /></Button>}
        &nbsp; 

  <Button onClick={(e) => setShowDefaultss(
    
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

  )}> <FontAwesomeIcon icon={faTrashAlt} color={"white"}  /></Button>&nbsp; 
  <Button variant="primary" className="my-0"  as={Link} to={Routes.LicenceUpd.path} onClick={() => 
  setShowDefault(localStorage.setItem('lic',person.licence.num_licences))}><FontAwesomeIcon icon={faEdit} color={"white"}  /></Button>&nbsp;
  
  {person.licence.state=="Activee" && person.licence.seasons!=localStorage.getItem("season") &&
  <Button variant="primary" className="my-0"  as={Link} to={Routes.LicenceRenouv.path} onClick={() => 
  setShowDefault(localStorage.setItem('lic',person.licence.num_licences))}><FontAwesomeIcon icon={faRecycle} color={"white"}  /></Button> }

        </td> }
        {/* <Button variant="primary" className="my-0" onClick={() => setShowDefault(true)}>Details</Button></td> */}
        
        

<Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}  onClickonSubmit={() => setShowDefaults(
axios.get(`licence_info/${person.num_licences}/`,{ headers: {'Content-Type': 'Application/json','Authorization':  `TOKEN ${token}`,
'Access-Control-Allow-Origin':'Accept'} })
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

        </tr></>))}</>
  
)
}

  )


}, [club,season,roles,etat]);} else {
  useEffect(() => {

    let aa=etat;
    console.log(aa)   ;
    // if(etat==1){setEtat("Activee")} else if(etat==2){setEtat("En Attente")} else if(etat==3) {setEtat("Expiree")} 
     const token = localStorage.getItem("token");
    axios.post(LICENCE_URL,{userid:localStorage.getItem("id"),club:localStorage.getItem("club"),season:season,role:roles,state:etat},{ headers : {'Content-Type': 'application/json','Authorization':  `TOKEN ${token}`,
    'Access-Control-Allow-Origin':'Accept'}})
  .then(res => {
  const persons = res.data;
  console.log(persons)
  setState1(persons)
  setSucc(    

    <>

    {persons.map(person => (
  
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
    case "Activee"   : return  <FontAwesomeIcon icon={faToggleOn} color={"green"} /> ;
    case "En Attente": return <FontAwesomeIcon icon={faToggleOff} color={"red"}  />;
    case "Expiree"   : return <FontAwesomeIcon icon={faToggleOff} color={"gray"}  />;
    default          : return "--";
  }
})()} 
        
        </td>
        {role==1 &&
        <td className="border-0 ">
  
        
        {person.licence.state=="En Attente" &&<Button   variant="primary" onClick={(e) => setShowDefaults(
    
          axios.put(`validateLicence/${person.licence.num_licences}/`,{ headers : {'Content-Type': 'Application/json','Authorization':  `TOKEN ${token}`,
          'Access-Control-Allow-Origin':'Accept'}})
       .then(response => {
         console.log("Valide successfully!")
         //window.location.reload(false);
       })
       .catch(error => {
         console.log("Something went wrong", error)
       })

        )}>
        <FontAwesomeIcon icon={faCheck} color={"white"}  /></Button>}
        &nbsp; 

  <Button onClick={(e) => setShowDefaultss(
    
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

  )}> <FontAwesomeIcon icon={faTrashAlt} color={"white"}  /></Button>&nbsp; 
  <Button variant="primary" className="my-0"  as={Link} to={Routes.LicenceUpd.path} onClick={() => 
  setShowDefault(localStorage.setItem('lic',person.licence.num_licences))}><FontAwesomeIcon icon={faEdit} color={"white"}  /></Button>&nbsp;
  
  {person.licence.state=="Activee" && person.licence.seasons!=localStorage.getItem("season") &&
  <Button variant="primary" className="my-0"  as={Link} to={Routes.LicenceRenouv.path} onClick={() => 
  setShowDefault(localStorage.setItem('lic',person.licence.num_licences))}><FontAwesomeIcon icon={faRecycle} color={"white"}  /></Button> }

        </td> }
        {/* <Button variant="primary" className="my-0" onClick={() => setShowDefault(true)}>Details</Button></td> */}
        
        

<Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}  onClickonSubmit={() => setShowDefaults(
axios.get(`licence_info/${person.num_licences}/`,{ headers: {'Content-Type': 'Application/json','Authorization':  `TOKEN ${token}`,
'Access-Control-Allow-Origin':'Accept'} })
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

        </tr></>))}</>
  
)
}

  )


}, [club,season,roles,etat])
}




  return (
  
    <>
        <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-xl-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item>Tables</Breadcrumb.Item>
            <Breadcrumb.Item active>Licences</Breadcrumb.Item>
          </Breadcrumb>
        
        </div>
      </div>
      <Row className="align-items-center">
          <Col md={2}>
          <h4>Liste des licences</h4>
          </Col>    
          <Col  md={2} >
          <Button
            variant="primary" as={Link} to={Routes.Role.path} >
            Ajouter licence
            </Button>
          </Col>
          <Col md={2} className="mb-3" >
                <Form.Group id="etat">
                  <Form.Label>Etat</Form.Label>
                  <Form.Select id="etat"  name="etat" 
                                  autoComplete="off" value={etat}  onChange={(e) =>setEtat(e.target.value)}
                  >
                    <option ></option>
                    <option value="Activee">Activee</option>
                    <option value="En Attente">En Attente</option>
                    <option value="Expiree">Expiree</option>
                    
                  </Form.Select>
                </Form.Group>
              </Col>
          <Col md={2} className="mb-3" >
            
            <Form.Group id="roles">
                    <Form.Label>Role </Form.Label>
                    <Form.Select id="roles"   name="roles"  value={roles}  onChange={(e) =>setRoles(e.target.value)}
                                  autoComplete="off" >
                                    <option></option>
                                    {state4.map((person) => (<>
                                  
                              <option value={person.id}> 
        {person.roles}</option>    </>   ))}
                  </Form.Select>
                  </Form.Group>
       
            </Col>
          <Col md={2} className="mb-3">
            
            <Form.Group id="club">
                    <Form.Label>Club النادي</Form.Label>
                    <Form.Select id="club"   name="club"  value={club}  onChange={(e) =>setClub(e.target.value)}
                                  autoComplete="off" >
                                    <option></option>
                                    {state6.map((person) => (<>
                                  
                              <option value={person.id}> 
        {person.name}</option>    </>   ))}
                  </Form.Select>
                  </Form.Group>
       
            </Col>
            <Col md={2} className="mb-3">
            
            <Form.Group id="season">
                    <Form.Label>Season الموسم</Form.Label>
                    <Form.Select id="season"   name="season"  value={season}  onChange={(e) =>setSeason(e.target.value)}
                                  autoComplete="off" >
                                    <option></option>
                                    {state5.map((person) => (<>
                                  
                              <option value={person.id}> 
        {person.Seasons}</option>    </>   ))}
                  </Form.Select>
                  </Form.Group>
       
            </Col>
          </Row>
      <Card border="light" className="table-wrapper table-responsive shadow-sm">
<Card.Body className="pt-0">
  <Table  className="user-table align-items-center" responsive="sm">
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
    {succ}</tbody></Table></Card.Body></Card>

   
      
       {/* <TransactionsTable /> */}
       {/* <PageTrafficTable /> */}
    </>
  );
};
export default (Licence);
