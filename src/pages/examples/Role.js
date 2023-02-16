
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
import { useHistory  } from "react-router-dom";

const Licence_URL='add_licence/'
const PARAMETER_URL='parameters/'
const role_url='role/'
const Role = (props) =>{

  const [state2,setState2] = useState([]);
  const [role, setRole] = useState('');

  useEffect(() => {
    axios.get(PARAMETER_URL)
    .then(res => {
      const Roles=res.data.Roles;
      setState2(Roles);
      console.log(Roles)
      
  })},[])

    useEffect(() => {
      window.localStorage.setItem("rolee", role);
      console.log(role)
    }, [role]);

  const history = useHistory()
  const submit = async (e) => {
    e.preventDefault();
  history.push('/examples/Choose')
  
  }
    return (
      <Card border="light" className="bg-white shadow-sm mb-4">
        <Card.Body>
          <h5 className="mb-4">Choisir le profile de licence</h5>  <h2> {props.data} </h2>
       
          <Form onSubmit={submit}>
                    
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
          </Form>
        </Card.Body>
      </Card>
    );

};
export default (Role);
