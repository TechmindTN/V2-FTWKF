
import React , {useEffect,useState,useRef} from "react";
import { Form, Col, Row, Card, Button} from '@themesberg/react-bootstrap';
import axios from "../examples/api/axios";
const Licence_URL='add_licence/'
const PARAMETER_URL='parameters/'
const Licenceadd = () =>{
  const [state,setState]=useState([]);
  const [state2,setState2]=useState([]);
  const [state3,setState3]=useState([]);
  const [state4,setState4]=useState([]);
  const [state5,setState5]=useState([]);
  const [state6,setState6]=useState([]);
  const [state7,setState7]=useState([]);
  const [state8,setState8]=useState([]);
  const [degree, setDegree] = useState();
  const [weights,setWeights]=useState();
  const [grade,setGrade]=useState();
  const [success, setSuccess] = useState (false) ;
  const [categorie, setCategorie] = useState();
  const [season, setSeason] = useState();
  const [club, setClub] = useState();
  const [Disciplines, setDiscipline] = useState();

  useEffect(() => {
    axios.get(PARAMETER_URL,``)
    .then(res => {
      const seasons = res.data.Seasons;
      const Categories = res.data.Categories;
      const Clubs=res.data.Clubs;
      const Grades=res.data.Grades;
      const Weights=res.data.Weights;
      const Degrees=res.data.Degrees;
      const Discipline=res.data.Disciplines;
      const Roles=res.data.Roles;
      setState2(Degrees);
      setState3(Weights);
      setState4(Grades);
      setState(seasons);
      setState5(Categories);
      setState6(Clubs);
      setState7(Discipline);
      setState8(Roles);

  })},[])

const [showDefault, setShowDefault] = useState(false);
const handleClose = () => setShowDefault(false);
const handlesubmit = async (e) => {
  e.preventDefault();

const user = localStorage.getItem("id");
const formData = new FormData();
  formData.append("categorie", Number(categorie));
  formData.append("weight", Number( weights));
  //formData.append("discipline", discipline);
  formData.append("club", club);  
  formData.append("grade", Number(grade));
  formData.append("degree", Number(degree));
  formData.append("seasons",  Number(season));
  formData.append("user", localStorage.getItem("id"));
  formData.append("role", localStorage.getItem("rol"));
     const token = localStorage.getItem("token");
     const iden=localStorage.getItem('iden');
     const pr=localStorage.getItem('pr');
     const ph=localStorage.getItem('ph');
     const mid=localStorage.getItem('mid');
     const rolee=localStorage.getItem('rolee');
     const at=localStorage.getItem("at");
     const licc=localStorage.getItem('licc');
    try{ axios.post(

    //   "licence":{"num_licences":"AT-0000000002",
    // "activated": false, "user": 124, "role": 1, "seasons": 2,"club":2,"discipline":1},
    // "photos":{
    // "photo": "aaaaaa",
    // "identity_photo": "bbbbbb",
    // "medical_photo": "cccccc"
    // }


      Licence_URL
      ,{"licence":{"categorie":parseInt(categorie),"weight":parseInt(weights),"club":localStorage.getItem("club"),"grade":parseInt(grade),"degree":parseInt(degree),"seasons":parseInt(season),"user":parseInt(user),"role":parseInt(rolee),
      "discipline":parseInt(Disciplines),"discipline_id":1},"photos":{
         "photo": "aaaaaa",
         "identity_photo": "bbbbbb",
         "medical_photo": "cccccc"
         }
   }
   ,
   { headers: {'Content-Type': 'Application/json','Authorization':  `TOKEN ${token}`,
   'Access-Control-Allow-Origin':'Accept'} },
      ).then(res=>
      
        localStorage.setItem("licc",res.data.licence.num_licences),
        )
      }catch(error) 
      {
       console.log(error)
      }
      if(rolee=="2"){

      const timer = setTimeout(() => {
      

          axios.put(
            `edit_athlete_profile/${at}/`,
            ({'athlete':{},'profile':{'licences':localStorage.getItem('licc')}
            }),
             { headers: {'Content-Type': 'Application/json','Authorization':  `TOKEN ${token}`,
              'Access-Control-Allow-Origin':'Accept'} },
          )
          setSuccess(<div className="alert alert-success d-flex align-items-center" role="alert">
          <div>Licence Ajouté</div></div>);
            
         
              history.push('/tables/Athletes')
            
         
            return () => clearTimeout(timer);
         // window.location.href = "http://localhost:3000/#/tables/Athletes";
          //localStorage.removeItem("at");
       
      

     }, 3000);
     return () => clearTimeout(timer);
    } else if(rolee=="1"){

      const timer = setTimeout(() => {
    
  
            axios.put(
              `edit_arbitrator_profile/${at}/`,
              ({'arbitrator':{},'profile':{'licences':localStorage.getItem('licc')}
              }),
               { headers: {'Content-Type': 'Application/json','Authorization':  `TOKEN ${token}`,
                'Access-Control-Allow-Origin':'Accept'} },
            )
            setSuccess(<div className="alert alert-success d-flex align-items-center" role="alert">
            <div>Licence Ajouté</div></div>);
              const timer = setTimeout(() => {
                
          
                history.push('/tables/Athletes')
              
              }, 1000);
              return () => clearTimeout(timer);
           // window.location.href = "http://localhost:3000/#/tables/Athletes";
            //localStorage.removeItem("at");
       
  
       }, 1000);
       return () => clearTimeout(timer);
    }
    else if(rolee=="4"){

      const timer = setTimeout(() => {
    
  
            axios.put(
              `edit_coach_profile/${at}/`,
              ({'coach':{},'profile':{'licences':localStorage.getItem('licc')}
              }),
               { headers: {'Content-Type': 'Application/json','Authorization':  `TOKEN ${token}`,
                'Access-Control-Allow-Origin':'Accept'} },
            )
            setSuccess(<div className="alert alert-success d-flex align-items-center" role="alert">
            <div>Licence Ajouté</div></div>);
              const timer = setTimeout(() => {
                
               
                history.push('/tables/Athletes')
              
              }, 1000);
              return () => clearTimeout(timer);
           // window.location.href = "http://localhost:3000/#/tables/Athletes";
            //localStorage.removeItem("at");
         
       
       },1000);
       return () => clearTimeout(timer);
    }
      // window.location.href = "dashboard/tables/Licence";
    
    
    // try {
    //   const at=localStorage.getItem("at");

    //   const token = localStorage.getItem("token");
    //   const licc=localStorage.getItem('licc');
    //   const ATHLETES_URL=`edit_athlete_profile/${at}/`
    //     axios.put(
    //       ATHLETES_URL,
    //       ({'athlete':{},'profile':{'licences':licc}
    //       }),
    //        { headers: {'Content-Type': 'Application/json','Authorization':  `TOKEN ${token}`,
    //         'Access-Control-Allow-Origin':'Accept'} },
    //     )
    //     setSuccess(<div className="alert alert-success d-flex align-items-center" role="alert">
    //     <div>Athlete modifié</div></div>);
    //       const timer = setTimeout(() => {
    //         // console.log('This will run after 1 second!')
    //         //history.push('/tables/Athletes')
          
    //       }, 2000);
    //       return () => clearTimeout(timer);
    //    // window.location.href = "http://localhost:3000/#/tables/Athletes";
    //     //localStorage.removeItem("at");
     
    // }catch(error) {
    //   console.log(error)
    // }
}
    return (
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
          <h5 className="mb-4">Demande Licence </h5>
         
          {/* {state.map((person) => (
        <>
        
        
        </>))} */}
          <Form onSubmit={handlesubmit}>
          <div className="text-center"><p>{success}</p></div>
                    <Row>
            
            <Col md={4} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Saison موسم</Form.Label>    
                  <Form.Select id="season" required name="season"  value={season}  onChange={(e) =>setSeason(e.target.value)}
                                  autoComplete="off" >                                    <option></option>

                                    {state.map((person) => (<>
                              <option value={person.id}> 
        {person.Seasons}</option>    </>   ))}
                  </Form.Select>
                 
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Dégre درجة</Form.Label>
                  <Form.Select id="Degree" required  name="degree"  value={degree}  onChange={(e) =>setDegree(e.target.value)}
                                  autoComplete="off" >                                    <option></option>

                                    {state2.map((person) => (<>
                              <option value={person.id}> 
        {person.Degree}</option>    </>   ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group id="lastName">
                  <Form.Label>grade رتبة</Form.Label>
                  <Form.Select id="grade" required name="grade"  value={grade}  onChange={(e) =>setGrade(e.target.value)}
                                  autoComplete="off" >
                                      <option></option>
                                    {state4.map((person) => (<>
                                  
                              <option value={person.id}> 
        {person.Grade}</option>    </>   ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row className="align-items-center">
          
            
              <Col sm={4} className="mb-3">
                <Form.Group id="weights">
                  <Form.Label>poid وزن</Form.Label>
                  <Form.Select id="weight" required name="weight"  value={weights}  onChange={(e) =>setWeights(e.target.value)}
                                  autoComplete="off" >                                    <option></option>

                                    {state3.map((person) => (<>
                                  
                              <option value={person.id}> 
        {person.masse_en_killograme}</option>    </>   ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            
             
          
           
            
            <Col sm={4} className="mb-3">
            
            <Form.Group id="category">
                    <Form.Label>categorie age العمر</Form.Label>
                    <Form.Select id="categorie" required name="categorie"  value={categorie}  onChange={(e) =>setCategorie(e.target.value)}
                                  autoComplete="off" >                                    <option></option>

                                    {state5.map((person) => (<>
                                  
                              <option value={person.id}> 
        {person.categorie_age}</option>    </>   ))}
                  </Form.Select>
                  </Form.Group>
            </Col>
            <Col sm={4} className="mb-3">
            
            <Form.Group id="category">
                    <Form.Label>Club النادي</Form.Label>
                    <Form.Select id="club"   name="club"  value={club}  onChange={(e) =>setClub(e.target.value)}
                                  autoComplete="off" >                                    <option></option>

                                    {state6.map((person) => (<>
                                  
                              <option value={person.id}> 
        {person.name}</option>    </>   ))}
                  </Form.Select>
                  </Form.Group>
       
            </Col>
            <Col sm={4} className="mb-3">
            
            <Form.Group id="Disciplines">
                    <Form.Label>Descipline الرياضة</Form.Label>
                    <Form.Select id="Disciplines" required name="Disciplines"  value={Disciplines}  onChange={(e) =>setDiscipline(e.target.value)}
                                  autoComplete="off" >                                    <option></option>

                                    {state7.map((person) => (<>
                                  
                              <option value={person.id}> 
        {person.name}</option>    </>   ))}
                  </Form.Select>
                   
                  </Form.Group>
            </Col>
            {/* <Col sm={4} className="mb-3">
            
            <Form.Group id="category">
                    <Form.Label>Profile</Form.Label>
                    <Form.Select id="role"  name="role" required value={role}  onChange={(e) =>setRole(e.target.value)}
                                  autoComplete="off" >                                    <option></option>

                                    {state8.map((person) => (<>
                                  
                              <option value={person.id}> 
        {person.roles}</option>    </>   ))}
                  </Form.Select>
                  </Form.Group>
            </Col> */}
          </Row>
          <div className="mt-3">
              <Button variant="primary" type="submit">Ajouter</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    );

};
export default (Licenceadd);
