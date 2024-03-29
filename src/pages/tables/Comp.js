
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { Breadcrumb } from '@themesberg/react-bootstrap';
import { Col, Row, Nav, Card, Image, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup, Modal } from '@themesberg/react-bootstrap';

import { CompTable, RankingTable } from "../../components/Tables";
import { Routes } from "../../routes";
import { Link } from 'react-router-dom';

const Comp = ()=> {
  return (
    <>
      <div className="d-xl-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
        <div className="d-block mb-4 mb-xl-0">
          <Breadcrumb className="d-none d-md-inline-block" listProps={{ className: "breadcrumb-dark breadcrumb-transparent" }}>
            <Breadcrumb.Item><FontAwesomeIcon icon={faHome} /></Breadcrumb.Item>
            <Breadcrumb.Item>Tables</Breadcrumb.Item>
            <Breadcrumb.Item active>Compétition</Breadcrumb.Item>
          </Breadcrumb>
          <h4>Liste des compétitions</h4>
          <Col md={12} >
          <Button
            variant="primary"  as={Link} to={Routes.CompAdd.path} >
             Ajouter Compétition              
            </Button>
          </Col>
          {/* <p className="mb-0">
            Dozens of reusable components built to provide buttons, alerts, popovers, and more.
          </p> */}
        </div>
      </div>

      {/* <PageTrafficTable /> */}
      <CompTable />
    </>
  );
};
export default (Comp);
