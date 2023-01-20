
import React, {useState, useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell,faBellSlash ,faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Nav, Card, Image, Button, Table, Dropdown, Pagination, ButtonGroup, Modal } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';

import { Routes } from "../routes";
import { pageVisits, pageTraffic, pageRanking } from "../data/tables";
import transactions from "../data/transactions";
import commands from "../data/commands";
import axios from "../pages/examples/api/axios";
import logo from "../assets/img/logo-ftwkf.png";
import { ContentCutOutlined } from "@mui/icons-material";

const CLUB_URL='club/'
const SPORT_URL='discipline/';
const AGE_URL='parameters/';
const SAISON_URL='seasons/';
const LIGUE_URL='ligue/';
const ValueChange = ({ value, suffix }) => {
  const valueIcon = value < 0 ? faAngleDown : faAngleUp;
  const valueTxtColor = value < 0 ? "text-danger" : "text-success";

  return (
    value ? <span className={valueTxtColor}>
      <FontAwesomeIcon icon={valueIcon} />
      <span className="fw-bold ms-1">
        {Math.abs(value)}{suffix}
      </span>
    </span> : "--"
  );
};

export const PageVisitsTable = () => {
  const TableRow = (props) => {
    const { pageName, views, returnValue, bounceRate } = props;
    const bounceIcon = bounceRate < 0 ? faArrowDown : faArrowUp;
    const bounceTxtColor = bounceRate < 0 ? "text-danger" : "text-success";

    return (
      <tr>
        <th scope="row">{pageName}</th>
        <td>{views}</td>
        <td>${returnValue}</td>
        <td>
          <FontAwesomeIcon icon={bounceIcon} className={`${bounceTxtColor} me-3`} />
          {Math.abs(bounceRate)}%
        </td>
      </tr>
    );
  };

  return (
    
    <Card border="light" className="shadow-sm">
      <Card.Header>
        <Row className="align-items-center">
          <Col>
            <h5>Page visits</h5>
          </Col>
          <Col className="text-end">
            <Button variant="secondary" size="sm">See all</Button>
          </Col>
        </Row>
      </Card.Header>
     

      <Table responsive className="align-items-center table-flush">
        <thead className="thead-light">
          <tr>
            <th scope="col">Page name</th>
            <th scope="col">Page Views</th>
            <th scope="col">Page Value</th>
            <th scope="col">Bounce rate</th>
          </tr>
        </thead>
        <tbody>
          {pageVisits.map(pv => <TableRow key={`page-visit-${pv.id}`} {...pv} />)}
        </tbody>
      </Table>
    </Card>
  );
};




export const PageTrafficTable = () => {
  const [showDefault, setShowDefault] = useState(false);
  const handleClose = () => setShowDefault(false);
  const TableRow = (props) => {
    const { id, source, sourceIcon, sourceIconColor, sourceType, category, rank, trafficShare, change } = props;
   
    return (
      
      <tr >
        <td className="border-0 ">
          <Card.Link href="#" className="text-primary ">{id ? id : "--"}</Card.Link>
        </td>
        <td className="border-0 ">
          {source ? source : "--"}
        </td>
        <td className="border-0 ">{sourceType ? sourceType : "--"}</td>
        <td className="border-0 ">{category ? category : "--"}</td>
        <td className="border-0 ">{rank ? rank : "--"}</td>
        <td className="border-0 ">{trafficShare ? trafficShare : "--"}
          {/* <Row className="d-flex align-items-center">
            <Col xs={12} xl={2} className="px-0">
              <small className="border-0">{trafficShare}</small>
            </Col>
            <Col xs={12} xl={10} className="px-0 px-xl-1">
              <ProgressBar variant="primary" className="progress-lg mb-0" now={trafficShare} min={0} max={100} />
            </Col>
          </Row> */}
        </td>
        <td className="border-0 ">
       {change} 
        </td>
        <td className="border-0 "> <Button variant="primary" className="my-0" onClick={() => setShowDefault(true)}>Details</Button></td>
        <React.Fragment>

  <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
    <Modal.Header>
      <Modal.Title className="h6">Edite athletes</Modal.Title>
      <Button variant="close" aria-label="Close" onClick={handleClose} />
    </Modal.Header>
    <Modal.Body>
      <p>With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.</p>
      <p>The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.</p>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        I Got It
    </Button>
      <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
        Close
    </Button>
    </Modal.Footer>
  </Modal>
</React.Fragment>
      </tr>
      
    );

  };

  return (
    <Card border="light" className="shadow-sm mb-4">
      <Card.Body className="pb-0">
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0">Licence</th>
              <th className="border-0">CIN</th>
              <th className="border-0">Nom</th>
              <th className="border-0">Prenom</th>
              <th className="border-0">Date Naissance</th>
              <th className="border-0">Nationalité </th>
              <th className="border-0">Age</th>
              <th className="border-0">Actions</th>
              {/* <th className="border-0">sexe</th>
              <th className="border-0">Club</th>
              <th className="border-0">Ligue</th>
              <th className="border-0">Ligue</th> */}
             
            </tr>
          </thead>
          <tbody>
            {pageTraffic.map(pt => <TableRow key={`page-traffic-${pt.id}`} {...pt} />)}
            
          </tbody>
        </Table>
      </Card.Body>
    </Card>
    
  );
};

export const ClubTable = () => {
  const[datas,setData]=useState('');
const [showDefault, setShowDefault] = useState(false);
const [showDefaultss, setShowDefaultss] = useState();
const token=localStorage.getItem('token')
const handleClose = () => setShowDefault(false);
const [state,setState]=useState([])
useEffect(() => {
  axios.get(CLUB_URL)
  .then(res => {
    const persons = res.data;
    setState(persons);
    console.log(state)

})},[])
 // const[id,setId]=useState([])
  const TableRow = (props) => {
    const { country, countryImage, overallRank, overallRankChange, travelRank, travelRankChange, widgetsRank, widgetsRankChange } = props;

    return (
      <tr>
        <td className="border-0">
          <Card.Link href="#" className="d-flex align-items-center">
            <Image src={countryImage} className="image-small rounded-circle me-2" />
            <div><span className="h6">{country}</span></div>
          </Card.Link>
        </td>
        <td className="fw-bold border-0">
          {overallRank ? overallRank : "-"}
        </td>
        <td className="border-0">
          <ValueChange value={overallRankChange} />
        </td>
        <td className="fw-bold border-0">
          {travelRank ? travelRank : "-"}
        </td>
        <td className="border-0">
          <ValueChange value={travelRankChange} />
        </td>
        <td className="fw-bold border-0">
          {widgetsRank ? widgetsRank : "-"}
        </td>
        <td className="border-0">
          <ValueChange value={widgetsRankChange} />
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body className="pb-0">
        <Table responsive className="table-centered table-nowrap rounded mb-0">
          <thead className="thead-light">
            <tr>
              <th className="border-0">Id</th>
              <th className="border-0">Logo</th>

              <th className="border-0">Club</th>
              <th className="border-0">Ligue</th>
              <th className="border-0">Profile</th>
              <th className="border-0">Details</th>
            
            </tr>
          </thead>
          <tbody>
          {state.map((person) => (
        <><tr>
              <td className="border-0 ">{person.id}</td>
              <td className="border-0 "> <Image src={person.logo} style={{ width: 30, height: 30 }} alt="icons" /> </td>
              <td className="border-0 ">{person.name}</td>
              <td className="border-0 ">{person.ligue}</td>
              <td className="border-0 ">{person.profile}</td>
              
              
              <td className="border-0 "> <Button variant="primary" className="my-0" as={Link} to={Routes.ClubUpd.path}
              onClick={() => 
        setShowDefault(localStorage.setItem('cl',person.id))} >Modifier</Button>&nbsp;
           <Button variant="primary" className="my-0" onClick={(e) => setShowDefaultss(
          
          axios.delete(`club/${person.id}/`,{ headers: {'Content-Type': 'Application/json','Authorization':  `TOKEN ${token}`,
          'Access-Control-Allow-Origin':'Accept'} })
          .then(res => {
            const num_licences =person.id;
           
            console.log(num_licences);
            setState([...state, num_licences]);
            const persons = res.data;
          
            console.log(persons);
         window.location.reload(false);
        }) 

        )}>Supprimer</Button>
        
        
        
        
        </td>

              <React.Fragment>

                <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
                  <Modal.Header>
                    <Modal.Title className="h6"> {person.id}</Modal.Title>
                    <Button variant="close" aria-label="Close" onClick={handleClose} />
                  </Modal.Header>
                  <Modal.Body>
                 {person.cin}
                    <p>With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.</p>
                    <p>The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.</p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      I Got It
                    </Button>
                    <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </React.Fragment>
              {/* </> ))} */}
            </tr></>))}
      
            {/* {pageRanking.map(r => <TableRow key={`ranking-${r.id}`} {...r} />)} */}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
};

export const TransactionsTable = () => {
  const totalTransactions = transactions.length;

  const TableRow = (props) => {
    const { invoiceNumber, subscription, price, issueDate, dueDate, status } = props;
    const statusVariant = status === "Paid" ? "success"
      : status === "Due" ? "warning"
        : status === "Canceled" ? "danger" : "primary";

    return (
      <tr>
        <td>
          <Card.Link as={Link} to={Routes.Invoice.path} className="fw-normal">
            {invoiceNumber}
          </Card.Link>
        </td>
        <td>
          <span className="fw-normal">
            {subscription}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {issueDate}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            {dueDate}
          </span>
        </td>
        <td>
          <span className="fw-normal">
            ${parseFloat(price).toFixed(2)}
          </span>
        </td>
        <td>
          <span className={`fw-normal text-${statusVariant}`}>
            {status}
          </span>
        </td>
        <td>
          <Dropdown as={ButtonGroup}>
            <Dropdown.Toggle as={Button} split variant="link" className="text-dark m-0 p-0">
              <span className="icon icon-sm">
                <FontAwesomeIcon icon={faEllipsisH} className="icon-dark" />
              </span>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <FontAwesomeIcon icon={faEye} className="me-2" /> View Details
              </Dropdown.Item>
              <Dropdown.Item>
                <FontAwesomeIcon icon={faEdit} className="me-2" /> Edit
              </Dropdown.Item>
              <Dropdown.Item className="text-danger">
                <FontAwesomeIcon icon={faTrashAlt} className="me-2" /> Remove
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        <Table hover className="user-table align-items-center">
          <thead>
            <tr>
              <th className="border-bottom">Num</th>
              <th className="border-bottom">Licence</th>
              <th className="border-bottom">Nom</th>
              <th className="border-bottom">Prénom</th>
              <th className="border-bottom">Profile</th>
              <th className="border-bottom">Saison</th>
              <th className="border-bottom">Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(t => <TableRow key={`transaction-${t.invoiceNumber}`} {...t} />)}
          </tbody>
        </Table>
        <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
          <Nav>
            <Pagination className="mb-2 mb-lg-0">
              <Pagination.Prev>
                Previous
              </Pagination.Prev>
              <Pagination.Item active>1</Pagination.Item>
              <Pagination.Item>2</Pagination.Item>
              <Pagination.Item>3</Pagination.Item>
              <Pagination.Item>4</Pagination.Item>
              <Pagination.Item>5</Pagination.Item>
              <Pagination.Next>
                Next
              </Pagination.Next>
            </Pagination>
          </Nav>
          <small className="fw-bold">
            Showing <b>{totalTransactions}</b> out of <b>25</b> entries
          </small>
        </Card.Footer>
      </Card.Body>
    </Card>
  );
};
export const SportsTable = () => {

  const [state,setState]=useState([])
    useEffect(() => {
      axios.get(SPORT_URL)
      .then(res => {
        const persons = res.data;
        setState(persons);
    
    })},[])
 

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body className="p-0">
        <Table responsive className="table-centered rounded" style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
          <thead className="thead-light">
            <tr>
              <th className="border-0" style={{ width: '5%' }}>ID</th>
              <th className="border-0" style={{ width: '5%' }}>LOGO</th>

              <th className="border-0" style={{ width: '5%' }}>Nom</th>
          {/* <th className="border-0" style={{ width: '50%' }}>Description</th>
              <th className="border-0" style={{ width: '40%' }}>Extra</th> */}
            </tr>
          </thead>
          <tbody>
          {state.map((person) => (
        <><tr>
              <td className="border-0 ">{person.id}</td>
              <td className="border-0 "><img src={person.image} style={{ width: 30, height: 30 }} alt="icons" /></td>
              <td className="border-0 ">{person.name}</td>
            
              
              {/* <td className="border-0 "> <Button variant="primary" className="my-0" onClick={() => setShowDefault(true)}>Details {person.id}</Button></td>

              <React.Fragment>

                <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
                  <Modal.Header>
                    <Modal.Title className="h6"> {person.id}</Modal.Title>
                    <Button variant="close" aria-label="Close" onClick={handleClose} />
                  </Modal.Header>
                  <Modal.Body>
                 {person.cin}
                    <p>With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.</p>
                    <p>The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.</p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      I Got It
                    </Button>
                    <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </React.Fragment> */}
              {/* </> ))} */}
            </tr></>))}
      
            {/* {pageRanking.map(r => <TableRow key={`ranking-${r.id}`} {...r} />)} */}
          </tbody>
          {/* <tbody>
            {commands.map(c => <TableRow key={`command-${c.id}`} {...c} />)}
          </tbody> */}
        </Table>
      </Card.Body>
    </Card>
  );
};
const COMP_URL="competition/";
export const CompTable = () => {

  const [state,setState]=useState([])
  const [showDefault, setShowDefault] = useState(false);
  useEffect(() => {
      axios.get(COMP_URL)
      .then(res => {
        const persons = res.data;
        setState(persons);
    
    })},[])
 

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body className="p-0">
        <Table responsive className="table-centered rounded" style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
          <thead className="thead-light">
            <tr>
              <th className="border-0" style={{ width: '5%' }}>ID</th>
              <th className="border-0" style={{ width: '5%' }}>Name</th>
              <th className="border-0" style={{ width: '5%' }}>Descipline</th>
              <th className="border-0" style={{ width: '5%' }}>Max participants</th>
              <th className="border-0" style={{ width: '5%' }}>season </th>

              <th className="border-0" style={{ width: '5%' }}>duration</th>
              <th className="border-0" style={{ width: '5%' }}>Actions</th>
          {/* <th className="border-0" style={{ width: '50%' }}>Description</th>
              <th className="border-0" style={{ width: '40%' }}>Extra</th> */}
            </tr>
          </thead>
          <tbody>
          {state.map((person) => (
        <><tr>
              <td className="border-0 ">{person.id}</td>
              <td className="border-0 ">{person.name}</td>
              <td className="border-0 ">{person.discipline}</td>
              <td className="border-0 ">{person.max_participants}</td>
              <td className="border-0 ">{person.season}</td>
              <td className="border-0 ">{person.duration}</td>
              <td className="border-0 ">
              <Button variant="primary" className="my-0"  as={Link} to={Routes.CompUpd.path} onClick={() => setShowDefault(
                localStorage.setItem("comp",person.id)
             )}>Modifier</Button></td>
              
              {/* <td className="border-0 "> <Button variant="primary" className="my-0" onClick={() => setShowDefault(true)}>Details {person.id}</Button></td>

              <React.Fragment>

                <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
                  <Modal.Header>
                    <Modal.Title className="h6"> {person.id}</Modal.Title>
                    <Button variant="close" aria-label="Close" onClick={handleClose} />
                  </Modal.Header>
                  <Modal.Body>
                 {person.cin}
                    <p>With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.</p>
                    <p>The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.</p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      I Got It
                    </Button>
                    <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </React.Fragment> */}
              {/* </> ))} */}
            </tr></>))}
      
            {/* {pageRanking.map(r => <TableRow key={`ranking-${r.id}`} {...r} />)} */}
          </tbody>
          {/* <tbody>
            {commands.map(c => <TableRow key={`command-${c.id}`} {...c} />)}
          </tbody> */}
        </Table>
      </Card.Body>
    </Card>
  );
};
export const AgeTable = () => {
  const [state,setState]=useState([])
    useEffect(() => {
      axios.get(AGE_URL)
      .then(res => {
        const age=res.data.Categories;
        console.log(age);
        setState(age);
    
    })},[])
  const TableRow = (props) => {
    const { name, usage = [], description, link } = props;

    
    return (
      <tr>
        <td className="border-0" style={{ width: '5%' }}>
          <code>{name}</code>
        </td>
        <td className="fw-bold border-0" style={{ width: '5%' }}>
          <ul className="ps-0">
            {usage.map(u => (
              <ol key={u} className="ps-0">
                <code>{u}</code>
              </ol>
            ))}
          </ul>
        </td>
        <td className="border-0" style={{ width: '50%' }}>
          <pre className="m-0 p-0">{description}</pre>
        </td>
        <td className="border-0" style={{ width: '40%' }}>
          <pre><Card.Link href={link} target="_blank">Read More <FontAwesomeIcon icon={faExternalLinkAlt} className="ms-1" /></Card.Link></pre>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body className="p-0">
        <Table responsive className="table-centered rounded" style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
          <thead className="thead-light">
            <tr>
              <th className="border-0" style={{ width: '5%' }}>ID</th>
              <th className="border-0" style={{ width: '5%' }}>Age</th>
              <th className="border-0" style={{ width: '5%' }}>Actions</th>
          {/* <th className="border-0" style={{ width: '50%' }}>Description</th>
              <th className="border-0" style={{ width: '40%' }}>Extra</th> */}
            </tr>
          </thead>
          <tbody>
          {state.map((person) => (
        <><tr>
              <td className="border-0 ">{person.id}</td>
              <td className="border-0 ">{person.categorie_age}</td>
              <td className="border-0 "> <Button variant="primary" className="my-0" >Modifier</Button></td>
              
              {/* <td className="border-0 "> <Button variant="primary" className="my-0" onClick={() => setShowDefault(true)}>Details {person.id}</Button></td>

              <React.Fragment>

                <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
                  <Modal.Header>
                    <Modal.Title className="h6"> {person.id}</Modal.Title>
                    <Button variant="close" aria-label="Close" onClick={handleClose} />
                  </Modal.Header>
                  <Modal.Body>
                 {person.cin}
                    <p>With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.</p>
                    <p>The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.</p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      I Got It
                    </Button>
                    <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </React.Fragment> */}
              {/* </> ))} */}
            </tr></>))}
      
            {/* {pageRanking.map(r => <TableRow key={`ranking-${r.id}`} {...r} />)} */}
          </tbody>
          {/* <tbody>
            {commands.map(c => <TableRow key={`command-${c.id}`} {...c} />)}
          </tbody> */}
        </Table>
      </Card.Body>
    </Card>
  );
};
export const PoidsTable = () => {
  const [state,setState]=useState([])
    useEffect(() => {
      axios.get(AGE_URL)
      .then(res => {
        const age=res.data.Weights;
        console.log(age);
        setState(age);
    
    })},[])
  const TableRow = (props) => {
    const { name, usage = [], description, link } = props;

    
    return (
      <tr>
        <td className="border-0" style={{ width: '5%' }}>
          <code>{name}</code>
        </td>
        <td className="fw-bold border-0" style={{ width: '5%' }}>
          <ul className="ps-0">
            {usage.map(u => (
              <ol key={u} className="ps-0">
                <code>{u}</code>
              </ol>
            ))}
          </ul>
        </td>
        <td className="border-0" style={{ width: '50%' }}>
          <pre className="m-0 p-0">{description}</pre>
        </td>
        <td className="border-0" style={{ width: '40%' }}>
          <pre><Card.Link href={link} target="_blank">Read More <FontAwesomeIcon icon={faExternalLinkAlt} className="ms-1" /></Card.Link></pre>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body className="p-0">
        <Table responsive className="table-centered rounded" style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
          <thead className="thead-light">
            <tr>
              <th className="border-0" style={{ width: '5%' }}>ID</th>
              <th className="border-0" style={{ width: '5%' }}>poids</th>
              <th className="border-0" style={{ width: '5%' }}>Actions</th>
          {/* <th className="border-0" style={{ width: '50%' }}>Description</th>
              <th className="border-0" style={{ width: '40%' }}>Extra</th> */}
            </tr>
          </thead>
          <tbody>
          {state.map((person) => (
        <><tr>
              <td className="border-0 ">{person.id}</td>
              <td className="border-0 ">{person.masse_en_killograme}</td>
              <td className="border-0 "> <Button variant="primary" className="my-0" >Modifier</Button></td>
              
              {/* <td className="border-0 "> <Button variant="primary" className="my-0" onClick={() => setShowDefault(true)}>Details {person.id}</Button></td>

              <React.Fragment>

                <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
                  <Modal.Header>
                    <Modal.Title className="h6"> {person.id}</Modal.Title>
                    <Button variant="close" aria-label="Close" onClick={handleClose} />
                  </Modal.Header>
                  <Modal.Body>
                 {person.cin}
                    <p>With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.</p>
                    <p>The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.</p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      I Got It
                    </Button>
                    <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </React.Fragment> */}
              {/* </> ))} */}
            </tr></>))}
      
            {/* {pageRanking.map(r => <TableRow key={`ranking-${r.id}`} {...r} />)} */}
          </tbody>
          {/* <tbody>
            {commands.map(c => <TableRow key={`command-${c.id}`} {...c} />)}
          </tbody> */}
        </Table>
      </Card.Body>
    </Card>
  );
};
const token = localStorage.getItem("token");

export const SaisonTable = () => {
  const [activated, setActivated]=useState([])
  const [state,setState]=useState([])
    useEffect(() => {
      axios.get(SAISON_URL)
      .then(res => {
        const saison=res.data;

      
         setState(saison);
     
    
    })},[])
  const TableRow = (props) => {
    const { name, usage = [], description, link } = props;

    
    return (
      <tr>
        <td className="border-0" style={{ width: '5%' }}>
          <code>{name}</code>
        </td>
        <td className="fw-bold border-0" style={{ width: '5%' }}>
          <ul className="ps-0">
            {usage.map(u => (
              <ol key={u} className="ps-0">
                <code>{u}</code>
              </ol>
            ))}
          </ul>
        </td>
        <td className="border-0" style={{ width: '50%' }}>
          <pre className="m-0 p-0">{description}</pre>
        </td>
        <td className="border-0" style={{ width: '40%' }}>
          <pre><Card.Link href={link} target="_blank">Read More <FontAwesomeIcon icon={faExternalLinkAlt} className="ms-1" /></Card.Link></pre>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body className="p-0">
        <Table responsive className="table-centered rounded" style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
          <thead className="thead-light">
            <tr>
              <th className="border-0" style={{ width: '5%' }}>ID</th>
              <th className="border-0" style={{ width: '5%' }}>Saison</th>
              <th className="border-0" style={{ width: '5%' }}>Statut</th>
              <th className="border-0" style={{ width: '5%' }}>Actions</th>
          {/* <th className="border-0" style={{ width: '50%' }}>Description</th>
              <th className="border-0" style={{ width: '40%' }}>Extra</th> */}
            </tr>
          </thead>
          <tbody>
          {state.map((person) => (
        <><tr>
              <td className="border-0 ">{person.id}</td>
              <td className="border-0 ">{person.Seasons}</td>
              <td className="border-0 "> 
              {(() => {
                switch (person.activated) {
                  case     false: return  <FontAwesomeIcon icon={faBellSlash} color={"red"}  /> ;
                  case     true:  return <FontAwesomeIcon icon={faBell} color={"green"}  />;
                  default:        return "--";
                }
              })()}    
              </td><td className="border-0 "><Button onClick={(e) => setActivated(
                axios.put(`activate_season/${person.id}/`,{ headers : {'Content-Type': 'multipart/form-data','Authorization':  `TOKEN ${token}`,
                'Access-Control-Allow-Origin':'Accept'}})
                .then(response => {
                  console.log("deleted successfully!")
                  window.location.reload(false);
                })
                .catch(error => {
                  console.log("Something went wrong", error)
                })
              )}>Activé</Button> &nbsp;



               {/* <Button variant="primary" className="my-0" >Modifier</Button>*/}
               </td> 
              
              {/* <td className="border-0 "> <Button variant="primary" className="my-0" onClick={() => setShowDefault(true)}>Details {person.id}</Button></td>

              <React.Fragment>

                <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
                  <Modal.Header>
                    <Modal.Title className="h6"> {person.id}</Modal.Title>
                    <Button variant="close" aria-label="Close" onClick={handleClose} />
                  </Modal.Header>
                  <Modal.Body>
                 {person.cin}
                    <p>With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.</p>
                    <p>The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.</p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      I Got It
                    </Button>
                    <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </React.Fragment> */}
              {/* </> ))} */}
            </tr></>))}
      
            {/* {pageRanking.map(r => <TableRow key={`ranking-${r.id}`} {...r} />)} */}
          </tbody>
          {/* <tbody>
            {commands.map(c => <TableRow key={`command-${c.id}`} {...c} />)}
          </tbody> */}
        </Table>
      </Card.Body>
    </Card>
  );
};
export const LigueTable = () => {
  const [state,setState]=useState([])
    useEffect(() => {
      axios.get(LIGUE_URL)
      .then(res => {
        const ligue=res.data;
        console.log(ligue);
        setState(ligue);
        // if(saison.activated ===false){
        //   state("Disactive")
        //  } else {
        //   state("Activé")

        //  }
    
    })},[])
  const TableRow = (props) => {
    const { name, usage = [], description, link } = props;

    
    return (
      <tr>
        <td className="border-0" style={{ width: '5%' }}>
          <code>{name}</code>
        </td>
        <td className="fw-bold border-0" style={{ width: '5%' }}>
          <ul className="ps-0">
            {usage.map(u => (
              <ol key={u} className="ps-0">
                <code>{u}</code>
              </ol>
            ))}
          </ul>
        </td>
        <td className="border-0" style={{ width: '50%' }}>
          <pre className="m-0 p-0">{description}</pre>
        </td>
        <td className="border-0" style={{ width: '40%' }}>
          <pre><Card.Link href={link} target="_blank">Read More <FontAwesomeIcon icon={faExternalLinkAlt} className="ms-1" /></Card.Link></pre>
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Body className="p-0">
        <Table responsive className="table-centered rounded" style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>
          <thead className="thead-light">
            <tr>
              <th className="border-0" style={{ width: '5%' }}>ID</th>
              <th className="border-0" style={{ width: '5%' }}>Ligue</th>
              <th className="border-0" style={{ width: '5%' }}>Actions</th>
          {/* <th className="border-0" style={{ width: '50%' }}>Description</th>
              <th className="border-0" style={{ width: '40%' }}>Extra</th> */}
            </tr>
          </thead>
          <tbody>
          {state.map((person) => (
        <><tr>
              <td className="border-0 ">{person.id}</td>
              <td className="border-0 ">{person.name}</td>
              <td className="border-0 "> <Button variant="primary" className="my-0" >Modifier</Button></td>
              
              {/* <td className="border-0 "> <Button variant="primary" className="my-0" onClick={() => setShowDefault(true)}>Details {person.id}</Button></td>

              <React.Fragment>

                <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
                  <Modal.Header>
                    <Modal.Title className="h6"> {person.id}</Modal.Title>
                    <Button variant="close" aria-label="Close" onClick={handleClose} />
                  </Modal.Header>
                  <Modal.Body>
                 {person.cin}
                    <p>With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.</p>
                    <p>The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.</p>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      I Got It
                    </Button>
                    <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </React.Fragment> */}
              {/* </> ))} */}
            </tr></>))}
      
            {/* {pageRanking.map(r => <TableRow key={`ranking-${r.id}`} {...r} />)} */}
          </tbody>
          {/* <tbody>
            {commands.map(c => <TableRow key={`command-${c.id}`} {...c} />)}
          </tbody> */}
        </Table>
      </Card.Body>
    </Card>
  );
};