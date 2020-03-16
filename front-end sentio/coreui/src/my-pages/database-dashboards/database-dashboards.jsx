import React, { useEffect } from 'react'
import { FormGroup, Label, Button, Card, CardBody, CardHeader, Col, Table, Input } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchDashboards, deleteDashboard } from '../../services/redux/actions/dashboards-actions';

function DatabaseDashboards(props) {
    const dbId = props.match.params.dbId;
    const userId = props.user.id;
    debugger;
    const dashboards = props.dashboards.dashboards; //(!props.dashboards.isFetching && !props.dashboards.error) ? props.dashboards.dashboards.filter(x=> x.databaseId === dbId) : [];
    useEffect(() => {
      debugger
      props.getDashboards(userId)
    }, []) 

    function onDeleteDashboardClick(dashboardId){
      props.deleteDashboard(dashboardId);
    }
    
    return (
        <div>
            <h1>Database dashboards</h1>
            <div>
          { console.log(props,'cia props')}
            <Col xs="6" lg="6">
                <Link to={`/databases/${dbId}/dashboards/create`}>
                    <Button color="success">Create new Dashboard</Button>
                </Link>
                
            <Card>
              <CardHeader>
                 <h3>Database Dashboards</h3>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                        <th>Dashboard Name</th>
                        <th>Panels Count</th>  
                        <th>Edit</th>  
                        <th>Remove</th>  
                    </tr>
                  </thead>
                  <tbody>
                    {
                      dashboards.map(d => (
                        <tr>
                          <td>{d.name}</td>
                          <td>{d.dashboardPanels.length}</td>
                          <td><Button className="px-3"  color="warning"><i className="cui-pencil icons"></i></Button></td>
                          <td><Button className="px-3" onClick={() => onDeleteDashboardClick(d.id)} color="danger"><i className="cui-trash icons"></i></Button></td>
                        </tr>
                      ))
                    }
                  </tbody>
                </Table>         
              </CardBody>
            </Card>
            </Col>       
        </div>
        </div>
    )
}
const mapStateToProps = state => ({ 
  user: state.user,
  dashboards: state.dashboards,
  state
})
const mapDispatchToProps = dispatch => ({
  getDashboards: userId => dispatch(fetchDashboards(userId)),
  deleteDashboard: dashboardId => dispatch(deleteDashboard(dashboardId))
})

export default connect(mapStateToProps, mapDispatchToProps)(DatabaseDashboards)