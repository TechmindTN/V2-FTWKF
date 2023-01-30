
import React , {useEffect,useState} from "react";

import { Form, Col, Row, Card, Button} from '@themesberg/react-bootstrap';
import axios from "../examples/api/axios";
const PARAMETER_URL='parameters/';
const LIGUE_URL='ligue/';
import Select from 'react-select'
import 'react-dropzone-uploader/dist/styles.css'
const CompCons = () =>{
const [addresse, setAddresse] = useState();
const [zip_code, setZip] = useState();
const [ligue, setLigue] = useState();
const [Max_attendants, setMax_attendants] = useState();
const [categorie, setCategorie] = useState();
const [sport, setSport] = useState();
const [Max_participants, setMax_participants] = useState();
const [city, setCity] = useState();
const [name,setName]=useState();
const [duration,setDuration]=useState();
const [season,setSeason]=useState();
const [arb,setArb]=useState([]);
const [lic,setLic]=useState([]);
const [success, setSuccess] = useState (false) ;
const [state,setState]=useState([]);
const [states,setStates]=useState([]);
const [state5,setState5]=useState([]);
const [state7,setState7]=useState([]);
const [state8,setState8]=useState([]);
const [state9,setState9]=useState([]);

useEffect(() => {
  axios.get(PARAMETER_URL,``)
  .then(res => {
    const seasons = res.data.Seasons;
    const Categories = res.data.Categories;
    const Disciplines=res.data.Disciplines;
    setState(seasons);
    setState5(Categories);
    setState7(Disciplines);
    setState9(seasons);
  
})},[])
useEffect(() => {
  axios.get(LIGUE_URL,``)
  .then(res => {
    const ligue = res.data;
    setState8(ligue);
})},[])

const ARB_URL="arbitratorlist_info/"
const ATH_URL="athletelist_info/";
const comp=localStorage.getItem("comp");
const COMP_URL=`comp_info/${comp}/`;
const COMPs_URL=`competition/${comp}/`;
// set value for default selection
const [selectedValue, setSelectedValue] = useState([]);
const [selectedValue1, setSelectedValue1] = useState([]);
const [selectedValue2, setSelectedValue2] = useState([]);
const [selectedValue3, setSelectedValue3] = useState([]);

// handle onChange event of the dropdown
const handleChange = (e) => {
  setSelectedValue(Array.isArray(e) ? e.map(x => x.value) : []);

}
const handleChange1 = (e) => {
  setSelectedValue1(Array.isArray(e) ? e.map(x => x.value) : []);

}
const token = localStorage.getItem("token");

useEffect(() => {
  axios.get(ARB_URL, { headers: {'Content-Type': 'multipart/form-data','Authorization':`TOKEN ${token}`,
  'Access-Control-Allow-Origin':'Accept'} })
  .then(async res => {
    const data = res.data;
    console.log(data)
    const arb=data.map(arb => arb.arbitrator.id)
    const mapData = [...arb];
    console.log(mapData);
   
    let result=[

    ];
     mapData.forEach((element)=>{
      result.push({'value':element,'label':element});
 
    });
    // for(var i=0;i<mapData.length;i++){

    //   console.log(i+' '+mapData[i])
    //   result.push({'value':mapData[i],'label':mapData[i]});
    // }
    //console.log(result)
    setSelectedValue3(result)
    console.log(result)
  
  })

},[])
useEffect(() => {
  axios.get(ATH_URL, { headers: {'Content-Type': 'multipart/form-data','Authorization':`TOKEN ${token}`,
  'Access-Control-Allow-Origin':'Accept'} })
  .then(async res => {
    const data = res.data;
    const arb=data.map(arb => arb.athlete.id)
    const mapData = [...arb];
    //console.log(mapData);
   
    let result=[

    ];
     mapData.forEach((element)=>{
      result.push({'value':element,'label':element});
 
    });
    // for(var i=0;i<mapData.length;i++){

    //   console.log(i+' '+mapData[i])
    //   result.push({'value':mapData[i],'label':mapData[i]});
    // }
    //console.log(result)
    setSelectedValue2(result)
    //console.log(result)
  
  })

},[])
useEffect(() => {
  axios.get(COMP_URL,{
    headers: {'Content-Type': 'application/x-www-form-urlencoded','Authorization':` TOKEN ${window.localStorage.getItem("token")}`,  'Access-Control-Allow-Methods': 'Accept'},
    withCredentials: false
 })  .then(res => {
  const persons = res.data;
  console.log(persons)
  setAddresse(persons.address)
  setSport(persons.discipline)
  setCategorie(persons.age)
  setDuration(persons.duration)
  setName(persons.name)
  setStates(persons.location)
  setCity(persons.state)
  setZip(persons.zip_code)
  setMax_attendants(persons.max_attendents)
  setMax_participants(persons.max_participants)
  setArb(persons.arbitrators.arbitrator)
  setLic(persons.participants)
  setSeason(persons.season)
  setLigue(persons.ligue)

})
},[])

const handlesubmit = async (e) => {
  e.preventDefault();
try {
const token=localStorage.getItem("token")

    axios.put(
      COMPs_URL,
      ({        "arbitrators":selectedValue,"participants":selectedValue1 }),
       { headers: {'Content-Type': 'Application/json','Authorization':  `TOKEN ${token}`,
        'Access-Control-Allow-Origin':'Accept'} }) 
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
      <Row>
        <Form onSubmit={handlesubmit}>
        <Col xs={12} xl={12}>
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
          <h5 className="mb-4">Consulter Compétition </h5>
          <div className="text-center"><p>{success}</p></div>
          <Row>
            <Col sm={4} className="mb-3">
            <Form.Group id="arbitre">
            <Form.Label>Liste des arbitre</Form.Label>
            <Select
        className="dropdown"
        placeholder=""
        value={selectedValue3.filter(obj => selectedValue.includes(obj.value))} // set selected values
        options={selectedValue3} // set list of the data
        onChange={handleChange} // assign onChange function
        isMulti
        isClearable
        defaultValue={[selectedValue3[4], selectedValue3[5]]}
      /></Form.Group>
      </Col>
      <Col sm={4} className="mb-3">
            <Form.Group id="arbitre">
            <Form.Label>Liste des participants</Form.Label>
            <Select
        className="dropdown"
        placeholder=""
        value={selectedValue2.filter(obj => selectedValue1.includes(obj.value))} // set selected values
        options={selectedValue2} // set list of the data
        onChange={handleChange1} // assign onChange function
        isMulti
        isClearable
        defaultValue={[selectedValue2[4], selectedValue2[5]]}
      /></Form.Group>
      </Col>
      <Col sm={4} className="mb-3">

      <div className="mt-3">
              <Button variant="primary" type="submit">Ajouter liste au  Compétition </Button>
            </div><br/>
      </Col>
      
      </Row>



            <Row>
              
            <Col md={4} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Nom Compétition :<br/> {name}</Form.Label>
                
                </Form.Group>
              </Col>
             
              <Col md={4} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Descipline :<br/> {sport}</Form.Label>
                 
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group id="lastName">
                  <Form.Label>Lieu :<br/> {states}</Form.Label>
                  
                </Form.Group>
              </Col>
            </Row>
            <Row className="align-items-center">
            <Col md={4} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Durée :<br/> {duration}</Form.Label>
                
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group id="Age"  name="Age" >
                  <Form.Label>Age :<br/> {categorie}</Form.Label>
               
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group id="sex">
                  <Form.Label>Max_attendants :<br/> {Max_attendants}</Form.Label>
                 
                </Form.Group>
              </Col>
            
          
              </Row>
              <Row>
              <Col sm={4} className="mb-3">
            
            <Form.Group id="category">
                    <Form.Label>Maximum participants :<br/> {Max_participants}</Form.Label>
                  
            </Form.Group>
            </Col>
          <Col sm={4} className="mb-3">
          
          <Form.Group id="category">
                  <Form.Label>Ville :<br/> {city}</Form.Label>
                
                </Form.Group>
          </Col>
          <Col sm={4} className="mb-3">
          
          <Form.Group id="category">
                  <Form.Label>Ligue :<br/> {ligue} </Form.Label>
                 
                </Form.Group>
          </Col>
       
        </Row>
              <Row>
              <Col sm={4} className="mb-3">
            
            <Form.Group id="zip_code">
                    <Form.Label>Saison :<br/> {season} </Form.Label>
                
                  </Form.Group>
            </Col>
              <Col sm={4} className="mb-3">
          
          <Form.Group id="addresse">
                  <Form.Label>Addresse :<br/> {addresse}</Form.Label>
                
                </Form.Group>
          </Col>
          <Col sm={4} className="mb-3">
            
            <Form.Group id="zip_code">
                    <Form.Label>Zip_code :<br/> {zip_code}</Form.Label>
                  
                  </Form.Group>
            </Col>
            <Row>

         
              <Col  sm={12} className="mb-3">
              Liste des licences <br/>
              {lic.map((person) => (<>
              
              {person}<br/>
              
              </>))}
              </Col>
            </Row> <Row>

<Col  sm={12} className="mb-3">
  Liste des arbitres <br/>
  {/* {arb.map((person) => (<>
  
  {person}<br/>
  
  </>))} */}
{/* {arb} */}
  </Col>
 
</Row>
     
           
          </Row>
        <Row>
          </Row> 
       
        </Card.Body>
      </Card></Col>
        </Form>
  
     
        </Row>
         
          
          
    );

};
export default (CompCons);
