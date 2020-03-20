import React, {useEffect, useState} from 'react'
import { AllMetricsAPI } from '../../services/backend-urls';
import { Button, Card, CardBody, CardHeader, Col, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { DeleteMetric } from '../../services/redux/actions/metrics-actions';
import { connect } from 'react-redux';

function AllMetrics(props) {
    const[metrics, setMetrics] = useState([]);
    const userId = props.user.id;
    // reikes padaryt kad rodytu metric pagal user id
    // reikes padaryt kad pridetu visas metricas, o db metrics atfiltroutu metric pagal db id
    useEffect(() => {
        fetch(AllMetricsAPI + userId, {
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
                
            <Card>
              <CardHeader className="container-header">
                 <div>
                   <h3>Metrics</h3>
                  </div>
                 <div>
                  <Link to={`/databases`}>
                    <Button color="success">Create new metric</Button>
                  </Link>
                 </div>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                        <th className="container__table-row-text">Metric Name</th>
                        <th className="container__table-row-text">Database Name</th>
                        <th className="container__table-row-text">Database Type</th>
                        <th className="container__table-row-text">Operation Type</th>  
                        <th className="container__table-row-action">Edit</th>  
                        <th className="container__table-row-action">Remove</th>  
                    </tr>
                  </thead>
                  <tbody>
                    { metrics && metrics.map((metric, index) => (
                      <tr key={index}>
                        <td className="container__table-row-text">{metric.name}</td>
                        <td className="container__table-row-text">{metric.database.databaseName}</td>
                        <td className="container__table-row-text">MSSQL</td>
                        <td className="container__table-row-text">{metric.operationType}</td>                
                        <td className="container__table-row-action">
                          <Button className="px-3"  color="warning">
                            <i className="cui-pencil icons"></i>
                          </Button>
                        </td>
                        <td className="container__table-row-action">
                          <Button className="px-3" onClick={() => onDeleteMetricClick(metric.id)} color="danger">
                            <i className="cui-trash icons"></i>
                          </Button>
                        </td>
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
  user: state.user,
  state
});
const mapDispatchToProps = dispatch => ({
    deleteMetric: metricId => dispatch(DeleteMetric(metricId))
});

export default connect(mapStateToProps, mapDispatchToProps)(AllMetrics)