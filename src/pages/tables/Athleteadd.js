
import React , {useEffect,useState,useRef} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt} from "@fortawesome/free-solid-svg-icons";
import { Form, Col, Row, Card, Button, InputGroup } from '@themesberg/react-bootstrap';
import axios from "../examples/api/axios";
import Datetime from "react-datetime";
import Dropzone from "react-dropzone-uploader";
const PARAMETER_URL='parameters/';
const LIGUE_URL='ligue/';
import {ChoosePhotoWidget, ProfileCardWidget } from "../../components/Widgets";
import Profile3 from "../../assets/img/team/profile-picture-3.jpg";

const IMG_URL='/image/';
const ATHLETE_URL='add_athlete/';
import { getDroppedOrSelectedFiles } from 'html5-file-selector';

const Athleteadd = () =>{
  // Get production API keys from Upload.io
  const [selectedFile, setSelectedFile] = React.useState(null);
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0])

  }
  const handleSubmits = async(event) => {
    event.preventDefault()
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("url", selectedFile);
     formData.append("path", "profile/blabla/");
     formData.append("season", "2");
     formData.append("user",localStorage.getItem("id"));
    try {
      const response = await axios({
        method: "put",
        url: "image/54/",
        data: formData,
        headers: { 'Authorization':`TOKEN ${token}`,"Content-Type": "multipart/form-data" },
      });
      console.log("rrrr")
    } catch(error) {
      console.log(error)
    }
  }
const[datas,setData]=useState('');
const [showDefault, setShowDefault] = useState(false);
const handleClose = () => setShowDefault(false);

const[id,setId]=useState([])
const errRef = useRef();
const [file, setFile] = useState();

const [first_name, setFname] = useState();
const [last_name, setLname] = useState();
const [birthday, setBirthday] = useState();
const [cin, setCin] = useState();
const [sexe, setSexe] = useState();
const [categorie, setCategorie] = useState();
const [licences, setLicences] = useState();
const[weights,setWeights]=useState();
const[grade,setGrade]=useState('');
const[success, setSuccess] = useState (false) ;
const [state,setState]=useState([]);
const [state2,setState2]=useState([]);
const [state3,setState3]=useState([]);
const [state4,setState4]=useState([]);
const [state5,setState5]=useState([]);
const [state6,setState6]=useState([]);
const [state7,setState7]=useState([]);
const [state8,setState8]=useState([]);

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
useEffect(() => {
  axios.get(LIGUE_URL,``)
  .then(res => {
    const ligue = res.data;
   
    setState8(ligue);
})},[])
const handlesubmit = async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");
  const formData = new FormData();
  formData.append("first_name", first_name);
  formData.append("last_name", last_name);
  formData.append("cin", cin);
  formData.append("birthday", birthday);
  formData.append("sex", sexe);
  formData.append("category_id", categorie);
  formData.append("weights", weights);
  formData.append("grade_id", grade);
  formData.append("country", "Tunisie");
  formData.append("username",localStorage.getItem('username'))
try {
  const token = localStorage.getItem("token");

    axios.post(
      ATHLETE_URL,
       formData,
       { headers: {'Content-Type': 'multipart/form-data','Authorization':  `TOKEN ${token}`,
        'Access-Control-Allow-Origin':'Accept'} },
    )
   
    setSuccess(<div class="alert alert-success d-flex align-items-center" role="alert">
    <div>
     Athlete ajouté avec succès
    </div>
  </div>);
    // window.location.href = "/tables/Athletes/"
}catch(error) {
  console.log(error)
}


 
}
const fileParams = ({ meta }) => {
  return { url: file }
}
const onFileChange = ({ meta, file }, status) => { 
  const name = file.name;
  setFile(name) 
}
const onSubmit = (files, allFiles) => {
  const token = localStorage.getItem("token");
  const formData2 = new FormData();
  formData2.append("url", file);
  formData2.append("season", "2");
  formData2.append("user", localStorage.getItem("id"));
  formData2.append("path", "profile/blaba");
  allFiles.forEach(f => f.remove())
  axios.post(
    IMG_URL,
     formData2,
     { headers: {'Content-Type': 'multipart/form-data','Authorization':  `TOKEN ${token}`,
      'Access-Control-Allow-Origin':'Accept'} },
  )
}
const getFilesFromEvent = e => {
  return new Promise(resolve => {
      getDroppedOrSelectedFiles(e).then(chosenFiles => {
          resolve(chosenFiles.map(f => f.fileObject))
      })
  })
}
const selectFileInput = ({ accept, onFiles, files, getFilesFromEvent }) => {
  const textMsg = files.length > 0 ? 'Upload Again' : 'Select Files'
  return (
      <label className="btn btn-danger mt-4">
          {textMsg}
          <input
              style={{ display: 'none' }}
              type="file"
              accept={accept}
              multiple
              onChange={e => {
                  getFilesFromEvent(e).then(chosenFiles => {
                      onFiles(chosenFiles)
                  })
              }}
          />
      </label>
  )
}
    return (
      <Form onSubmit={handlesubmit}>
      <Row>
        <Col xs={12} xl={8}>
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
          <h5 className="mb-4">Ajouter athlete </h5>
          
          
         
            <div className="col-4">
            <Dropzone
            name="file"
            id="file"
            value={file}
            onSubmit={onSubmit}
            onChange={handleFileSelect}
            InputComponent={selectFileInput}
            getUploadParams={fileParams}
            getFilesFromEvent={getFilesFromEvent}
            accept="image/*"
            maxFiles={1}
            inputContent="Drop A File"
            styles={{
                dropzone: { width:100, height: 100 },
                dropzoneActive: { borderColor: 'green' },
            }}            
        />
            </div>
         <br></br>
         <button
              className="btn btn-success btn-sm"
              // disabled={!currentFile}
              // onClick={this.upload}
            >
              Upload
            </button><br/><br/><br/><br/>
        
            <div className="row">
         
        </div>

          <div className="text-center"><p>{success}</p></div>
            <Row>
            <Col md={4} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>CIN</Form.Label>
                  <Form.Control   type="text" id="cin" name="cin" 
                  value={cin }  onChange={(e) =>setCin(e.target.value)}
                 
                  />
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Nom</Form.Label>
                  <Form.Control   type="text" id="first_name" name="first_name" placeholder="Nom" 
                     value={first_name }    onChange={(e) =>setFname(e.target.value)} 
                 
                  />
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group id="lastName">
                  <Form.Label>Prénom</Form.Label>
                  <Form.Control   type="text" id="last_name" name="last_name" placeholder="Prénom"
                           value={last_name}     onChange={(e) =>setLname(e.target.value)}
                         
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="align-items-center">
              <Col md={4} className="mb-3">
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
              <Col md={4} className="mb-3">
                <Form.Group id="sex">
                  <Form.Label>Sexe</Form.Label>
                  <Form.Select id="sex"  name="sex"
                                  autoComplete="off" value={sexe}  onChange={(e) =>setSexe(e.target.value)}
                  >
                    <option value="0"></option>
                    <option value="1">Femme</option>
                    <option value="2">Homme</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col sm={4} className="mb-3">
            
            <Form.Group id="category">
                    <Form.Label>Téléphone</Form.Label>
                    <Form.Control   type="text" id="last_name" name="last_name"
                           value={last_name}     onChange={(e) =>setLname(e.target.value)}
                         
                  />
                  </Form.Group>
            </Col>
          
              </Row>
              <Row>
          
          <Col sm={4} className="mb-3">
          
          <Form.Group id="category">
                  <Form.Label>Gouvernerat</Form.Label>
                  <Form.Select id="categorie"  name="categorie"  value={categorie}  onChange={(e) =>setCategorie(e.target.value)}
                                autoComplete="off" >
                                    <option></option>
                                  {state5.map((person) => (<>
                                
                            <option value={person.id}> 
      {person.categorie_age}</option>    </>   ))}
                </Form.Select>
                </Form.Group>
          </Col>
          <Col sm={4} className="mb-3">
          
          <Form.Group id="category">
                  <Form.Label>Addresse</Form.Label>
                  <Form.Control   type="text" id="last_name" name="last_name" 
                           value={last_name}     onChange={(e) =>setLname(e.target.value)}
                         
                  />
                </Form.Group>
          </Col>
        </Row>
              <Row>
          <Col sm={4} className="mb-3">
            
            <Form.Group id="category">
                    <Form.Label>Zip-code</Form.Label>
                   <Form.Control   type="text" id="last_name" name="last_name" 
                           value={last_name}     onChange={(e) =>setLname(e.target.value)}
                         
                  />
                  </Form.Group>
            </Col>
       
            <Col sm={4} className="mb-3">
            
            <Form.Group id="category">
                    <Form.Label>Ligue</Form.Label>
                    <Form.Select id="categorie"  name="categorie"  value={categorie}  onChange={(e) =>setCategorie(e.target.value)}
                                  autoComplete="off" >
                                      <option></option>
                                    {state8.map((person) => (<>
                                  
                              <option value={person.id}> 
        {person.name}</option>    </>   ))}
                  </Form.Select>
                  </Form.Group>
            </Col>
            <Col sm={4} className="mb-3">
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
          
            <Col sm={4} className="mb-3">
            
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
            <Col sm={4} className="mb-3">
            
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
            <Col sm={4} className="mb-3">
            
            <Form.Group id="category">
                    <Form.Label>Degré</Form.Label>
                    <Form.Select id="categorie"  name="categorie"  value={categorie}  onChange={(e) =>setCategorie(e.target.value)}
                                  autoComplete="off" >
                                    {state2.map((person) => (<>
                                  
                              <option value={person.id}> 
        {person.Degree}</option>    </>   ))}
                  </Form.Select>
                  </Form.Group>
            </Col>

          
          </Row>
        
          
          
        </Card.Body>
      </Card></Col>
      
      <Col xs={12} xl={4}>
      <Row>
            <Col xs={12}>
              <ProfileCardWidget />
            </Col>
            <Col xs={12}>
              <ChoosePhotoWidget
                title="Select profile photo"
                photo={Profile3}
              />
            </Col>
          </Row>
        </Col></Row><div className="mt-3">
              <Button variant="primary" type="submit">Enregistrer</Button>
            </div>
          </Form>
    );

};
export default (Athleteadd);
