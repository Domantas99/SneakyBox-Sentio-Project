import React, {useEffect, useState} from 'react'
import { AllMetricsAPI } from '../../services/backend-urls';
import { Button, Card, CardBody, CardHeader, Col, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { DeleteMetric } from '../../services/redux/actions/metrics-actions';
import { connect } from 'react-redux';

function AllMetrics(props) {
    const[metrics, setMetrics] = useState([]);
    // reikes padaryt kad rodytu metric pagal user id
    // reikes padaryt kad pridetu visas metricas, o db metrics atfiltroutu metric pagal db id
    useEffect(() => {
        fetch(AllMetricsAPI, {
            method: 'GET'
        }).then(res=> res.json())
            .then(json => {
                console.log(json, 'cia json')
                if(json.isValid) {
                setMetrics(json.returnResult)
               
            }
        })
    }, [])

    function onDeleteMetricClick(metricId) {
        props.deleteMetric(metricId);
    }

    return (
        <div>
            There will be displayed all created metrics from all tables
            <Col xs="6" lg="6">
                <Link to={`/databases`}>
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

const mapStateToProps = state => ({state});
const mapDispatchToProps = dispatch => ({
    deleteMetric: metricId => dispatch(DeleteMetric(metricId))
});

export default connect(mapStateToProps, mapDispatchToProps)(AllMetrics)