import React, {useEffect, useState} from 'react'
import { AllMetricsAPI } from '../../services/backend-urls';
import { Button, Card, CardBody, CardHeader, Col, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import { DeleteMetric } from '../../services/redux/actions/metrics-actions';
import { connect } from 'react-redux';

function AllMetrics(props) {
    const[metrics, setMetrics] = useState([]);
    const userId = props.user.id;
    const [sortReverse, setSort] = useState(false);

    useEffect(() => {
        fetch(AllMetricsAPI + userId, {
            method: 'GET'
        }).then(res=> res.json())
            .then(json => {
                if(json.isValid) {
                setMetrics(json.returnResult)
               
            }
        })
    }, [])

    function sortTable(property) {
      debugger;
      let temp = metrics;
      switch (property){
        case 'metricName':
          temp.sort((a, b) => (a.name > b.name) ? 1: -1);
          break;
        case 'databaseName':
          temp.sort((a, b) => (a.database.databaseName > b.database.databaseName) ? 1: -1);
          break;
        case 'databaseType':
          temp.sort((a, b) => (a.database.databaseType > b.database.databaseType) ? 1: -1);
          break;
        case 'operationType':
          temp.sort((a, b) => (a.operationType > b.operationType) ? 1: -1);
          break;
        case 'dataAdded':
        default:
      }
      if(sortReverse) {
        temp.reverse();
      }
      setSort(!sortReverse);
      setMetrics(temp);
    }


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
                        <th className="container__table-row-text">Metric Name <i onClick={() => sortTable('metricName')} className="fa fa-sort fa-lg"></i></th>
                        <th className="container__table-row-text">Database Name <i onClick={() => sortTable('databaseName')} className="fa fa-sort fa-lg"></i></th>
                        <th className="container__table-row-text">Database Type <i onClick={() => sortTable('databaseType')} className="fa fa-sort fa-lg"></i></th>
                        <th className="container__table-row-text">Operation Type <i onClick={() => sortTable('operationType')} className="fa fa-sort fa-lg"></i></th>  
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