import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen, faCartArrowDown, faChartPie, faChevronDown, faClipboard, faCommentDots, faFileAlt, faPlus, faRocket, faStore, faPen } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown } from '@themesberg/react-bootstrap';
import { ChoosePhotoWidget, ProfileCardWidget } from "../components/Widgets";
import { EditeProfile } from "../components/Forms";
import { Input } from "@material-ui/core";
import Profile3 from "../assets/img/team/profile-picture-3.jpg";
import axios from "axios";

// const handleSubmit = async (e) => {
//   e.preventDefault();
//   try {
//     console.log("Data for update : ");
//     const token = localStorage.getItem("token");
//     const id=localStorage.getItem("idP");
//     console.log(id);
//     const response = await axios.put(`https://ab76-102-156-25-194.eu.ngrok.io/api/profile/${window.localStorage.getItem("idP")}/`,({'first_name'
//     :'jhon'}), {
//        headers: {'Authorization':`TOKEN ${token}`,'Content-Type':'application/json','Access-Control-Allow-Origin':'Accept'},
//        withCredentials: false
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

export default class CreateEmployee extends React.Component {
  render() {
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <Dropdown>
          {/* <Dropdown.Toggle as={Button} variant="secondary" className="text-dark me-2">
            <FontAwesomeIcon icon={faPlus} className="me-2" />
            <span>New</span>
          </Dropdown.Toggle> */}
          <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-2">
            <Dropdown.Item>
              <FontAwesomeIcon icon={faFileAlt} className="me-2" /> Document
            </Dropdown.Item>
            <Dropdown.Item>
              <FontAwesomeIcon icon={faCommentDots} className="me-2" /> Message
            </Dropdown.Item>
            <Dropdown.Item>
              <FontAwesomeIcon icon={faBoxOpen} className="me-2" /> Product
            </Dropdown.Item>

            <Dropdown.Divider />

            <Dropdown.Item>
              <FontAwesomeIcon icon={faRocket} className="text-danger me-2" /> Subscription Plan
              </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <div className="d-flex">
          <Dropdown>
        
            {/* <Dropdown.Toggle as={Button} variant="primary">
              <FontAwesomeIcon icon={faClipboard} className="me-2" /> Reports
              <span className="icon icon-small ms-1"><FontAwesomeIcon icon={faChevronDown} /></span>
            </Dropdown.Toggle> */}
            <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-1">
              <Dropdown.Item>
                <FontAwesomeIcon icon={faBoxOpen} className="me-2" /> Products
              </Dropdown.Item>
              <Dropdown.Item>
                <FontAwesomeIcon icon={faStore} className="me-2" /> Customers
              </Dropdown.Item>
              <Dropdown.Item>
                <FontAwesomeIcon icon={faCartArrowDown} className="me-2" /> Orders
              </Dropdown.Item>
              <Dropdown.Item>
                <FontAwesomeIcon icon={faChartPie} className="me-2" /> Console
              </Dropdown.Item>

              <Dropdown.Divider />

              <Dropdown.Item>
                <FontAwesomeIcon icon={faRocket} className="text-success me-2" /> All Reports
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
      {/* <div className="App">
      <h1></h1>
      <form>
        <Input
          name="name"
          type="text"
          value=""
          placeholder={"Your names"}
       
        />
        <br />
        <Input
          name="email"
          type="email"
          value=""
          placeholder={"Your email"}
   
        />
        <br />
        <input type="submit" value="Update" />
      </form>
    </div> */}
      <Row>
        <Col xs={12} xl={8}>
          <EditeProfile />
        </Col>

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
        </Col>
      </Row>
    </>
  );}
};
