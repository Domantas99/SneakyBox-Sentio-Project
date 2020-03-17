import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchDashboards  } from '../../services/redux/actions/dashboards-actions';
import { Button, Card, CardBody, CardHeader, Col, Table } from 'reactstrap';
import { Link } from 'react-router-dom';

function Dashboards(props) {
    const userId = props.user.id;
    const dashboards = props.dashboards;
    
    useEffect(() => {
        props.getDashboards(userId)
    }, [])


    return (
        <div>
            {console.log(props, "cia db dashboards")}
            <h1>Welcome to dashboards list page</h1>
            {/* There will be displayed list of created dashboards, and you will be able to create one */}
            <Col xs="6" lg="6">
                
                <Link to={`/databases`}>
                    <Button color="success">Create new dashboard</Button>
                </Link>
                
            <Card>
              <CardHeader>
                 <h3>Panels</h3>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                        <th>Dashboard Name</th>
                        <th>Database Name</th>  
                        <th>Edit</th>  
                        <th>Remove</th>  
                    </tr>
                  </thead>
                  <tbody>
                    {
                      dashboards.map(dashboard => <tr>
                        <td>{ dashboard.name }</td>
                        <td>{ dashboard.database.databaseName }</td>
                        <td>
                          <Button className="px-3" color="warning"><i className="cui-pencil icons"></i></Button>
                        </td>
                        <td>
                          <Button className="px-3" color="danger"><i className="cui-trash icons"></i></Button>
                        </td>
                      </tr>)
                    }
                  </tbody>
                </Table>         
              </CardBody>
            </Card>
            </Col>       
        
        </div>
    )
}



const mapStateToProps = state => ({
    user: state.user,
    dashboards: state.dashboards.dashboards
});
const mapDispatchToProps = dispatch => ({
    getDashboards: userId => dispatch(fetchDashboards(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboards);