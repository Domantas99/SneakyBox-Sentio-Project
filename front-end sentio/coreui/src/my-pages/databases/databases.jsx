import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Table } from 'reactstrap';
import { deleteDatabase, fetchUserDatabases } from '../../services/redux/actions/databases-actions';



function Databases({userId, databases, getUserDatabases, deleteDb}) {
    const history = useHistory();
    
    useEffect(()=>{  
        debugger
        getUserDatabases(userId)
     }, [])

    function onViewDbMetricsMetricClick(dbId) {
        history.push(`/databases/${dbId}/metrics`)
    }

    function onDeleteDatabaseClick(dbId) {      
        deleteDb(dbId);
    }

    return (
        
        <div>
{console.log(databases)}
            
            <Col xs="8" lg="8">
            <Card>
              <CardHeader>
                 <h3>Select database to create new metric</h3>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                  <tr>
                    <th>Database name</th>
                    <th>Database Type</th>
                    <th>Select</th>
                    <th>Edit</th>
                    <th>Remove</th>
                  </tr>
                  </thead>
                  <tbody>
                    {
                        databases && databases.map((db, index) => (
                            <tr key={db.id} className="tableRow">
                                <td>{ db.databaseName }</td>
                                <td> MSSQL</td>
                                <td> 
                                    <Button onClick={() => onViewDbMetricsMetricClick(db.id)} color="success"><i className="cui-layers icons px-4"></i></Button> </td>
                                   <td> <Button className="px-3"color="warning"><i className="cui-pencil icons"></i></Button> </td>
                                   <td>   <Button className="px-3" onClick={() => onDeleteDatabaseClick(db.id)} color="danger"><i className="cui-trash icons ="></i></Button></td>
                                
                                {/* <td> 
                                    <Button onClick={() => onViewDbMetricsMetricClick(db.id)} color="success"><i className="cui-layers icons px-2"></i></Button> 
                                    <Button className="ml-1"color="warning"><i className="cui-pencil icons"></i></Button> 
                                    <Button className="ml-1" onClick={() => onDeleteDatabaseClick(db.id)} color="danger"><i className="cui-trash icons ="></i></Button>
                                </td> */}
                            </tr>
                        ))
                    } 
                  {/* <tr>
                    <td>Yiorgos Avraamu</td>
                    <td>2012/01/01</td>
                    <td>Member</td>
                    <td>
                      <Badge color="success">Active</Badge>
                    </td>
                  </tr> */}
                  
                  {/* <tr>
                    <td>Agapetus Tadeáš</td>
                    <td>2012/01/21</td>
                    <td>Staff</td>
                    <td>
                      <Badge color="success">Active</Badge>
                    </td>
                  </tr> */}
                  </tbody>
                </Table>
                <Pagination>
                  <PaginationItem disabled><PaginationLink previous tag="button">Prev</PaginationLink></PaginationItem>
                  <PaginationItem active>
                    <PaginationLink tag="button">1</PaginationLink>
                  </PaginationItem>
                  <PaginationItem><PaginationLink tag="button">2</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">3</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink tag="button">4</PaginationLink></PaginationItem>
                  <PaginationItem><PaginationLink next tag="button">Next</PaginationLink></PaginationItem>
                </Pagination>
              </CardBody>
            </Card>
          </Col>



        </div>
    )
}

function mapStateToProps( state) {
    console.log(state, 'cia tas state pries seta')

    return {
    userId: state.user.id,
    databases: state.databases.databases
    }
}

const mapDispatchToProps = dispatch => ({
    getUserDatabases: uid => dispatch(fetchUserDatabases(uid)),
    deleteDb: dbId => dispatch(deleteDatabase(dbId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Databases)