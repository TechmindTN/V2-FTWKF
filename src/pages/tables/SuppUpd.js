
import React , {useEffect,useState,useRef} from "react";
import { Form, Col, Row, Card, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup, Modal,InputGroup } from '@themesberg/react-bootstrap';
import axios from "../examples/api/axios";
import {useHistory  } from "react-router-dom";


const ClubUpd = () =>{

  const [file, setFile] = useState();
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [inputArray,setInputArray]= useState();
  const [inputFiles,setInputFiles]= useState();
  const PARAMETER_URL='parameters/'
  const Image_url='upload_photo/'
  function upload  (e)  {

    const inputArr = new Array()
    
    Array.from(e.target.files).forEach((piece)=>{
    
    inputArr.push(piece.name)
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
    setSelectedFile(e.target.files[0])
    
    }) 
    
    setInputArray({inputArray: inputArr})
    setInputFiles({inputFiles:e.target.files})
    
    } 
    function uploadHandler  () {

      const fd = new FormData();
      
      if(inputFiles!=null)
      {
        for ( var element of inputFiles.inputFiles) {
          console.log(element)
          fd.append('file',element)
          fd.append("url",element);
          fd.append("path","image/supporter/identity");
          fd.append("user",localStorage.getItem('id'));
          fd.append("season",'2');
        }
      }
      const token = localStorage.getItem("token");
  
      axios.post(Image_url, fd, { headers: {"Content-Type": "multipart/form-data" ,'Authorization':  `TOKEN ${token}`,
      'Access-Control-Allow-Origin':'Accept'}  ,onUploadProgress: data => {
        //Set the progress value to show the progress bar
      //  setProgress(Math.round((100 * data.loaded) / data.total))
      },})
      .then(function (response) {
        const url= response.data.url;
        localStorage.setItem('url',url) 
        setIm1(`https://3462-197-14-10-36.eu.ngrok.io${url} `)
      })
      .catch(function (error) {
        console.log(error);
      });
      }
      useEffect(() => {
        uploadHandler(inputFiles); 
     }, [inputFiles]);

const [name, setName] = useState();
const[success, setSuccess] = useState (false) ;
const [state3,setState3]=useState([]);
const [im1,setIm1]=useState([]);
const [Club,setClub] = useState([])
const cl=localStorage.getItem('supp')
const SUPP_URL=`supporter/${cl}/`;
useEffect(() => {
  axios.get(PARAMETER_URL,``)
  .then(res => {
   console.log(res.data.Clubs)
   setState3(res.data.Clubs)
})},[])

useEffect(() => {

axios.get(SUPP_URL,{
  headers: {'Content-Type': 'application/x-www-form-urlencoded','Authorization':` TOKEN ${window.localStorage.getItem("token")}`,  'Access-Control-Allow-Methods': 'Accept'},
  withCredentials: false
})
.then(res => {
  const persons = res.data;
  console.log(persons)
  setName(persons.name)
  setClub(persons.club)
  setIm1(persons.logo)
}
)},[])
const history = useHistory()

const handlesubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("name", name);
  formData.append("club", Club);
  formData.append("logo", im1);
try {
  const token = localStorage.getItem("token");
    axios.put(
      SUPP_URL,
       formData,
       { headers: {'Content-Type': 'multipart/form-data','Authorization':  `TOKEN ${token}`,'Access-Control-Allow-Origin':'Accept'} },
    )
    setSuccess(<div className="alert alert-success d-flex align-items-center" role="alert">
    <div>Supporteur modifié</div></div>);
  // const timer = setTimeout(() => {
  //   // console.log('This will run after 1 second!')
  //   history.push('/tables/Supporteur')
  // }, 3000);
  // return () => clearTimeout(timer); 
     localStorage.removeItem("cl");
 
}catch(error) {
  console.log(error)
}

}




    return (
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
          <h5 className="mb-4">Modifier Supporteur </h5>
          <Form onSubmit={handlesubmit}>
          <div className="text-center"><p>{success}</p></div>
            <Row>
            <Col md={3} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Nom :</Form.Label>
                  <Form.Control  type="text" id="cin" name="cin" 
                  value={name }  onChange={(e) =>setName(e.target.value)}
                 
                  />
                </Form.Group>
              </Col>
            
             
              <Col sm={3} className="mb-3">
                <Form.Group id="ligue">
                  <Form.Label>Club : </Form.Label>
                  <Form.Select id="ligue"  name="ligue"  value={Club}  onChange={(e) =>setLigue(e.target.value)}
                                  autoComplete="off" >
                                    {state3.map((person) => (<>
                              <option value={person.id}> 
        {person.name}</option>    </>   ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col sm={3} className="mb-3">
            
                    <Form.Group id="category">
                    <Form.Label>Photo :   </Form.Label><br/>
                    <input type="file" onChange={upload}   />
                    <img src={im1}  height={80}/><br/>
                    </Form.Group>
               
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
export default (ClubUpd);
