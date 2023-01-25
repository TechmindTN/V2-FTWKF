
import React, { useState, useEffect, useRef } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt,faPaperclip } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Button, InputGroup ,ProgressBar} from '@themesberg/react-bootstrap';
import axios from "../pages/examples/api/axios";
import {useHistory  } from "react-router-dom";
const PROFILE_URL ='profile/';
export const GeneralInfoForm = () => {

  const [file, setFile] = useState()

 
  const [fname, setFname] = useState();
  const [valideFname , setValidFname] = useState('');
  const [lname, setLname] = useState('');
  const [valideLname , setValidLname] = useState('');
  const [birthday, setBirthday] = useState("");
  const [valideBirthday , setValidBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [valideGender , setValidGender] = useState('');
  const [phone, setPhone] = useState('');
  const [validePhone , setValidPhone] = useState('');
  const [address, setAddress] = useState('');
  const [valideAddress , setValidAddress] = useState('');

  const [email, setEmail] = useState('');
  const [valideEmail , setValidEmail] = useState('');
   
  const [city, setCity] = useState('');
  const [valideVille , setValidVille] = useState('');
  const [club, setClub] = useState('');
  const [valideClub , setValidClub] = useState('');
 
  const [sport, setSport] = useState('');
  const [valideSport , setValidSport] = useState('');

  const [ligue, setLigue] = useState('');
  const [valideLigue , setValidLigue] = useState('');

  
  const [age, setAge] = useState('');
  const [valideAge , setValidAge] = useState('');

  // const [identite, setIdentite] = useState('');
  // const [valideIdentite , setValididentite] = useState('');
 
  // const [medical, setMedical] = useState('');
  // const [valideMedical , setValidmedical] = useState('');

  const [country, setCountry] = useState('');
  const [valideCountry , setValidcountry] = useState('');

  const [cin, setCin] = useState('');
  const [valideCin , setValidCin] = useState('');

  const[errMsg, setErrMsg] = useState ('') ;
  const userRef = useRef();
  const errRef = useRef();

  const [id, setId] = useState('');
  const [selectedFile, setSelectedFile] = React.useState(null);

  useEffect(() => {
    setId(window.localStorage.getItem("id"));
  }, []);
  useEffect(() => {
    setErrMsg('');
  },[city,country,phone])
  
  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0])

  }
  const handlesubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("rol");
    const formData = new FormData();
    formData.append("profile_photo", selectedFile);
    formData.append("city", city);
    formData.append("phone", phone);
    formData.append("user", id);
    formData.append("role", role);
    formData.append("first_name", fname);
    formData.append("last_name", lname);
    formData.append("cin", cin);
    const headers = { 
      'Authorization':  `TOKEN ${token}`,
      'Content-Type':'multipart/form-data',
      'Access-Control-Allow-Origin':'Accept'
  };
  try {
    const token = localStorage.getItem("token");

      axios.post(
        PROFILE_URL,
         formData,
         { headers: {'Content-Type': 'multipart/form-data','Authorization':  `TOKEN ${token}`,
          'Access-Control-Allow-Origin':'Accept'} },
      )
}catch(error) {
    console.log(error)
  }


   
  }
  // const userNames = ['Jesse', 'Tom', 'Anna']
  // const renderListOfUserNames = (names) => {
  //   return names.map(name => <li>{name}</li>)
  // }



  
  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Informations Generales </h5>
     
        <Form onSubmit={handlesubmit}>
          <Row>
          <Col md={4} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>CIN</Form.Label>
                <Form.Control  type="text" id="cin" name="cin"
                 onChange={(e) =>setCin(e.target.value)} value={cin}
               
                />
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>Nom</Form.Label>
                <Form.Control  type="text" id="fname" name="fname"
                 onChange={(e) =>setFname(e.target.value)} value={fname}
               
                />
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Group id="lastName">
                <Form.Label>Prenom</Form.Label>
                <Form.Control  type="text" id="lname" name="lname" 
                            value={lname}    autoComplete="off" onChange={(e) =>setLname(e.target.value)}
                       
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={6} className="mb-3">
              <Form.Group id="birthday"  name="birthday" >
                <Form.Label>Date de naissance</Form.Label>
                <Datetime
                  timeFormat={false}
                  onChange={setBirthday}
                  renderInput={(props, openCalendar) => (
                    <InputGroup>
                      <InputGroup.Text><FontAwesomeIcon icon={faCalendarAlt} /></InputGroup.Text>
                      <Form.Control
                        
                        type="text" id="birthday"  name="birthday"
                        value={birthday ? moment(birthday).format("MM/DD/YYYY") : ""}
                        placeholder="mm/dd/yyyy"
                        autoComplete="off" onChange={(e) =>setBirthday(e.target.value)}
                        />
                    </InputGroup>
                  )} />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="gender">
                <Form.Label>Gendre</Form.Label>
                <Form.Select id="gender"  name="gender"
                                autoComplete="off" onChange={(e) =>setGender(e.target.value)}
                                value={gender}
                >
                  <option value="0">Gender</option>
                  <option value="1">Femme</option>
                  <option value="2">Homme</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="emal">
                <Form.Label>Email</Form.Label>
                <Form.Control  type="email" id="email"  
                                autoComplete="off" onChange={(e) =>setEmail(e.target.value)}
                                value={email}
                name="email" placeholder="name@company.com" />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="phone">
                <Form.Label>Téléphone</Form.Label>
                <Form.Control  type="number" 
                                                autoComplete="off" onChange={(e) =>setPhone(e.target.value)}
                                                value={phone}
                id="phone"  name="phone"/>
              </Form.Group>
            </Col>
          </Row>

          <h5 className="my-4">Address</h5>
          <Row>
            <Col sm={9} className="mb-3">
              <Form.Group id="address">
                <Form.Label>Address</Form.Label>
                <Form.Control  type="text" id="address"  name="address" 
                                                autoComplete="off" onChange={(e) =>setAddress(e.target.value)}
                                                value={address}
                 />
              </Form.Group>
            </Col>
            <Col sm={3} className="mb-3">
              <Form.Group id="addressNumber">
                <Form.Label>Numero</Form.Label>
                <Form.Control  type="number" id=""  name=""/>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={4} className="mb-3">
              <Form.Group id="country">
                <Form.Label>country</Form.Label>
                <Form.Control  type="text"  id="country"  name="country"
                
                autoComplete="off" onChange={(e) =>setCountry(e.target.value)}
                                                value={country}
                />
              </Form.Group>
            </Col>
            <Col sm={4} className="mb-3">
              <Form.Group className="mb-2">
                <Form.Label>Gouvernerat</Form.Label>
                <Form.Select id="city"   name="cityt"
                
                autoComplete="off" onChange={(e) =>setCity(e.target.value)}
                                                value={city}
                
                >
                  <option value="0">State</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">District Of Columbia</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col sm={4}>
              <Form.Group id="zip">
                <Form.Label>Code Postal</Form.Label>
                <Form.Control  type="tel" />
              </Form.Group>
            </Col>
          </Row>
          <h5 className="my-4">Infromations Complementaires</h5>
          <Row>
            <Col sm={4} className="mb-3">
              <Form.Group id="addrclubess">
                <Form.Label>Club</Form.Label>
                <Form.Select name="club" id="club"    
                  value={club} autoComplete="off"
                  onChange={(e) =>setClub(e.target.value)}>
      <option value="0" >Choisir votre club </option>
      <option value="1">Athlete</option>
      <option value="2">Entraineur</option>
      <option value="3">Président de club</option>
      <option value="4">Arbitre</option>
    </Form.Select>
               
              </Form.Group>
            </Col>
            <Col sm={4} className="mb-3">
              <Form.Group id="addressNumber">
                <Form.Label>Descipline</Form.Label>
                <Form.Control  type="number" placeholder="No." id="sport"  name="sport"
                                  value={sport} autoComplete="off"
                                  onChange={(e) =>setSport(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col sm={4} className="mb-3">
              <Form.Group id="addressNumber">
                <Form.Label>Ligue</Form.Label>
                <Form.Control  type="number" placeholder="No." id="ligue"  name="ligue"
                                                  value={ligue} autoComplete="off"
                                                  onChange={(e) =>setLigue(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={4} className="mb-3">
              <Form.Group id="city">
                <Form.Label>Age</Form.Label>
                <Form.Control  type="text" placeholder="City" id="age"  name="age"
                
                value={age} autoComplete="off"
                onChange={(e) =>setAge(e.target.value)}
                />
              </Form.Group>
            </Col>
        
            {/* <Col sm={4}>
              <Form.Group id="identite">
                <Form.Label>Photo d'identite</Form.Label>
                <div className="file-field">
            <div className="d-flex justify-content-xl ">
              <div className="d-flex">
                <span className="icon icon-md">
                  <FontAwesomeIcon icon={faPaperclip} className="me-3" />
                </span>
                <input type="file" id="identite"  name="identite"     
                value={identite} autoComplete="off"
                onChange={(e) =>setIdentite(e.target.value)}/>
                <div className="d-md-block text-start">{identite}
                  <div className="fw-normal text-dark mb-1">Choisir Image</div>
                  <div className="text-gray small">JPG, GIF, PDF ou PNG</div>
                </div>
              </div>
            </div>
          </div>
              </Form.Group>
            </Col> */}
            {/* <Col sm={4}>
              <Form.Group id="medical">
                <Form.Label>Certificat Médicale</Form.Label>
                
          <input type="file" onChange={handleChange}/>
          <button type="submit">Upload</button>
              </Form.Group>
            </Col> */}
        
        <Col sm={4} className="mb-3">
          
     

        <div className="d-xl-flex align-items-center">
        
          <div className="file-field">
            <div className="d-flex ">
              <div className="d-flex">
                <span className="icon icon-md">
                  <FontAwesomeIcon icon={faPaperclip} className="me-3" />
                </span>
                <input type="file" onChange={handleFileSelect}/>
                <div className="d-md-block text-start">
                  <div className="fw-normal text-dark mb-6">Choisir Image</div>
                </div>
              </div>
            </div>
          </div>
         </div>
        </Col>
        </Row>
        <div className="mt-3">
            <Button variant="primary" type="submit">Enregistrer</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};
export const EditeProfile = () => {
  const Image_url='upload_photo/'
  const history = useHistory()

  const [selectedFile, setSelectedFile] = React.useState(null);

  const [progress, setProgress] = useState()
  
  const [file, setFile] = useState();
  
  function handleFileSelect(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
    setSelectedFile(e.target.files[0])
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
        }
          )
    }catch(error) {
      console.log(error)
    }
  }
  const [fname, setFname] = useState();
  const [lname, setLname] = useState('');
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');   
  const [city, setCity] = useState('');
  const [valideVille , setValidVille] = useState('');
  const [club, setClub] = useState('');
  const [valideClub , setValidClub] = useState('');
 
  const [sport, setSport] = useState('');
  const [valideSport , setValidSport] = useState('');

  const [ligue, setLigue] = useState('');
  const [valideLigue , setValidLigue] = useState('');

  
  const [age, setAge] = useState('');
  const [valideAge , setValidAge] = useState('');

  const [identite, setIdentite] = useState('');
  const [valideIdentite , setValididentite] = useState('');
 
  const [medical, setMedical] = useState('');
  const [valideMedical , setValidmedical] = useState('');

  const [country, setCountry] = useState('');
  const [valideCountry , setValidcountry] = useState('');
  const [zip_code, setZipCode] = useState('');
  const [valideZip , setValidzip] = useState('');
  const [cin, setCin] = useState('');
  const [valideCin , setValidcin] = useState('');
  const [errMsg, setErrMsg] = useState ('') ;

  const [state, setState] = useState();
  const [role, setRole] = useState();
  const[success, setSuccess] = useState (false) ;

  const [id, setId] = useState('');
  const PRO_URL=`pro/${window.localStorage.getItem("id")}/`;
  useEffect(() => {
    axios.get(PRO_URL,{
      headers: {'Content-Type': 'application/x-www-form-urlencoded','Authorization':` TOKEN ${window.localStorage.getItem("token")}`,  'Access-Control-Allow-Methods': 'Accept'},
      withCredentials: false
   })
    .then(res => {
      const persons = res.data;
      setState(persons);
      console.log(state);
      const id=persons.id
      console.log(id)
      localStorage.setItem('idP',id)
      console.log(persons.profile_photo)
      setCountry("Tunisie")
      setFname(persons.first_name)
      setLname(persons.last_name)
      setPhone(persons.phone)
      setBirthday(persons.birthday)
      setRole(persons.role)
      localStorage.setItem('rol',persons.role)
      setZipCode(persons.zip_code)
      setCin(persons.cin)
  
  })},[])
  useEffect(() => {
    setId(window.localStorage.getItem("id"));
  
  }, []);
  useEffect(() => {
    setErrMsg('');
  },[city,country,phone])
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const pr=localStorage.getItem('pr');
  
    try {
      const token = localStorage.getItem("token");
      const id=localStorage.getItem("idP");
      const response = axios.put(`profile/${window.localStorage.getItem("idP")}/`,({'profile_photo':`https://3462-197-14-10-36.eu.ngrok.io${pr} `,'address':address,'birthday':birthday,'first_name':fname,'last_name':lname,
      'phone':phone,'zip_code':zip_code,'city':city
    }), {
         headers: {'Authorization':`TOKEN ${token}`,  'content-type': 'Application/json',
         'X-CSRFTOKEN': 'CSRF_TOKEN','Access-Control-Allow-Origin':'Accept'},
         withCredentials: false
      });
      setSuccess(<div className="alert alert-success d-flex align-items-center" role="alert">
    <div>Profile modifié</div></div>);
      const timer = setTimeout(() => {
        // console.log('This will run after 1 second!')
        history.push('/profile')
      }, 2000);
      return () => clearTimeout(timer);
    //  window.location.href = "http://localhost:3000/#/profile";
    } catch (error) {
      console.log(error);
    }
  };

   const handleSubmits = async(event) => {
     event.preventDefault()
     const token = localStorage.getItem("token");

     const formData = new FormData();
     formData.append("profile_photo", "image/".selectedFile);
   
     try {
       const response = await axios({
         method: "put",
         url: "profile/54/",
         data: formData,
         headers: { 'Authorization':`TOKEN ${token}`,"Content-Type": "multipart/form-data" },
       });
       console.log("rrrr")
     } catch(error) {
       console.log(error)
     }
   }
 
  
  
  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <h5 className="mb-4">Informations Generales </h5>
     
        <Form  onSubmit={handleSubmit}>
          <Row>
          <Col md={4} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>CIN</Form.Label>
                <Form.Control  type="text" id="cin" name="cin" placeholder="CIN" 
                 onChange={(e) =>setCin(e.target.value)} value={cin}
               
                />
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Group id="firstName">
                <Form.Label>Nom</Form.Label>
                <Form.Control  type="text" id="fname" name="fname" placeholder="votre Nom" 
                 onChange={(e) =>setFname(e.target.value)} value={fname}
               
                />
              </Form.Group>
            </Col>
            <Col md={4} className="mb-3">
              <Form.Group id="lastName">
                <Form.Label>Prenom</Form.Label>
                <Form.Control  type="text" id="lname" name="lname" placeholder="votre prenom"
                            value={lname}    autoComplete="off" onChange={(e) =>setLname(e.target.value)}
                       
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={6} className="mb-3">
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
            <Col md={6} className="mb-3">
              <Form.Group id="gender">
                <Form.Label>Gendre</Form.Label>
                <Form.Select id="gender"  name="gender"
                                autoComplete="off" onChange={(e) =>setGender(e.target.value)}
                                value={gender}
                >
                  <option value="0">Gender</option>
                  <option value="1">Femme</option>
                  <option value="2">Homme</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="emal">
                <Form.Label>Email</Form.Label>
                <Form.Control  type="email" id="email"  
                                autoComplete="off" onChange={(e) =>setEmail(e.target.value)}
                                value={email}
                name="email" placeholder="name@company.com" />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="phone">
                <Form.Label>Téléphone</Form.Label>
                <Form.Control  type="number" 
                                                autoComplete="off" onChange={(e) =>setPhone(e.target.value)}
                                                value={phone}
                id="phone"  name="phone" placeholder="+12-345 678 910" />
              </Form.Group>
            </Col>
          </Row>

          <h5 className="my-4">Address</h5>
          <Row>
            <Col sm={9} className="mb-3">
              <Form.Group id="address">
                <Form.Label>Address</Form.Label>
                <Form.Control  type="text" id="address"  name="address" 
                                                autoComplete="off" onChange={(e) =>setAddress(e.target.value)}
                                                value={address}
                placeholder="Enter your home address" />
              </Form.Group>
            </Col>
            {/* <Col sm={3} className="mb-3">
              <Form.Group id="addressNumber">
                <Form.Label>Numero</Form.Label>
                <Form.Control  type="number" placeholder="No."  id=""  name=""/>
              </Form.Group>
            </Col> */}
          </Row>
          <Row>
            <Col sm={4} className="mb-3">
              <Form.Group id="country">
                <Form.Label>country</Form.Label>
                <Form.Control  type="text" placeholder="country"  id="country"  name="country"
                
                autoComplete="off" onChange={(e) =>setCountry(e.target.value)}
                                                value={country}
                />
              </Form.Group>
            </Col>
            <Col sm={4} className="mb-3">
              <Form.Group className="mb-2">
                <Form.Label>Gouvernerat</Form.Label>
                <Form.Select id="city"   name="cityt"
                
                autoComplete="off" onChange={(e) =>setCity(e.target.value)}
                                                value={city}
                
                >
                  <option value="0">State</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="DC">District Of Columbia</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                
                </Form.Select>
              </Form.Group>
            </Col>
            <Col sm={4}>
              <Form.Group id="zip">
                <Form.Label>Code Postal</Form.Label>
                <Form.Control  type="text" placeholder="ZIP code"  value={zip_code} onChange={(e) =>setZipCode(e.target.value)}/>
              </Form.Group>
            </Col>
          </Row>
          <h5 className="my-4">Infromations Complementaires</h5>
          <Row>
            <Col sm={4} className="mb-3">
              <Form.Group id="addrclubess">
                <Form.Label>Club</Form.Label>
                <Form.Select name="club" id="club"    
                  value={club} autoComplete="off"
                  onChange={(e) =>setClub(e.target.value)}>
      <option value="0" >Choisir votre club </option>
      <option value="1">Athlete</option>
      <option value="2">Entraineur</option>
      <option value="3">Président de club</option>
      <option value="4">Arbitre</option>
    </Form.Select>
               
              </Form.Group>
            </Col>
            <Col sm={4} className="mb-3">
              <Form.Group id="addressNumber">
                <Form.Label>Descipline</Form.Label>
                <Form.Control  type="number" placeholder="No." id="sport"  name="sport"
                                  value={sport} autoComplete="off"
                                  onChange={(e) =>setSport(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col sm={4} className="mb-3">
              <Form.Group id="addressNumber">
                <Form.Label>Ligue</Form.Label>
                <Form.Control  type="number" placeholder="No." id="ligue"  name="ligue"
                                                  value={ligue} autoComplete="off"
                                                  onChange={(e) =>setLigue(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={4} className="mb-3">
              <Form.Group id="city">
                <Form.Label>Age</Form.Label>
                <Form.Control  type="text" placeholder="City" id="age"  name="age"
                
                value={age} autoComplete="off"
                onChange={(e) =>setAge(e.target.value)}
                />
              </Form.Group>
            </Col>

          </Row>
          <div className="mt-3">
            <Button variant="primary" type="submit">Enregistrer</Button>
          </div>
        </Form>
        <Form onSubmit={submit}>
      <Col sm={4}>
            <div className="App">
            <h5>Ajouter  photo de profile :</h5>
            <input type="file" onChange={handleFileSelect}   />
            <img src={file}  height={80}/><br/>
            {progress && <ProgressBar   now={progress} label={`${progress}%`} style={{ height: 20}} />}
        </div>
        </Col>
        <div className="mt-3" >
              <Button variant="primary" type="submit">Enregistrer</Button>
            </div> <br/></Form> 
        
      
      </Card.Body>
    </Card>
  );
};