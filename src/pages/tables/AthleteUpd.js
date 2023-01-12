
import React , {useEffect,useState,useRef} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { Form, Col, Row, Card, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup, Modal,InputGroup } from '@themesberg/react-bootstrap';
import axios from "../examples/api/axios";
import Datetime from "react-datetime";
const PARAMETER_URL='parameters/'
const Athleteadd = () =>{
const[datas,setData]=useState('');
const [showDefault, setShowDefault] = useState(false);
const handleClose = () => setShowDefault(false);
const [first_name, setFname] = useState();
const [last_name, setLname] = useState();
const [birthday, setBirthday] = useState();
const [cin, setCin] = useState();
const [sexe, setSexe] = useState();
const [categorie, setCategorie] = useState();
const [ville, setVille] = useState();
const[weights,setWeights]=useState();
const[nationality,SetNationality]=useState('');
const[grade,setGrade]=useState('');
const[success, setSuccess] = useState (false) ;
const [state,setState]=useState([]);
const [state2,setState2]=useState([]);
const [state3,setState3]=useState([]);
const [state4,setState4]=useState([]);
const [state5,setState5]=useState([]);
const [state6,setState6]=useState([]);
const [state7,setState7]=useState([]);
const [Id,setId]=useState([]);
const [addresse,setAddresse]=useState([]);
const [Role,setRole]=useState([]);
const [phone,setPhone]=useState([]);
const [code,setCode]=useState([]);
const [im1,setIm1]=useState([]);
const [im2,setIm2]=useState([]);
const [im3,setIm3]=useState([]);
const [im4,setIm4]=useState([]);

const [gouv,setGouv]=useState([]);
const [selectedFile, setSelectedFile] = React.useState(null);


const [progress, setProgress] = useState()
const [progress2, setProgress2] = useState();
const [progress3, setProgress3] = useState()
const Image_url='upload_photo/'
const [selectedFile3, setSelectedFile3] = React.useState(null);
const [selectedFile2, setSelectedFile2] = React.useState(null);
function handleFileSelect(e) {
  console.log(e.target.files);
  setIm4(URL.createObjectURL(e.target.files[0]));
  setSelectedFile(e.target.files[0])
}
function handleFileSelect2(e) {
  console.log(e.target.files);
  setIm2(URL.createObjectURL(e.target.files[0]));
  setSelectedFile2(e.target.files[0])
}
function handleFileSelect3(e) {
  console.log(e.target.files);
  setIm3(URL.createObjectURL(e.target.files[0]));
  setSelectedFile3(e.target.files[0])
}
const submit3 = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem("token");
    const formData2 = new FormData();
  
    formData2.append("url",selectedFile3);
    formData2.append("path","image/athlete/medical");
    formData2.append("user",localStorage.getItem('id'));
    formData2.append("season",'2');
      axios.post(
        Image_url,
         formData2,
         { headers: {"Content-Type": "multipart/form-data" ,'Authorization':  `TOKEN ${token}`,
          'Access-Control-Allow-Origin':'Accept'}  ,onUploadProgress: data => {
            //Set the progress value to show the progress bar
            setProgress3(Math.round((100 * data.loaded) / data.total))
          },},
      ).then((value) => {
        const url= value.data.url;
        localStorage.setItem('mid',url) 
    
      },
      localStorage.getItem(mid),
      setIm3(`https://d494-197-14-10-36.ngrok.io${mid} `)
        )
  }catch(error) {
    console.log(error)
  }
}

const submit2 = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem("token");
    const formData2 = new FormData();
  
    formData2.append("url",selectedFile2);
    formData2.append("path","image/athlete/identity");
    formData2.append("user",localStorage.getItem('id'));
    formData2.append("season",'2');
      axios.post(
        Image_url,
         formData2,
         { headers: {"Content-Type": "multipart/form-data" ,'Authorization':  `TOKEN ${token}`,
          'Access-Control-Allow-Origin':'Accept'}  ,onUploadProgress: data => {
            //Set the progress value to show the progress bar
            setProgress2(Math.round((100 * data.loaded) / data.total))
          },},
      ).then((value) => {
        const url= value.data.url;
        localStorage.setItem('iden',url) 
      }
        ),
        localStorage.getItem(iden),
        setIm2(`https://d494-197-14-10-36.ngrok.io${iden} `)
  }catch(error) {
    console.log(error)
  }
}


const submit = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem("token");
    const formData2 = new FormData();
  
    formData2.append("url",selectedFile);
    formData2.append("path","image/profile/");
    formData2.append("user",localStorage.getItem('id'));
    formData2.append("season",'2');
      axios.post(
        Image_url,
         formData2,
         { headers: {"Content-Type": "multipart/form-data" ,'Authorization':  `TOKEN ${token}`,
          'Access-Control-Allow-Origin':'Accept'}  ,onUploadProgress: data => {
            //Set the progress value to show the progress bar
            setProgress(Math.round((100 * data.loaded) / data.total))
          },},
      ).then((value) => {
        const url= value.data.url;
        localStorage.setItem('pr',url) 
      },
      localStorage.getItem(pr),
      setIm1(`https://d494-197-14-10-36.ngrok.io${pr} `)
        )
  }catch(error) {
    console.log(error)
  }
}




useEffect(() => {
  axios.get(PARAMETER_URL,``)
  .then(res => {
    const seasons = res.data.Seasons;
    const Categories = res.data.Categories;
    const Clubs=res.data.Clubs;
    const Grades=res.data.Grades;
    const Weights=res.data.Weights;
    const Degrees=res.data.Degrees;
    const Disciplines=res.data.Disciplines;
    setState2(Degrees);
    setState3(Weights);
    setState4(Grades);
    setState(seasons);
    setState5(Categories);
    setState6(Clubs);
    setState7(Disciplines);
})},[])
const at=localStorage.getItem("at");
const ATHLETE_URL=`athlete_info/${at}/`
useEffect(() => {
  axios.get(ATHLETE_URL,{
    headers: {'Content-Type': 'application/x-www-form-urlencoded','Authorization':` TOKEN ${window.localStorage.getItem("token")}`,  'Access-Control-Allow-Methods': 'Accept'},
    withCredentials: false
 })
  .then(res => {
    const persons = res.data;
    console.log(persons)
    setGrade(persons.athlete.grade_id)
    setCategorie(persons.athlete.category_id)
    setWeights(persons.athlete.weights)
    SetNationality("Tunisienne")
     setIm1(persons.athlete.photo)
    setIm2(persons.athlete.identity_photo)
    setIm3(persons.athlete.medical_photo)
    setCin(persons.profile.cin)
    setFname(persons.profile.first_name)
    setLname(persons.profile.last_name)
    setBirthday(persons.profile.birthday)
    setRole(persons.profile.role)
    setAddresse(persons.profile.address)
    setVille(persons.profile.city)
  setPhone(persons.profile.phone)
  setCode(persons.profile.zip_code)
  setGouv(persons.profile.state)
  
})
},[])
const iden=localStorage.getItem('iden');
const pr=localStorage.getItem('pr');
const im=localStorage.getItem('im');
const mid=localStorage.getItem('mid');
const handlesubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("first_name", first_name);
  formData.append("last_name", last_name);
  formData.append("cin", cin);
  formData.append("birthday", birthday);
  formData.append("sex", sexe);
  formData.append("category_id", categorie);
  formData.append("weights", weights);
  formData.append("nationality", nationality);
  formData.append("grade_id", grade);
  formData.append("photo",im1);
  formData.append("identity_photo",im2);
  formData.append("medical_photo",im3);
try {
  const token = localStorage.getItem("token");
  const mid=localStorage.getItem('mid');
  const ATHLETES_URL=`edit_athlete_profile/${at}/`
    axios.put(
      ATHLETES_URL,
      ({'athlete':{'medical_photo':im3,'grade_id':grade,'sex':sexe,'weights':weights,'categorie_id':categorie,'identity_photo':im2,'photo':im1},'profile':{'first_name':first_name,'last_name':last_name,
      'country':'Tunisie','address':addresse,'phone':phone,'birthday':birthday,'cin':cin,'profile_photo':im1}
      }),
       { headers: {'Content-Type': 'Application/json','Authorization':  `TOKEN ${token}`,
        'Access-Control-Allow-Origin':'Accept'} },
    )
    setSuccess(<div className="alert alert-success d-flex align-items-center" role="alert">
    <div>Athlete modifié</div></div>);
   // window.location.href = "http://localhost:3000/#/tables/Athletes";
    localStorage.removeItem("at");
 
}catch(error) {
  console.log(error)
}

}


    return (
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
          <h5 className="mb-4">Modifier athlete </h5>
       
          
          <div className="text-center"><p>{success}</p></div>
          <Form onSubmit={handlesubmit}><Row>
              
            <Col md={3} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>CIN</Form.Label>
                  <Form.Control  type="text" id="cin" name="cin" 
                  value={cin }  onChange={(e) =>setCin(e.target.value)}
                 
                  />
                </Form.Group>
              </Col>
              <Col md={3} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control  type="text" id="first_name" name="first_name" placeholder="Nom" 
                     value={first_name }    onChange={(e) =>setFname(e.target.value)} 
                 
                  />
                </Form.Group>
              </Col>
              <Col md={3} className="mb-3">
                <Form.Group id="lastName">
                  <Form.Label>Prénom</Form.Label>
                  <Form.Control  type="text" id="last_name" name="last_name" placeholder="Prénom"
                           value={last_name}     onChange={(e) =>setLname(e.target.value)}
                         
                  />
                </Form.Group>
              </Col>
              <Col md={3} className="mb-3">
                <Form.Group id="lastName">
                  <Form.Label>Role</Form.Label>
                  <Form.Control  type="text" id="last_name" name="last_name" placeholder="Prénom"
                           value={Role}     onChange={(e) =>setRole(e.target.value)}
                         
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="align-items-center">
              <Col md={3} className="mb-3">
                <Form.Group id="birthday"  name="birthday" >
                  <Form.Label>Date de naissance</Form.Label>
                  <Datetime
                  timeFormat={false}
                  onChange={setBirthday}
                  renderInput={(props, openCalendar) => (
                    <InputGroup>
                      <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                      <Form.Control
                        
                        type="date" id="birthday"  name="birthday"
                        placeholder="mm/dd/yyyy" value={birthday? birthday : "--/--/----"}
                        autoComplete="off" onChange={(e) =>setBirthday(e.target.value)}
                        />
                    </InputGroup>
                  )} />
                </Form.Group>
              </Col>
              <Col md={3} className="mb-3">
                <Form.Group id="sex">
                  <Form.Label>Sexe</Form.Label>
                  <Form.Select id="sex"  name="sex"
                                  autoComplete="off" value={sexe}  onChange={(e) =>setSexe(e.target.value)}
                  >
                    <option value="0">sex</option>
                    <option value="1">Femme</option>
                    <option value="2">Homme</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            
              <Col sm={3} className="mb-3">
                <Form.Group id="weights">
                  <Form.Label>Addresse</Form.Label>
                  <Form.Control  type="text"  id="addresse"  name="addresse"
           autoComplete="off"  value={addresse}  onChange={(e) =>setAddresse(e.target.value)}
                    />
                </Form.Group>
              </Col>
              <Col sm={3} className="mb-3">
                <Form.Group id="weights">
                  <Form.Label>Poids</Form.Label>
                  <Form.Select id="weight"  name="weight"  value={weights}  onChange={(e) =>setWeights(e.target.value)}
                                  autoComplete="off" >
                                      <option></option>
                                    {state3.map((person) => (<>
                                  
                              <option value={person.id}> 
        {person.masse_en_killograme}</option>    </>   ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              </Row>
              <Row>
             
          
              <Col sm={3} className="mb-3">
            
            <Form.Group id="nationality">
                    <Form.Label>Nationalité</Form.Label>
                    <Form.Control  type="text" placeholder="Nationalité" id="Nationalité"  name="Nationalité"
           autoComplete="off"  value={nationality}  onChange={(e) =>SetNationality(e.target.value)}
                    />
                  </Form.Group>
            </Col>
            <Col sm={3} className="mb-3">
            
            <Form.Group id="grade">
                    <Form.Label>Grade</Form.Label>
                    <Form.Select id="grade"  name="grade"  value={grade}  onChange={(e) =>setGrade(e.target.value)}
                                  autoComplete="off" >
                                      <option></option>
                                    {state4.map((person) => (<>
                                  
                              <option value={person.id}> 
        {person.Grade}</option>    </>   ))}
                  </Form.Select>
                  </Form.Group>
            </Col>
            <Col sm={3} className="mb-3">
            
            <Form.Group id="category">
                    <Form.Label>Catégorie</Form.Label>
                    <Form.Select id="categorie"  name="categorie"  value={categorie}  onChange={(e) =>setCategorie(e.target.value)}
                                  autoComplete="off" >
                                      <option></option>
                                    {state5.map((person) => (<>
                                  
                              <option value={person.id}> 
        {person.categorie_age}</option>    </>   ))}
                  </Form.Select>
                  </Form.Group>
            </Col>
            <Col sm={3} className="mb-3">
            
            <Form.Group id="category">
                    <Form.Label>Ville</Form.Label>
                    <Form.Control  type="text" id="ville"  name="ville"
           autoComplete="off"  value={ville}  onChange={(e) =>setVille(e.target.value)}
                    />
                  </Form.Group>
            </Col>
          </Row>
          <Row>
          <Col sm={3} className="mb-3">
            
            <Form.Group id="category">
                    <Form.Label>Téléphone :</Form.Label>
                    <Form.Control  type="text" id="phone"  name="phone"
           autoComplete="off"  value={phone}  onChange={(e) =>setPhone(e.target.value)}
                    />
                  </Form.Group>
            </Col>
            <Col sm={3} className="mb-3">
            
            <Form.Group id="category">
                    <Form.Label>Gouvernerat :</Form.Label>
                    <Form.Control  type="text" id="gouv"  name="gouv"
           autoComplete="off"  value={gouv}  onChange={(e) =>setGouv(e.target.value)}
                    />
                  </Form.Group>
            </Col>
            <Col sm={3} className="mb-3">
            
            <Form.Group id="category">
                    <Form.Label>Code Postal :</Form.Label>
                    <Form.Control  type="text" id="code"  name="code"
           autoComplete="off"  value={code}  onChange={(e) =>setCode(e.target.value)}
                    />
                  </Form.Group>
            </Col>
          </Row>
          <div className="mt-3">
              <Button variant="primary" type="submit">Enregistrer</Button>
            </div><br/>
            </Form>
          <Row>
          <Col sm={4} className="mb-3">
            <Form onSubmit={submit}>
            <Form.Group id="category">
                    <Form.Label>Photo profile :</Form.Label><br/>
                   <img src={im1} width={80} height={80} /><br/>
                   <Form.Label>Noveau Photo profile :</Form.Label><br/>
                   <img src={im4} width={80} height={80} /><br/>
                   <input type="file" onChange={handleFileSelect}   />
            {progress && <ProgressBar   now={progress} label={`${progress}%`} style={{ height: 20}} />}
                  </Form.Group>
                  <div className="mt-3" >
              <Button variant="primary" type="submit">Enregistrer</Button>
            </div> <br/>
                  </Form>
            </Col>
            <Col sm={4} className="mb-3">
            <Form onSubmit={submit2}>
            <Form.Group id="category">
                    <Form.Label>Photo identité :</Form.Label><br/>
                    <img src={im2} width={80} height={80} /><br/>
                                       <input type="file" onChange={handleFileSelect2}   />
            {progress2 && <ProgressBar   now={progress2} label={`${progress2}%`} style={{ height: 20}} />}
                  </Form.Group>
                  <div className="mt-3" >
              <Button variant="primary" type="submit">Enregistrer</Button>
            </div> <br/></Form>
            </Col>
            <Col sm={4} className="mb-3">
            <Form onSubmit={submit3}>
            <Form.Group id="category">
                    <Form.Label>Photo fiche Médicale :</Form.Label><br/>
                    <img src={im3} width={80} height={80} /><br/>
                    <input type="file" onChange={handleFileSelect3}   />
            {progress3 && <ProgressBar   now={progress3} label={`${progress3}%`} style={{ height: 20}} />}
                  </Form.Group>
                  <div className="mt-3" >
              <Button variant="primary" type="submit">Enregistrer</Button>
            </div> <br/>
            </Form>
            </Col>
          </Row>
     
         
        </Card.Body>
      </Card>
    );

};
export default (Athleteadd);
