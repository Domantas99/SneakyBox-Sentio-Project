import React, {useState, useEffect} from 'react'
import Tables from '../../Base/Tables/Tables';
import DbTable from '../../MyComponents/dbTable/dbTable';
//import {tempUserID, UserDatabasesAPI } from '../../../services/backend-urls';
import { connect } from 'react-redux';
import { fetchUser } from '../../../services/redux/actions/user-actions';
import { fetchUserDatabases, deleteDatabase } from '../../../services/redux/actions/databases-actions';
import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';

function Databases({userId, databases, getUserDatabases, deleteDatabase}) {
    const[DbTables, setDbTables] = useState([]);
    
    useEffect(()=> {
        getUserDatabases(userId)
    }, [])

    
    return (
        <div >
           {console.log(databases, 'cia databases')}

         <div  className="d-flex justify-content-around" >
        <Col xs={12} sm={12} md={8} lg={8} >
            <Card>
              <CardHeader>    
                <div class="d-flex mb-3">
                    
                    <div class="p-2 "><i className="fa fa-align-justify"></i> </div>
                    <div class="p-2 ">Databases Table</div>
                    <div class="ml-auto  "><button type="button" class="btn btn-success">Add new database</button></div>            
                </div>

              </CardHeader>
              
              <CardBody>
                <Table responsive>
                  <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th></th>
                    <th></th>
                    <th></th>
                   
                  </tr>
                  </thead>
                  <tbody>
                  {
                      
                   databases && databases.map(db => (
                      <tr>
                        <td className="align-middle">{ db.databaseName }</td>    
                        { 
                            db.databaseType ===0 ? <td className="align-middle" >MSSQL</td > : <td className="align-middle">Other SQL</td>                  
                        } 
                        <td className="align-middle">
                           
                        </td>
                        <td >
                           
                        </td>
                        <td className="align-right">
                            <button type="button" class="btn btn-primary">Add new metric</button> 
                            <button type="button" class="btn btn-danger">Remove</button></td>
                      </tr>
                  )) }
                  
                 
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
    userId: state.user.id,
    databases: state.databases.databases
})
const mapDispatchToProps = dispatch => ({
    getUserDatabases: uid => dispatch(fetchUserDatabases(uid)),
    deleteDb: dbId => dispatch(deleteDatabase(dbId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Databases)