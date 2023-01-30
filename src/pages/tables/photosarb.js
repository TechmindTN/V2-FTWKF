
import React , {useEffect,useState} from "react";
import {  useHistory  } from "react-router-dom";
import { Form, Col, Row, Card, Button,  Modal} from '@themesberg/react-bootstrap';
import axios from "../examples/api/axios";
import 'react-dropzone-uploader/dist/styles.css'
const Image_url='upload_photo/'
const Athleteadd = () =>{
const [selectedFile, setSelectedFile] = React.useState(null);
const [selectedFile1, setSelectedFile1] = React.useState(null);
const [progress, setProgress] = useState()
const [progress1, setProgress1] = useState()
const [showDefault, setShowDefault] = useState(false);
const [showDefault1, setShowDefault1] = useState(false);
const handleClose = () => setShowDefault(false);
const handleClose1 = () => setShowDefault1(false);
const [file, setFile] = useState();
const [file1, setFile1] = useState();
const[success, setSuccess] = useState (false) ;
const history = useHistory()
const submit = async (e) => {
  e.preventDefault();
history.push('/tables/ArrAdd')

}

const [inputFiles,setInputFiles]= useState();
const [inputFiles1,setInputFiles1]= useState();


const [inputArray,setInputArray]= useState();
const [inputArray1,setInputArray1]= useState();

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
  function upload1  (e)  {

    const inputArr = new Array()
    
    Array.from(e.target.files).forEach((piece)=>{
    
    inputArr.push(piece.name)
    console.log(e.target.files);
    setFile1(URL.createObjectURL(e.target.files[0]));
    setSelectedFile1(e.target.files[0])
    
    }) 
    
    setInputArray1({inputArray1: inputArr})
    setInputFiles1({inputFiles1:e.target.files})
    
    } 
  
   
  function uploadHandler  () {

    const fd = new FormData();
    
    if(inputFiles!=null)
    {
      for ( var element of inputFiles.inputFiles) {
        console.log(element)
        fd.append('file',element)
        fd.append("url",element);
        fd.append("path","image/arbitrator/identity");
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
      localStorage.setItem("ar",response.data.url)
    })
    .catch(function (error) {
      console.log(error);
    });
    }
    function uploadHandler1  () {

      const fd = new FormData();
      
      if(inputFiles1!=null)
      {
        for ( var element of inputFiles1.inputFiles1) {
          console.log(element)
          fd.append('file',element)
          fd.append("url",element);
          fd.append("path","image/arbitrator/grade");
          fd.append("user",localStorage.getItem('id'));
          fd.append("season",'2');
        }
      }
      const token = localStorage.getItem("token");
  
      axios.post(Image_url, fd, { headers: {"Content-Type": "multipart/form-data" ,'Authorization':  `TOKEN ${token}`,
      'Access-Control-Allow-Origin':'Accept'}  ,onUploadProgress: data => {
        //Set the progress value to show the progress bar
        setProgress1(Math.round((100 * data.loaded) / data.total))
      },})
      .then(function (response) {
        console.log(response);
        localStorage.setItem("gr",response.data.url)
      })
      .catch(function (error) {
        console.log(error);
      });
      }

          useEffect(() => {
            uploadHandler(inputFiles); 
         }, [inputFiles]);
         useEffect(() => {
          uploadHandler1(inputFiles1); 
       }, [inputFiles1]);
     
   
            



    return (
      
         <Row>
        <Form  onSubmit={submit}>
        <Col xs={12} xl={12}>
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
     
          <h5 className="mb-4">Ajouter  pieces jointes pour athlete </h5>
          <div className="text-center"><p>{success}</p></div>
       <Row>
          {/* <Col>
          
          <input type="file" id="file" name="file" multiple="multiple" onChange={upload}/>
          <img src={file3}  height={80}/><br/>
          
          
          </Col> */}
            <Col sm={3} className="mb-3">
            
    
            <div className="App">
            <h5>Photo d'identité :</h5>
            <input type="file" onChange={upload} required  />
            <img src={file}  height={80} onClick={() => setShowDefault(true)}/><br/>
            {/* {progress && <ProgressBar   now={progress} label={`${progress}%`} style={{ height: 20}} />} */}
        </div>
    
        <div className="mt-3" >
              {/* <Button variant="primary" type="submit">Enregistrer</Button> */}
            </div> 
            
           
            </Col>
            <Col sm={3} className="mb-3">
            
            <div className="App">
            <h5>Grade Arbitrage :  </h5>
            <input type="file" onChange={upload1}   required/>
            <img src={file1}  height={80} onClick={() => setShowDefault1(true)}/>
          
            {/* {progress1 && <ProgressBar   now={progress1} label={`${progress1}%`} style={{ height: 20}} />} */}
        </div>
      
        <div className="mt-3" >
              {/* <Button variant="primary" type="submit">Enregistrer</Button> */}
            </div><br></br>
            </Col>

          
          </Row>
          <div className="mt-3">
              <Button variant="primary" type="submit">Completer le formulaire</Button>
            </div>
        </Card.Body>
      </Card></Col>
      

      <React.Fragment>

<Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>

  <Modal.Body>

  <img src={file}  height={400}/>
  </Modal.Body>
 
</Modal>
</React.Fragment>    
<React.Fragment>

<Modal as={Modal.Dialog} centered show={showDefault1} onHide={handleClose1}>

  <Modal.Body>

  <img src={file1}  height={400}/>
  </Modal.Body>
 
</Modal>
</React.Fragment>
        </Form>
  
      
      {/* <Col xs={12} xl={4}>
      <Row>
            <Col xs={12}>
              <ProfileCardWidget />
            </Col>
            
          </Row>
        </Col> */}
        </Row>
         
          
          
    );

};
export default (Athleteadd);
