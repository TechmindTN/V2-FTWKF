
import React ,{useEffect, useState}from "react";
import { faCashRegister, faChartLine} from '@fortawesome/free-solid-svg-icons';
import { Col, Row,  Dropdown, } from '@themesberg/react-bootstrap';

import { CounterWidget, CircleChartWidget, BarChartWidget, TeamMembersWidget, ProgressTrackWidget, RankingWidget, SalesValueWidget, SalesValueWidgetPhone, AcquisitionWidget } from "../../components/Widgets";
import { PageVisitsTable } from "../../components/Tables";
import { trafficShares, totalOrders } from "../../data/charts";
import axios from "../examples/api/axios";
const Dashboard = ()  =>{
  const STAT_URL='stats/';
  const token = localStorage.getItem("token");
  const [at,setAt]=useState(); 
  const [lic,setLic]=useState();
  const [club,setClub]=useState();
  const [ent,setEnt]=useState();
useEffect(() => {

  axios.get(STAT_URL,   { headers: {"Content-Type": "multipart/form-data" ,
  'Authorization':  `TOKEN ${token}`,'Access-Control-Allow-Origin':'Accept'}  })
  .then(res => {
    const stat = res.data;
    console.log(stat)
    setAt(stat.athletes);
    setClub(stat.clubs);
    setEnt(stat.coaches);
    setLic(stat.active_licences)
   
})},[])
  
  return (
    <>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <Dropdown className="btn-toolbar">
          {/* <Dropdown.Toggle as={Button} variant="primary" size="sm" className="me-2">
            <FontAwesomeIcon icon={faPlus} className="me-2" />New Task
          </Dropdown.Toggle> */}
          {/* <Dropdown.Menu className="dashboard-dropdown dropdown-menu-left mt-2">
            <Dropdown.Item className="fw-bold">
              <FontAwesomeIcon icon={faTasks} className="me-2" /> New Task
            </Dropdown.Item>
            <Dropdown.Item className="fw-bold">
              <FontAwesomeIcon icon={faCloudUploadAlt} className="me-2" /> Upload Files
            </Dropdown.Item>
            <Dropdown.Item className="fw-bold">
              <FontAwesomeIcon icon={faUserShield} className="me-2" /> Preview Security
            </Dropdown.Item>

            <Dropdown.Divider />

            <Dropdown.Item className="fw-bold">
              <FontAwesomeIcon icon={faRocket} className="text-danger me-2" /> Upgrade to Pro
            </Dropdown.Item>
          </Dropdown.Menu> */}
        </Dropdown>

        {/* <ButtonGroup>
          <Button variant="outline-primary" size="sm">Share</Button>
          <Button variant="outline-primary" size="sm">Export</Button>
        </ButtonGroup> */}
      </div>

      <Row className="justify-content-md-center">
      <Col xs={12} sm={6} xl={3} className="mb-4">
          <CounterWidget
            category="Nombre des Athletes"
            title={at}
           // period="Feb 1 - Apr 1"
           // percentage={18.2}
            icon={faChartLine}
            iconColor="shape-secondary"
          />
        </Col>

        <Col xs={12} sm={6} xl={3} className="mb-4">
          <CounterWidget
            category="Nombre des Licences"
             title={lic}
            // period="Feb 1 - Apr 1"
            // percentage={28.4}
            icon={faCashRegister}
             iconColor="shape-tertiary"
          />
        </Col>

        <Col xs={12} sm={6} xl={3} className="mb-4">
        <CounterWidget
            category=" Nombre de Clubs"
            title={club}
           // period="Feb 1 - Apr 1"
           // percentage={18.2}
            icon={faChartLine}
            iconColor="shape-secondary"
          />
        </Col>
        <Col xs={12} sm={6} xl={3} className="mb-4">
        <CounterWidget
            category=" Nombre des Entraineurs"
            title={ent}
           // period="Feb 1 - Apr 1"
           // percentage={18.2}
            icon={faChartLine}
            iconColor="shape-secondary"
          />
        </Col>
        <Col xs={12} className="mb-4 d-none d-sm-block">
          <SalesValueWidget
            title="Licence par saison"
            value={lic}
            percentage={10.57}
          />
        </Col>
        <Col xs={12} className="mb-4 d-sm-none">
          <SalesValueWidgetPhone
            title="Sales Value"
            value="10,567"
            percentage={10.57}
          />
        </Col>
      
      </Row>

      {/* <Row>
        <Col xs={12} xl={12} className="mb-4">
          <Row>
            <Col xs={12} xl={8} className="mb-4">
              <Row>
                <Col xs={12} className="mb-4">
                  <PageVisitsTable />
                </Col>

                <Col xs={12} lg={6} className="mb-4">
                  <TeamMembersWidget />
                </Col>

                <Col xs={12} lg={6} className="mb-4">
                  <ProgressTrackWidget />
                </Col>
              </Row>
            </Col>

            <Col xs={12} xl={4}>
              <Row>
                <Col xs={12} className="mb-4">
                  <BarChartWidget
                    title="Total orders"
                    value={452}
                    percentage={18.2}
                    data={totalOrders} />
                </Col>

                <Col xs={12} className="px-0 mb-4">
                  <RankingWidget />
                </Col>

                <Col xs={12} className="px-0">
                  <AcquisitionWidget />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row> */}
    </>
  );
};
export default (Dashboard);
