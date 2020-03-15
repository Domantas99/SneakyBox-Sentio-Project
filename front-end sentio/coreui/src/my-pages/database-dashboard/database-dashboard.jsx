import React from 'react'
import { Link } from 'react-router-dom';
import { Button, Badge, Card, CardBody, CardHeader, Col, ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText, Row, TabContent, TabPane } from 'reactstrap';


// database dashboard to view data
import './database-dashboard.scss';
export default function DatabaseDashboard(props) {
    const dbId = props.match.params.dbId
    return (
        <div className="db-dash-container">
            <div>
                
                <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i><strong>Metrics</strong>
                {/* <div className="card-header-actions"> */}
                <Link to={`/databases/${dbId}/metrics`}>
                    <Button color="success">View More Data</Button>
                </Link>
                {/* </div> */}
              </CardHeader>
              <CardBody>
                <ListGroup>
                  <ListGroupItem>Cras justo odio</ListGroupItem>
                  <ListGroupItem>Dapibus ac facilisis in</ListGroupItem>
                  <ListGroupItem>Morbi leo risus</ListGroupItem>
                  <ListGroupItem>Porta ac consectetur ac</ListGroupItem>
                  <ListGroupItem>Vestibulum at eros</ListGroupItem>
                </ListGroup>
              </CardBody>
            </Card>

            </div>
            <div>
                <Link to={`/databases/${dbId}/panels`}>
                    <Button color="success">View Panels</Button>
                </Link>
            </div>
            <div>
                <Link to={`/databases/${dbId}/dashboards`}>
                    <Button color="success">View Dashboards</Button>
                </Link>
            </div>
        </div>
    )
}
