import React from 'react'

import { Button, Card, CardBody, CardHeader, Col, Table } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function DatabasePanels(props) {
    const dbId = props.match.params.dbId;


    return (

        <div>
          { console.log(props,'cia props')}
            <Col xs="6" lg="6">
                
                <Link to={`/databases/${dbId}/panels/creation/metric-selection`}>
                    <Button color="success">Create new panel</Button>
                </Link>
                
            <Card>
              <CardHeader>
                 <h3>Panels</h3>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                        <th>Panel name</th>
                        <th>Queries count</th>  
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
    )
}
