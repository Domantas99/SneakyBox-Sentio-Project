import React, { useEffect } from 'react'
import { FormGroup, Label, Button, Card, CardBody, CardHeader, Col, Table, Input } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchDashboards, deleteDashboard } from '../../services/redux/actions/dashboards-actions';
import linkToGrafana from '../../services/grafana/grafana';
import './database-dashboards.scss';
import { fetchAllPanels } from '../../services/redux/actions/panel-actions';

function DatabaseDashboards(props) {
    const dbId = props.match.params.dbId;
    const userId = props.user.id;
    const dashboards = props.dashboards.dashboards.filter(x=>x.databaseId === dbId);

    useEffect(() => {
      props.getDashboards(userId);
      props.getPanels(userId);
    }, []) 

    function onDeleteDashboardClick(dashboardId){
      props.deleteDashboard(dashboardId);
    }
    
    function goToGrafana(databaseId, dashboardId) {
      linkToGrafana(databaseId, dashboardId).then(res => res.json())
        .then(json=> {
          debugger
          if(json.isValid) {
            window.open("http://localhost:3000/dashboard/import");
          }
          else {
            alert("There was an error:" + json.message);
          }
        });
    }

    return (
            <div>      
              <Card>
                <CardHeader className="container-header">
                  <div>
                    <h3>Database Dashboards</h3>
                  </div>
                  <div>
                    <Link to={`/databases/${dbId}/dashboards/create`}>
                      <Button color="success">Create new Dashboard</Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardBody>
                  <Table className="container__table" responsive>
                    <thead>
                      <tr>
                          <th className="container__table-row-text">Dashboard Name</th>
                          <th className="container__table-row-action">Panels Count</th>  
                          <th className="container__table-row-action">Grafana</th>  
                          <th className="container__table-row-action">Edit</th>  
                          <th className="container__table-row-action">Remove</th>  
                      </tr>
                    </thead>
                    <tbody>
                      {
                        dashboards.map(d => (
                          <tr key={d.id}>
                            <td className="container__table-row-text">{d.name}</td>
                            <td className="container__table-row-action">{d.dashboardPanels.length}</td>
                            <td className="container__table-row-action">
                            {/* <Link to={`/databases/${dbId}/dashboards/${d.id}/edit`}> */}
                                <Button onClick={() => goToGrafana(d.databaseId, d.id)} color="primary">
                                    View Grafana
                                </Button>
                              {/* </Link> */}
                            </td>
                            <td  className="container__table-row-action">
                              <Link to={`/databases/${dbId}/dashboards/${d.id}/edit`}>
                                <Button className="px-3"  color="warning">
                                  <i className="cui-pencil icons"></i>
                                </Button>
                              </Link>
                            </td>
                            <td  className="container__table-row-action">
                              <Button className="px-3" onClick={() => onDeleteDashboardClick(d.id)} color="danger">
                                <i className="cui-trash icons"></i>
                              </Button>
                            </td>
                          </tr>
                        ))
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
  dashboards: state.dashboards,
  state
})
const mapDispatchToProps = dispatch => ({
  getDashboards: userId => dispatch(fetchDashboards(userId)),
  deleteDashboard: dashboardId => dispatch(deleteDashboard(dashboardId)),
  getPanels: userId => dispatch(fetchAllPanels(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(DatabaseDashboards)