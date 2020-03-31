import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { fetchDashboards, deleteDashboard } from '../../services/redux/actions/dashboards-actions';
import { Button, Card, CardBody, CardHeader, Table } from 'reactstrap';
import { Link } from 'react-router-dom';
import linkToGrafana from '../../services/grafana/grafana';

function Dashboards(props) {
    const userId = props.user.id;
    let dashboards = props.dashboards;
    const [sortReverse, setSort] = useState(false);
    useEffect(() => {
        props.getDashboards(userId)
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


    function sortTable(property) {
      debugger;
      let temp = dashboards;
      switch (property){
        case 'dashboardName':
          temp.sort((a, b) => (a.name.toLowerCase() > b.name.toLowerCase()) ? 1: -1);
          break;
        case 'databaseName':
          temp.sort((a, b) => (a.database.databaseName.toLowerCase() > b.database.databaseName.toLowerCase()) ? 1: -1);
          break;
        case 'dateAdded':
        default:
      }
      if(sortReverse) {
        temp.reverse();
      }
      setSort(!sortReverse);
      dashboards=temp;
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
                        <th className="container__table-row-text">Dashboard Name <i onClick={() => sortTable('dashboardName')} className="fa fa-sort fa-lg"></i></th>
                        <th className="container__table-row-text">Database Name <i onClick={() => sortTable('databaseName')} className="fa fa-sort fa-lg"></i></th>  
                        <th className="container__table-row-text">Grafana</th>  
                        <th className="container__table-row-action">Edit</th>  
                        <th className="container__table-row-action">Remove</th>  
                    </tr>
                  </thead>
                  <tbody>
                    {
                      dashboards.map(dashboard => <tr key={dashboard.id}>
                        <td className="container__table-row-text">{ dashboard.name }</td>
                        <td className="container__table-row-text">{ dashboard.database.databaseName }</td>
                        <td className="container__table-row-text">
                          <Button color="primary" onClick={() => goToGrafana(dashboard.databaseId, dashboard.id)}>View Grafana</Button>
                        </td>
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