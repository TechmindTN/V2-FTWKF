
import React , {useEffect,useState} from "react";
import {  Card} from '@themesberg/react-bootstrap';

import axios from "./api/axios";

const PHOTO_URL='image/'

const Images = () =>{

  const [state2,setState2] = useState([]);
  const [role, setRole] = useState('');

  // useEffect(() => {
  //   axios.get(PHOTO_URL)
  //   .then(res => {
  //     const img=res.data;
  //     setState2(img);
  //     console.log(img)
  //     img.forEach(element => {
  //       console.log(element.url)
  //     });
      
  // })},[])


    return (
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
          <h5 className="mb-4">Liste des images</h5>  
          {state2.map((person) => (<>
                                  
                                  
                                  <img src={person.url} width={50} />    </>   ))}
          {/* <Form onSubmit={submit}>
                    
            <Row className="align-items-center">
      
            <Col sm={4} className="mb-3">
            
            <Form.Group id="category">
                    <Form.Label>Role : </Form.Label>
                    <Form.Select id="role"  name="role" required value={role}  onChange={(e) =>setRole(e.target.value)}
                                  autoComplete="off" >
                                    <option></option>
                                    {state2.map((person) => (<>
                                  
                                    <option value={person.id}> 
                                    {person.roles}
                                    </option>    </>   ))}
                  </Form.Select>
                  </Form.Group>
            </Col>
          </Row>
          <div className="mt-3">
              <Button variant="primary" type="submit">Choisir</Button>
            </div>
          </Form> */}
        </Card.Body>
      </Card>
    );

};
export default (Images);
