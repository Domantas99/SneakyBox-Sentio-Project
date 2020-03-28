import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchDashboards, deleteDashboard } from '../../services/redux/actions/dashboards-actions';
import { Button, Card, CardBody, CardHeader, Col, Table } from 'reactstrap';
import { Link } from 'react-router-dom';

function Dashboards(props) {
    const userId = props.user.id;
    const dashboards = props.dashboards;
    
    useEffect(() => {
        props.getDashboards(userId)
    }, [])

    function onDeleteDashboardClick(dashboardId){
      props.deleteDashboard(dashboardId);
    }

    return (
        <div>
            <Card>
              <CardHeader className="container-header">
                <div>
                 <h3>All Dashboards</h3>
                </div>
                <div>
                  <Link to={`/databases`}>
                    <Button color="success">Create new dashboard</Button>
                  </Link>
                </div>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                        <th className="container__table-row-text">Dashboard Name</th>
                        <th className="container__table-row-text">Database Name</th>  
                        <th className="container__table-row-action">Edit</th>  
                        <th className="container__table-row-action">Remove</th>  
                    </tr>
                  </thead>
                  <tbody>
                    {
                      dashboards.map(dashboard => <tr key={dashboard.id}>
                        <td className="container__table-row-text">{ dashboard.name }</td>
                        <td className="container__table-row-text">{ dashboard.database.databaseName }</td>
                        <td className="container__table-row-action">
                          <Link to={`/databases/${dashboard.databaseId}/dashboards/${dashboard.id}/edit`}>
                            <Button className="px-3" color="warning"><i className="cui-pencil icons"></i></Button>
                          </Link>
                        </td>
                        <td className="container__table-row-action">
                          <Button onClick={() => onDeleteDashboardClick(dashboard.id)} className="px-3" color="danger"><i className="cui-trash icons"></i></Button>
                        </td>
                      </tr>)
                    }
                  </tbody>
                </Table>         
              </CardBody>
            </Card>  
        </div>
    )
}

const mapStateToProps = state => ({
    user: state.user,
    dashboards: state.dashboards.dashboards
});
const mapDispatchToProps = dispatch => ({
    getDashboards: userId => dispatch(fetchDashboards(userId)),
    deleteDashboard: dashboardId => dispatch(deleteDashboard(dashboardId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboards);