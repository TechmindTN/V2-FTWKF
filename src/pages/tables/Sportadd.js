
import React , {useEffect,useState,useRef} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome , faCalendarAlt, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb } from '@themesberg/react-bootstrap';
import { Form, Col, Row, Nav, Card, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup, Modal,InputGroup } from '@themesberg/react-bootstrap';
import { Routes } from "../../routes";
import { Link } from 'react-router-dom';
import { PageTrafficTable, RankingTable } from "../../components/Tables";
import axios from "../examples/api/axios";
import Datetime from "react-datetime";

const SPORT_URL='discipline/'
const Image_url='upload_photo/'
const Sportadd = () =>{

const[datas,setData]=useState('');
const [showDefault, setShowDefault] = useState(false);
const handleClose = () => setShowDefault(false);
const [file, setFile] = useState();

const [selectedFile, setSelectedFile] = React.useState(null);

const [success, setSuccess] = useState (false) ;
const [sport,setSport] = useState();
const [description,setDescription] = useState();
const [inputArray,setInputArray]= useState();
const [inputFiles,setInputFiles]= useState();

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
        fd.append("path","image/discipline/photo");
        fd.append("user",localStorage.getItem('id'));
        fd.append("season",'2');
      }
    }
    const token = localStorage.getItem("token");

    axios.post(Image_url, fd, { headers: {"Content-Type": "multipart/form-data" ,'Authorization':  `TOKEN ${token}`,
    'Access-Control-Allow-Origin':'Accept'}  ,onUploadProgress: data => {
      //Set the progress value to show the progress bar
      setProgress(Math.round((100 * data.loaded) / data.total))
    },})
    .then(function (response) {
      console.log(response.data.url);
      localStorage.setItem("sp",response.data.url)
    })
    .catch(function (error) {
      console.log(error);
    });
    }
    useEffect(() => {
      uploadHandler(inputFiles); 
   }, [inputFiles]);
const handlesubmit = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  const formData2 = new FormData();
  const sp=localStorage.getItem('sp');
  console.log(sp)
  formData.append("name", sport);
  formData.append("description", description);
  formData.append("image",`https://41c5-197-14-10-36.eu.ngrok.io${sp} `);
 
try {
  const token = localStorage.getItem("token");

    axios.post(
      SPORT_URL,
       formData,
       { headers: {"Content-Type": "multipart/form-data" ,'Authorization':  `TOKEN ${token}`,
        'Access-Control-Allow-Origin':'Accept'} },
    )
    setSuccess("Desciplines ajouté avec succes");
    localStorage.removeItem('sp');
    // window.location.href = "/tables/Athletes/"
}catch(error) {
  console.log(error)
}
 
}

    return (
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
          <h5 className="mb-4">Ajouter Descipline </h5>
       
          <Form onSubmit={handlesubmit}>
          <div className="text-center"><p>{success}</p></div>
            <Row>
            <Col md={4} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>sport</Form.Label>
                  <Form.Control  type="text" id="sport" name="sport" requires 
                  value={sport }  onChange={(e) =>setSport(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Description</Form.Label>
                  <Form.Control  type="text" id="sport" name="sport" requires 
                  value={description }  onChange={(e) =>setDescription(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={4} className="mb-3">
                <Form.Group id="firstName">
                  <Form.Label>Image</Form.Label>
                 
                  <input type="file" onChange={upload} required  />
            <img src={file}  height={80}/><br/>
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
export default (Sportadd);
