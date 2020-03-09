import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DatabaseMetricsAPI } from '../../services/backend-urls';
import { connect } from 'react-redux';
import { fetchDbMetrics, DeleteMetric } from '../../services/redux/actions/metrics-actions';

import { Button, Card, CardBody, CardHeader, Col, Table } from 'reactstrap';
function DatabaseMetrics(props) {
    const dbId = props.match.params.dbId;
    const metrics = props.metrics.metrics
    useEffect(() => {
        props.getMetrics(dbId)
    },[])

    function onDeleteMetricClick(metricId) {
      debugger
      props.deleteMetric(metricId)
    }

    return (

        <div>
          { console.log(props,'cia props')}
            <Col xs="6" lg="6">
                <Link to={`/databases/${dbId}/metrics/first-step`}>
                    <Button color="success">Create new metric</Button>
                </Link>
                <Link to={`/databases/${dbId}/metrics/panel-creation/metric-selection`}>
                    <Button color="success">Create new panel</Button>
                </Link>
                <Link to={`/databases/${dbId}/metrics/panel-creation/metric-selection`}>
                    <Button color="success">Create new panel</Button>
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
                        <th>Operation Type</th>  
                        <th>Edit</th>  
                        <th>Remove</th>  
                    </tr>
                  </thead>
                  <tbody>
                    { metrics && metrics.map((metric, index) => (
                      <tr key={index}>
                        <td>{metric.name}</td>
                        <td>{metric.operationType}</td>                
                        <td><Button className="px-3"  color="warning"><i className="cui-pencil icons"></i></Button></td>
                        <td><Button className="px-3" onClick={() => onDeleteMetricClick(metric.id)} color="danger"><i className="cui-trash icons"></i></Button></td>
                      </tr>
                    )) }
                  </tbody>
                </Table>         
              </CardBody>
            </Card>
         

            </Col>       
        </div>
    )
}

const mapStateToProps = state => ({ metrics: state.metrics });
const mapDispatchToProps = dispatch => ({
  getMetrics: dbId => dispatch(fetchDbMetrics(dbId)),
  deleteMetric: metricId => dispatch(DeleteMetric(metricId))
  
});

export default connect(mapStateToProps, mapDispatchToProps)(DatabaseMetrics)