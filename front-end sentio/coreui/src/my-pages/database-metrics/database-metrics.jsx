import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DatabaseMetricsAPI } from '../../services/backend-urls';
import { connect } from 'react-redux';
import { fetchDbMetrics, DeleteMetric } from '../../services/redux/actions/metrics-actions';
// reikes padaryt kad atfiltroutu metric pagal db id
import { Button, Card, CardBody, CardHeader, Col, Table } from 'reactstrap';
function DatabaseMetrics(props) {
    const dbId = props.match.params.dbId;
    const metrics = props.metrics.metrics
    useEffect(() => {
        props.getMetrics(dbId)
    },[])

    function onDeleteMetricClick(metricId) {
      //props.panels.find(panel => panel)
      props.deleteMetric(metricId)
    }

    return (
        <div> 
            <Card>
              <CardHeader className="container-header">
                  <div>
                    <h3>Metrics</h3>
                  </div>
                  <div>
                    <Link to={`/databases/${dbId}/metrics/first-step`}>
                      <Button color="success">Create new metric</Button>
                    </Link>
                 </div>
              </CardHeader>
              <CardBody>
                <Table className="container__table"  responsive>
                  <thead>
                    <tr className="container__table-row">
                        <th className="container__table-row-text">Metric name</th>
                        <th className="container__table-row-text">Operation Type</th>  
                        <th className="container__table-row-action">Edit</th>  
                        <th className="container__table-row-action">Remove</th>  
                    </tr>
                  </thead>
                  <tbody>
                    { metrics && metrics.map((metric, index) => (
                      <tr key={index}>
                        <td className="container__table-row-text">{metric.name}</td>
                        <td className="container__table-row-text">{metric.operationType}</td>                
                        <td className="container__table-row-action"><Button className="px-3"  color="warning"><i className="cui-pencil icons"></i></Button></td>
                        <td className="container__table-row-action"><Button className="px-3" onClick={() => onDeleteMetricClick(metric.id)} color="danger"><i className="cui-trash icons"></i></Button></td>
                      </tr>
                    )) }
                  </tbody>
                </Table>         
              </CardBody>
            </Card>    
        </div>
    )
}

const mapStateToProps = state => ({ 
  metrics: state.metrics, 
  panels: state.panels.panels
});
const mapDispatchToProps = dispatch => ({
  getMetrics: dbId => dispatch(fetchDbMetrics(dbId)),
  deleteMetric: metricId => dispatch(DeleteMetric(metricId))
  
});

export default connect(mapStateToProps, mapDispatchToProps)(DatabaseMetrics)