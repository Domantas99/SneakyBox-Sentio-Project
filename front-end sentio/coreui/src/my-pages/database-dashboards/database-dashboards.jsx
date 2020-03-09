import React from 'react'
import { FormGroup, Label, Button, Card, CardBody, CardHeader, Col, Table, Input } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function DatabaseDashboards(props) {
    const dbId = props.match.params.dbId;

    
    return (
        <div>
            <h1>Database dashboards</h1>
            <div>
          { console.log(props,'cia props')}
            <Col xs="6" lg="6">
                
                {/* <Link to={`/databases/${dbId}/panels/creation/metric-selection`}> */}
                    <Button color="success">Create new Dashboard</Button>
                {/* </Link> */}
                
            <Card>
              <CardHeader>
                 <h3>Database Dashboards</h3>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                        <th>Database Name</th>
                        <th>Panels Count</th>  
                        <th>Edit</th>  
                        <th>Remove</th>  
                    </tr>
                  </thead>
                  <tbody>
                    
                  </tbody>
                </Table>         
              </CardBody>
            </Card>
            </Col>       
        </div>
        </div>
    )
}
