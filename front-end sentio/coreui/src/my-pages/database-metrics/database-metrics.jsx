import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DatabaseMetricsAPI } from '../../services/backend-urls';

import { Button, Card, CardBody, CardHeader, Col, Table } from 'reactstrap';
export default function DatabaseMetrics(props) {
    const dbId = props.match.params.dbId;

    useEffect(() => {
      fetch(DatabaseMetricsAPI + dbId).then(res => res.json()).then(json => console.log(json, 'cia json'));
    },[])

    return (

        <div>
            <Col xs="6" lg="6">
                <Link to={`/databases/${dbId}/metrics/first-step`}>
                    <Button color="success">Create new metric</Button>
                </Link>
                             
            <Card>
              <CardHeader>
                 <h3>Metrics</h3>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                        <th>Metric name</th>
                        <th>Action</th>  
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
