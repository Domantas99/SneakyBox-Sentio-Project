import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DatabaseMetricsAPI } from '../../services/backend-urls';
import { connect } from 'react-redux';
import { fetchDbMetrics } from '../../services/redux/actions/metrics-actions';

import { Button, Card, CardBody, CardHeader, Col, Table } from 'reactstrap';
function DatabaseMetrics(props) {
    const dbId = props.match.params.dbId;

    useEffect(() => {
        props.getMetrics(dbId)
    },[])

    return (

        <div>
          { console.log(props,'cia props')}
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

const mapStateToProps = state => ({ state });
const mapDispatchToProps = dispatch => ({
  getMetrics: dbId => dispatch(fetchDbMetrics(dbId))
});

export default connect(mapStateToProps, mapDispatchToProps)(DatabaseMetrics)