
import React , {useEffect,useState,useRef} from "react";
import { Link } from 'react-router-dom';
import { Routes } from "../../routes";
import ProfileCover from "../../assets/img/profile-cover.jpg";
import { Form, Col, Row, Card, Button} from '@themesberg/react-bootstrap';
import axios from "./api/axios";
const Licenceadd = () =>{
  const ATHLETE_URL='athletelist_info/';
  const [showDefault, setShowDefault] = useState(false);
  const [state,setState] = useState([]); 
  const [succ,setSucc] = useState();
  const [Athlete, setAthlete] = useState();

  const token = localStorage.getItem("token");
  const role=localStorage.getItem("rolee")

  useEffect(() => {
      const role=localStorage.getItem("rolee")
      if(role=="1"){
        axios.post('arbitratorlist_info/', {
          headers: {
            "Content-type": "application/json",
            "Authorization": `Token ${token}`
          }}
        )
        .then(res => {
          const persons = res.data;
          setState(persons);
          console.log(persons)
             
      })
       }else if (role=="2"){
        axios.post(ATHLETE_URL, {
          headers: {
            "Content-type": "application/json",
            "Authorization": `Token ${token}`
          }})
    .then(res => {
      const persons = res.data;
      setState(persons);
      console.log(persons)
     
  })
       }else if (role=="3"){
        axios.get('supporterlist_info/', {
          headers: {
            "Content-type": "application/json",
            "Authorization": `Token ${token}`
          }})
        .then(res => {
          const persons = res.data;
          setState(persons);
          console.log(persons)
              
      })
       }else if (role=="4"){
        axios.get('coachlist_info/', {
          headers: {
            "Content-type": "application/json",
            "Authorization": `Token ${token}`
          }})
        .then(res => {
          const persons = res.data;
          setState(persons);
          console.log(persons)
                
      })
       }else if (role=="5"){
        console.log("manager")
             }
      
  },[])

  useEffect(() => {

    let aa=Athlete;
    console.log(aa)
    if(role=="2"){
    axios.get(`athlete_info/${aa}`, { headers: {'Content-Type': 'multipart/form-data','Authorization':`TOKEN ${token}`,
    'Access-Control-Allow-Origin':'Accept'} })
    .then(res => {
      const persons = res.data;
     
      console.log(persons)
      setSucc(
        <Row>
        <Col xs={12} xl={8}>
          <Card border="light" className="bg-white shadow-sm mb-4">
             
            <Card.Body>
            <Row>
              <Col md={10} className="mb-3">
              <h5 className="mb-4">Informations Generales </h5></Col>
              
              {/* <img src={photo} style={{ width: 100, height: 80 }}alt="icons" /> */}
              <Col md={2} className="mb-3">
              <Button variant="primary" className="my-0"  as={Link} to={Routes.LicenceAthlete.path} onClick={() => setShowDefault(
                localStorage.setItem('at',aa),
                localStorage.setItem('ph',persons.athlete.photo),
                localStorage.setItem('iden',persons.athlete.identity_photo),
                localStorage.setItem('mid',persons.athlete.medical_photo)
                
             )}>Licence</Button></Col>
                </Row>
              <Form >
          
                <Row>
                <Col md={6} className="mb-3">
                    <Form.Group id="emal">
                      <Form.Label>Role: <br/>Athlete </Form.Label> 
                     
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group id="firstName">
                      <Form.Label>Nom : <br/> {persons.profile.first_name} </Form.Label>  
                     
                    </Form.Group>
                  </Col>
                 
                </Row>
    
                <Row className="align-items-center">
                <Col md={6} className="mb-3">
                    <Form.Group id="lastName">
                      <Form.Label>Prenom : <br/> {persons.profile.last_name }</Form.Label>
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group id="birthday"  name="birthday" >
                      <Form.Label>Date de naissance : <br/> {persons.profile.birthday}</Form.Label> 
                  
                    </Form.Group>
                  </Col>
                  {/* <Col md={6} className="mb-3">
                    <Form.Group id="gender">
                      <Form.Label>Gendre</Form.Label>
                      <Form.Select id="gender"  name="gender" 
                                      autoComplete="off" >
                        <option value="0">Gender</option>
                        <option value="1">Femme</option>
                        <option value="2">Homme</option>
                      </Form.Select>
                    </Form.Group>
                  </Col> */}
                </Row>
                <Row>
                  <Col md={6} className="mb-3">
                    <Form.Group id="emal">
                      <Form.Label>Email :<br/>{persons.profile.mail} </Form.Label> 
                    </Form.Group>
                  </Col>
                  <Col md={6} className="mb-3">
                    <Form.Group id="phone">
                      <Form.Label>Téléphone :  <br/>  {persons.profile.phone}</Form.Label>
                     
                    </Form.Group>
                  </Col>
                </Row>
      
                <h5 className="my-4">Address</h5>
                <Row>
                  <Col sm={8} className="mb-3">
                    <Form.Group id="address">
                      <Form.Label>Address :<br/>{persons.profile.address} </Form.Label> 
                   
                    </Form.Group>
                  </Col>
                 
                </Row>
                <Row>
                  <Col sm={4} className="mb-3">
                    <Form.Group id="country">
                      <Form.Label>pays : <br/> {persons.profile.country} </Form.Label>
                     
                    </Form.Group>
                  </Col>
                  <Col sm={4} className="mb-3">
                    <Form.Group className="mb-2">
                      <Form.Label>Gouvernerat : <br/> {persons.profile.state}</Form.Label>
                     
                    </Form.Group>
                  </Col>
                  <Col sm={4}>
                    <Form.Group id="zip">
                      <Form.Label>Code Postal : <br/> {persons.profile.zip_code}</Form.Label>
                   
                    </Form.Group>
                  </Col>
                </Row>
                
               
              
              </Form>
            </Card.Body>
          </Card></Col>
          <Col xs={12} xl={4}>
          <Row>
            <Col xs={12}>
          
            <Card border="light" className="text-center p-0 mb-4">
      <div style={{ backgroundImage: `url(${ProfileCover})` }} className="profile-cover rounded-top" />
      <Card.Body className="pb-5">
        <Card.Img src={persons.profile.profile_photo} alt="Neil Portrait" className="user-avatar large-avatar rounded-circle mx-auto mt-n7 mb-4" />
        <Card.Title>{persons.profile.last_name}    {persons.profile.first_name}</Card.Title>
        <Card.Subtitle className="fw-normal"></Card.Subtitle>
        <Card.Text className="text-gray mb-4"></Card.Text>
       
      </Card.Body>
    </Card> 
    <Card border="light" className="text-center p-0 mb-4">
      <Card.Body className="pb-5">
        <Card.Title>Pieces jointes</Card.Title>
        <Card.Text className="text-gray mb-4">
        {(() => {
                switch (role) {
                  case "2": return  <><img src={persons.athlete.photo} /><img src={persons.athlete.identity_photo} /><img src={persons.athlete.medical_photo} /></>;
                                  default : return "--";
                }
              })()}    
        </Card.Text>
       
      </Card.Body>
    </Card>
  
            </Col>
         
          </Row>
        </Col></Row>
      
      )
  })
} else if(role=="1")
{
  axios.get(`arbitrator_info/${aa}`, { headers: {'Content-Type': 'multipart/form-data','Authorization':`TOKEN ${token}`,
  'Access-Control-Allow-Origin':'Accept'} })
  .then(res => {
    const persons = res.data;
   
    console.log(persons)
    setSucc(
      <Row>
      <Col xs={12} xl={8}>
        <Card border="light" className="bg-white shadow-sm mb-4">
           
          <Card.Body>
          <Row>
            <Col md={10} className="mb-3">
            <h5 className="mb-4">Informations Generales </h5></Col>
            
            {/* <img src={photo} style={{ width: 100, height: 80 }}alt="icons" /> */}
            <Col md={2} className="mb-3">
            <Button variant="primary" className="my-0"  as={Link} to={Routes.LicenceAthlete.path} onClick={() => setShowDefault(
              localStorage.setItem('at',aa),
              localStorage.setItem('ph',persons.arbitrator.photo),
              localStorage.setItem('iden',persons.arbitrator.identity_photo),
              // localStorage.setItem('mid',persons.athlete.medical_photo)
              
           )}>Licence</Button></Col>
              </Row>
            <Form >
              <Row>
              <Col md={6} className="mb-3">
                  <Form.Group id="emal">
                    <Form.Label>Role: <br/>Arbitre</Form.Label> 
                   
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group id="firstName">
                    <Form.Label>Nom : <br/> {persons.profile.first_name} </Form.Label>  
                   
                  </Form.Group>
                </Col>
               
              </Row>
  
              <Row className="align-items-center">
              <Col md={6} className="mb-3">
                  <Form.Group id="lastName">
                    <Form.Label>Prenom : <br/> {persons.profile.last_name }</Form.Label>
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group id="birthday"  name="birthday" >
                    <Form.Label>Date de naissance : <br/> {persons.profile.birthday}</Form.Label> 
                
                  </Form.Group>
                </Col>
                {/* <Col md={6} className="mb-3">
                  <Form.Group id="gender">
                    <Form.Label>Gendre</Form.Label>
                    <Form.Select id="gender"  name="gender" 
                                    autoComplete="off" >
                      <option value="0">Gender</option>
                      <option value="1">Femme</option>
                      <option value="2">Homme</option>
                    </Form.Select>
                  </Form.Group>
                </Col> */}
              </Row>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group id="emal">
                    <Form.Label>Email :<br/>{persons.profile.mail} </Form.Label> 
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group id="phone">
                    <Form.Label>Téléphone :  <br/>  {persons.profile.phone}</Form.Label>
                   
                  </Form.Group>
                </Col>
              </Row>
    
              <h5 className="my-4">Address</h5>
              <Row>
                <Col sm={8} className="mb-3">
                  <Form.Group id="address">
                    <Form.Label>Address :<br/>{persons.profile.address} </Form.Label> 
                 
                  </Form.Group>
                </Col>
               
              </Row>
              <Row>
                <Col sm={4} className="mb-3">
                  <Form.Group id="country">
                    <Form.Label>pays : <br/> {persons.profile.country} </Form.Label>
                   
                  </Form.Group>
                </Col>
                <Col sm={4} className="mb-3">
                  <Form.Group className="mb-2">
                    <Form.Label>Gouvernerat : <br/> {persons.profile.state}</Form.Label>
                   
                  </Form.Group>
                </Col>
                <Col sm={4}>
                  <Form.Group id="zip">
                    <Form.Label>Code Postal : <br/> {persons.profile.zip_code}</Form.Label>
                 
                  </Form.Group>
                </Col>
              </Row>
              
             
            
            </Form>
          </Card.Body>
        </Card></Col>
        <Col xs={12} xl={4}>
        <Row>
          <Col xs={12}>
        
  <Card border="light" className="text-center p-0 mb-4">
    <div style={{ backgroundImage: `url(${ProfileCover})` }} className="profile-cover rounded-top" />
    <Card.Body className="pb-5">
      <Card.Img src={persons.profile.profile_photo} alt="Neil Portrait" className="user-avatar large-avatar rounded-circle mx-auto mt-n7 mb-4" />
      <Card.Title>{persons.profile.last_name}    {persons.profile.first_name}</Card.Title>
      <Card.Subtitle className="fw-normal"></Card.Subtitle>
      <Card.Text className="text-gray mb-4">
 <img src={persons.arbitrator.photo} /><img src={persons.arbitrator.identity_photo} />
      </Card.Text>
     
    </Card.Body>
  </Card>

          </Col>
       
        </Row>
      </Col></Row>
    
    )
})
} else if(role=="3")
{
  axios.get(`suppoter_info/${aa}`, { headers: {'Content-Type': 'multipart/form-data','Authorization':`TOKEN ${token}`,
  'Access-Control-Allow-Origin':'Accept'} })
  .then(res => {
    const persons = res.data;
   
    console.log(persons)
    setSucc(
      <Row>
      <Col xs={12} xl={8}>
        <Card border="light" className="bg-white shadow-sm mb-4">
           
          <Card.Body>
          <Row>
            <Col md={10} className="mb-3">
            <h5 className="mb-4">Informations Generales </h5></Col>
            
            {/* <img src={photo} style={{ width: 100, height: 80 }}alt="icons" /> */}
            <Col md={2} className="mb-3">
            <Button variant="primary" className="my-0"  as={Link} to={Routes.LicenceAthlete.path} onClick={() => setShowDefault(
              localStorage.setItem('at',aa),
              // localStorage.setItem('ph',persons.athlete.photo),
              // localStorage.setItem('iden',persons.athlete.identity_photo),
              // localStorage.setItem('mid',persons.athlete.medical_photo)
              
           )}>Licence</Button></Col>
              </Row>
            <Form >
              <Row>
              <Col md={6} className="mb-3">
                  <Form.Group id="emal">
                    <Form.Label>Role: <br/>Supporteur </Form.Label> 
                   
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group id="firstName">
                    <Form.Label>Nom : <br/> {persons.profile.first_name} </Form.Label>  
                   
                  </Form.Group>
                </Col>
               
              </Row>
  
              <Row className="align-items-center">
              <Col md={6} className="mb-3">
                  <Form.Group id="lastName">
                    <Form.Label>Prenom : <br/> {persons.profile.last_name }</Form.Label>
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group id="birthday"  name="birthday" >
                    <Form.Label>Date de naissance : <br/> {persons.profile.birthday}</Form.Label> 
                
                  </Form.Group>
                </Col>
                {/* <Col md={6} className="mb-3">
                  <Form.Group id="gender">
                    <Form.Label>Gendre</Form.Label>
                    <Form.Select id="gender"  name="gender" 
                                    autoComplete="off" >
                      <option value="0">Gender</option>
                      <option value="1">Femme</option>
                      <option value="2">Homme</option>
                    </Form.Select>
                  </Form.Group>
                </Col> */}
              </Row>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group id="emal">
                    <Form.Label>Email :<br/>{persons.profile.mail} </Form.Label> 
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group id="phone">
                    <Form.Label>Téléphone :  <br/>  {persons.profile.phone}</Form.Label>
                   
                  </Form.Group>
                </Col>
              </Row>
    
              <h5 className="my-4">Address</h5>
              <Row>
                <Col sm={8} className="mb-3">
                  <Form.Group id="address">
                    <Form.Label>Address :<br/>{persons.profile.address} </Form.Label> 
                 
                  </Form.Group>
                </Col>
               
              </Row>
              <Row>
                <Col sm={4} className="mb-3">
                  <Form.Group id="country">
                    <Form.Label>pays : <br/> {persons.profile.country} </Form.Label>
                   
                  </Form.Group>
                </Col>
                <Col sm={4} className="mb-3">
                  <Form.Group className="mb-2">
                    <Form.Label>Gouvernerat : <br/> {persons.profile.state}</Form.Label>
                   
                  </Form.Group>
                </Col>
                <Col sm={4}>
                  <Form.Group id="zip">
                    <Form.Label>Code Postal : <br/> {persons.profile.zip_code}</Form.Label>
                 
                  </Form.Group>
                </Col>
              </Row>
              
             
            
            </Form>
          </Card.Body>
        </Card></Col>
        <Col xs={12} xl={4}>
        <Row>
          <Col xs={12}>
        
  <Card border="light" className="text-center p-0 mb-4">
    <div style={{ backgroundImage: `url(${ProfileCover})` }} className="profile-cover rounded-top" />
    <Card.Body className="pb-5">
      <Card.Img src={persons.profile.profile_photo} alt="Neil Portrait" className="user-avatar large-avatar rounded-circle mx-auto mt-n7 mb-4" />
      <Card.Title>{persons.profile.last_name}    {persons.profile.first_name}</Card.Title>
      <Card.Subtitle className="fw-normal"></Card.Subtitle>
      <Card.Text className="text-gray mb-4"></Card.Text>
     
    </Card.Body>
  </Card>

          </Col>
       
        </Row>
      </Col></Row>
    
    )
})
}
else if(role=="4")
{
  axios.get(`coach_info/${aa}`, { headers: {'Content-Type': 'multipart/form-data','Authorization':`TOKEN ${token}`,
  'Access-Control-Allow-Origin':'Accept'} })
  .then(res => {
    const persons = res.data;
   
    console.log(persons)
    setSucc(
      <Row>
      <Col xs={12} xl={8}>
        <Card border="light" className="bg-white shadow-sm mb-4">
           
          <Card.Body>
          <Row>
            <Col md={10} className="mb-3">
            <h5 className="mb-4">Informations Generales </h5></Col>
            
            {/* <img src={photo} style={{ width: 100, height: 80 }}alt="icons" /> */}
            <Col md={2} className="mb-3">
            <Button variant="primary" className="my-0"  as={Link} to={Routes.LicenceAthlete.path} 
            onClick={() => setShowDefault(
              localStorage.setItem('at',aa),
              localStorage.setItem('ph',persons.coach.photo),
              localStorage.setItem('iden',persons.coach.identity_photo),
              localStorage.setItem('mid',persons.coach.medical_photo)
              
           )
           }>Licence</Button>
           
           </Col>
              </Row>
            <Form >
              <Row>
              <Col md={6} className="mb-3">
                  <Form.Group id="emal">
                    <Form.Label>Role: <br/>Entraineur </Form.Label> 
                   
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group id="firstName">
                    <Form.Label>Nom : <br/> {persons.profile.first_name} </Form.Label>  
                   
                  </Form.Group>
                </Col>
               
              </Row>
  
              <Row className="align-items-center">
              <Col md={6} className="mb-3">
                  <Form.Group id="lastName">
                    <Form.Label>Prenom : <br/> {persons.profile.last_name }</Form.Label>
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group id="birthday"  name="birthday" >
                    <Form.Label>Date de naissance : <br/> {persons.profile.birthday}</Form.Label> 
                
                  </Form.Group>
                </Col>
                {/* <Col md={6} className="mb-3">
                  <Form.Group id="gender">
                    <Form.Label>Gendre</Form.Label>
                    <Form.Select id="gender"  name="gender" 
                                    autoComplete="off" >
                      <option value="0">Gender</option>
                      <option value="1">Femme</option>
                      <option value="2">Homme</option>
                    </Form.Select>
                  </Form.Group>
                </Col> */}
              </Row>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group id="emal">
                    <Form.Label>Email :<br/>{persons.profile.mail} </Form.Label> 
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group id="phone">
                    <Form.Label>Téléphone :  <br/>  {persons.profile.phone}</Form.Label>
                   
                  </Form.Group>
                </Col>
              </Row>
    
              <h5 className="my-4">Address</h5>
              <Row>
                <Col sm={8} className="mb-3">
                  <Form.Group id="address">
                    <Form.Label>Address :<br/>{persons.profile.address} </Form.Label> 
                 
                  </Form.Group>
                </Col>
               
              </Row>
              <Row>
                <Col sm={4} className="mb-3">
                  <Form.Group id="country">
                    <Form.Label>pays : <br/> {persons.profile.country} </Form.Label>
                   
                  </Form.Group>
                </Col>
                <Col sm={4} className="mb-3">
                  <Form.Group className="mb-2">
                    <Form.Label>Gouvernerat : <br/> {persons.profile.state}</Form.Label>
                   
                  </Form.Group>
                </Col>
                <Col sm={4}>
                  <Form.Group id="zip">
                    <Form.Label>Code Postal : <br/> {persons.profile.zip_code}</Form.Label>
                 
                  </Form.Group>
                </Col>
              </Row>
              
             
            
            </Form>
          </Card.Body>
        </Card></Col>
        <Col xs={12} xl={4}>
        <Row>
          <Col xs={12}>
        
  <Card border="light" className="text-center p-0 mb-4">
    <div style={{ backgroundImage: `url(${ProfileCover})` }} className="profile-cover rounded-top" />
    <Card.Body className="pb-5">
      <Card.Img src={persons.profile.profile_photo} alt="Neil Portrait" className="user-avatar large-avatar rounded-circle mx-auto mt-n7 mb-4" />
      <Card.Title>{persons.profile.last_name}    {persons.profile.first_name}</Card.Title>
      <Card.Subtitle className="fw-normal"></Card.Subtitle>
      <Card.Text className="text-gray mb-4">

    <img src={persons.coach.photo} /><img src={persons.coach.degree_photo} /><img src={persons.coach.grade_photo}/>

      </Card.Text>
     
    </Card.Body>
  </Card>

          </Col>
       
        </Row>
      </Col></Row>
    
    )
})
}


}, [Athlete]);


    return (
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
          <h5 className="mb-4">Choisir le profile de licence</h5>
       
          <Form >
                    
            <Row className="align-items-center">
      
            <Col sm={4} className="mb-3">
            
            <Form.Group id="athlete">
                    <Form.Label>Athlete existe  : </Form.Label>
                    <Form.Select id="athlete"  name="athlete" required value={Athlete}  onChange={(e) =>setAthlete(e.target.value)}
                                  autoComplete="off" >


                                                       {state.map((person) => (<>
                                                        {(() => {
        switch (role) {
          case "1": return <option>{person.arbitrator.id}</option>          ;
          case "2": return <option>{person.athlete.id}</option>;
          case "3": return <option>{person.supporter.id}</option>;
          case "4": return <option>{person.coach.id}</option>;
          case "5": return <option>{person.athlete.id}</option>;
          case "7": return <option>{person.athlete.id}</option>;
          default:        return "--";
        }
      })()} 
                                     </>   ))}
                                  
                                        
                                   
                  </Form.Select>
                  
                  </Form.Group>
            </Col>
            <Col sm={4} className="mb-3">
            
            <Form.Group id="category">
                    <Form.Label>nouvelle Athlete : </Form.Label><br/>
                    {(() => {
        switch (role) {
          case "1": return   <Button variant="primary" className="my-0"  as={Link} to={Routes.photosarb.path} onClick={() => setShowDefault()}>Ajouter nouvelle athlete</Button>;
          case "2": return  <Button variant="primary" className="my-0"  as={Link} to={Routes.updphotos.path} onClick={() => setShowDefault()}>Ajouter nouvelle athlete</Button>;
          case "3": return  <Button variant="primary" className="my-0"  as={Link} to={Routes.SuppAdd.path} onClick={() => setShowDefault()}>Ajouter nouvelle athlete</Button>;;
          case "4": return  <Button variant="primary" className="my-0"  as={Link} to={Routes.photosent.path} onClick={() => setShowDefault()}>Ajouter nouvelle athlete</Button>;
          case "7": return  <Button variant="primary" className="my-0"  as={Link} to={Routes.ClubAdd.path} onClick={() => setShowDefault()}>Ajouter nouvelle athlete</Button>;
          default : return "--";
        }
      })()} 
                  </Form.Group>
                  
            </Col>
          </Row>
          
          </Form>
          <Row className="align-items-center">
        <br></br>
      {succ}


 
          </Row>
          {/* <Row>
          <div className="mt-3">
              <Button variant="primary" type="submit">Choisir</Button>
            </div> <br/></Row> */}
        </Card.Body>
      </Card>
    );

};
export default (Licenceadd);
