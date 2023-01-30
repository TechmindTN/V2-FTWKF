
import React , {useEffect,useState,useRef} from "react";
import "react-image-lightbox/style.css";
import { useHistory  } from "react-router-dom";
import { Form, Col, Row, Card, Button, Modal} from '@themesberg/react-bootstrap';
import axios from "../examples/api/axios";
import 'react-dropzone-uploader/dist/styles.css'

const Lic = () =>{
const Image_url='upload_photo/'
const [showDefault, setShowDefault] = useState(false);
const [showDefault1, setShowDefault1] = useState(false);
const [showDefault2, setShowDefault2] = useState(false);
const [showDefault3, setShowDefault3] = useState(false);
const handleClose = () => setShowDefault(false);
const handleClose1 = () => setShowDefault1(false);
const handleClose2 = () => setShowDefault2(false);
const handleClose3= () => setShowDefault3(false);
const [selectedFile, setSelectedFile] = React.useState(null);
const [selectedFile1, setSelectedFile1] = React.useState(null);
const [selectedFile2, setSelectedFile2] = React.useState(null);
const [selectedFile3, setSelectedFile3] = React.useState(null);
const [file, setFile] = useState();
const [file1, setFile1] = useState();
const [file2, setFile2] = useState();
const [file3, setFile3] = useState();
const[success, setSuccess] = useState (false) ;
const history = useHistory()
const submit = async (e) => {
  e.preventDefault();
history.push('/tables/LicenceAdd')

}

const [inputFiles,setInputFiles]= useState();
const [inputFiles1,setInputFiles1]= useState();
const [inputFiles2,setInputFiles2]= useState();
const [inputFiles3,setInputFiles3]= useState();

const [inputArray,setInputArray]= useState();
const [inputArray1,setInputArray1]= useState();
const [inputArray2,setInputArray2]= useState();
const [inputArray3,setInputArray3]= useState();

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
    function upload2  (e)  {
      const inputArr = new Array()
      Array.from(e.target.files).forEach((piece)=>{
      inputArr.push(piece.name)
      console.log(e.target.files);
      setFile2(URL.createObjectURL(e.target.files[0]));
      setSelectedFile2(e.target.files[0])
      }) 
      setInputArray2({inputArray2: inputArr})
      setInputFiles2({inputFiles2:e.target.files})
      } 
      function upload3  (e)  {
      const inputArr = new Array()
      Array.from(e.target.files).forEach((piece)=>{
      inputArr.push(piece.name)
      console.log(e.target.files);
      setFile3(URL.createObjectURL(e.target.files[0]));
      setSelectedFile3(e.target.files[0])
      }) 
      setInputArray3({inputArray3: inputArr})
      setInputFiles3({inputFiles3:e.target.files})
      } 
  function uploadHandler  () {
    const fd = new FormData();
    if(inputFiles!=null)
    {
      for ( var element of inputFiles.inputFiles) {
        console.log(element)
        fd.append('file',element)
        fd.append("url",element);
        fd.append("path","image/profile/");
        fd.append("user",localStorage.getItem('id'));
        fd.append("season",'2');
      }
    }
    const token = localStorage.getItem("token");
    axios.post(Image_url, fd, { headers: {"Content-Type": "multipart/form-data" ,'Authorization':  `TOKEN ${token}`,
    'Access-Control-Allow-Origin':'Accept'}  })
    .then(function (response) {
      console.log(response.data.url);
      localStorage.setItem("pr",response.data.url)
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
          fd.append("path","image/athlete/identity");
          fd.append("user",localStorage.getItem('id'));
          fd.append("season",'2');
        }
      }
      const token = localStorage.getItem("token");
      axios.post(Image_url, fd, { headers: {"Content-Type": "multipart/form-data" ,'Authorization':  `TOKEN ${token}`,
      'Access-Control-Allow-Origin':'Accept'}  })
      .then((response) => {
        localStorage.setItem("iden",response.data.url)
      })
      .catch( (error)=> {
        console.log(error);
      });
      }
      function uploadHandler2  () {

        const fd = new FormData();
        
        if(inputFiles2!=null)
        {
          for ( var element of inputFiles2.inputFiles2) {
            console.log(element)
            fd.append('file',element)
            fd.append("url",element);
            fd.append("path","image/athlete/photo");
            fd.append("user",localStorage.getItem('id'));
            fd.append("season",'2');
          }
        }
        const token = localStorage.getItem("token");
    
        axios.post(Image_url, fd, { headers: {"Content-Type": "multipart/form-data" ,'Authorization':  `TOKEN ${token}`,
        'Access-Control-Allow-Origin':'Accept'}  })
        .then((response)=> {
          console.log(response);
          localStorage.setItem("ph",response.data.url)
          
   
        })
        .catch( (error)=> {
          console.log(error);
        })
    
        }
        function uploadHandler3  () {

          const fd = new FormData();
          
          if(inputFiles3!=null)
          {
            for ( var element of inputFiles3.inputFiles3) {
              console.log(element)
              fd.append('file',element)
              fd.append("url",element);
              fd.append("path","image/athlete/medical");
              fd.append("user",localStorage.getItem('id'));
              fd.append("season",'2');
            }
          }
          const token = localStorage.getItem("token");
      
          axios.post(Image_url, fd, { headers: {"Content-Type": "multipart/form-data" ,'Authorization':  `TOKEN ${token}`,
          'Access-Control-Allow-Origin':'Accept'}  })
          .then((response) =>{
            localStorage.setItem("mid",response.data.url);
            
          })
          .catch((error)=> {
            console.log(error);
          });
          }
          useEffect(() => {
            uploadHandler(inputFiles); 
         }, [inputFiles]);
         useEffect(() => {
          uploadHandler1(inputFiles1); 
       }, [inputFiles1]);
       useEffect(() => {
        uploadHandler2(inputFiles2); 
     }, [inputFiles2]);
     useEffect(() => {
      uploadHandler3(inputFiles3); 
   }, [inputFiles3]);


    return (
      
         <Row>
        <Form  onSubmit={submit}>
        <Col xs={12} xl={12}>
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
     
          <h5 className="mb-4">Ajouter  pieces jointes pour licence </h5>

          
          <div className="text-center"><p>{success}</p></div>
       <Row>
          {/* <Col>
          
          <input type="file" id="file" name="file" multiple="multiple" onChange={upload}/>
          <img src={file3}  height={80}/><br/>
          
          
          </Col> */}
            <Col sm={3} className="mb-3">
            
    
            <div className="App">
            <h5>Photo de profile : صورة شمسية</h5>
            <input type="file" onChange={upload} required  />
            <img src={file}  height={80} onClick={() => setShowDefault(true)}/><br/>
            {/* {progress && <ProgressBar   now={progress} label={`${progress}%`} style={{ height: 20}} />} */}
        </div>
    
        <div className="mt-3" >
              {/* <Button variant="primary" type="submit">Enregistrer</Button> */}
            </div> 
            
           
            </Col>
 
              <React.Fragment>

                <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
                
                  <Modal.Body>
                
                  <img src={file}  height={400}/>
                  </Modal.Body>
                 
                </Modal>
              </React.Fragment>
            <Col sm={3} className="mb-3">
            
            <div className="App">
            <h5>Photo Identité  : ب ت و</h5>
            <input type="file" onChange={upload1}   required/>
            <img src={file1}  height={80} onClick={() => setShowDefault1(true)}/>
          
            {/* {progress1 && <ProgressBar   now={progress1} label={`${progress1}%`} style={{ height: 20}} />} */}
        </div>
      
        <div className="mt-3" >
              {/* <Button variant="primary" type="submit">Enregistrer</Button> */}
            </div><br></br>
            </Col>
            <React.Fragment>

<Modal as={Modal.Dialog} centered show={showDefault1} onHide={handleClose1}>

  <Modal.Body>

  <img src={file1}  height={400}/>
  </Modal.Body>
 
</Modal>
</React.Fragment>
            <Col sm={3} className="mb-3">
           
        
            <div className="App">
            <h5> Image مضمون ولادة :</h5>
            <input type="file" onChange={upload2}  required/>
            <img src={file2}  height={80} onClick={() => setShowDefault2(true)}/>
            
            {/* {progress2 && <ProgressBar   now={progress2} label={`${progress2}%`} style={{ height: 20}} />} */}
        </div>
       
        <div className="mt-3" >
              {/* <Button variant="primary" type="submit">Enregistrer</Button> */}
            </div><br></br>
        
            </Col>
            <React.Fragment>

<Modal as={Modal.Dialog} centered show={showDefault2} onHide={handleClose2}>

  <Modal.Body>

  <img src={file2}  height={400}/>
  </Modal.Body>
 
</Modal>
</React.Fragment>
<Col  sm={3} className="mb-3">

   
    <h5>Fiche médicale: استمارة طبية</h5>
    <input type="file"onChange={upload3}   required />
    <img src={file3}  height={80}  onClick={() => setShowDefault3(true)}/>
    <React.Fragment>

                <Modal as={Modal.Dialog} centered show={showDefault3} onHide={handleClose3}>
                
                  <Modal.Body>
                
                  <img src={file3}  height={400}/>
                  </Modal.Body>
                 
                </Modal>
              </React.Fragment>
    

<div className="mt-3" >
    </div>
</Col>
          
          </Row>
          <div className="mt-3">
              <Button variant="primary" type="submit">Completer le formulaire</Button>
            </div>
        </Card.Body>
      </Card></Col>
      
        </Form>
  
      
     
        </Row>
         
          
          
    );

};
export default (Lic);
