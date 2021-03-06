import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Table } from 'reactstrap';
import { deleteDatabase, fetchUserDatabases } from '../../services/redux/actions/databases-actions';
import {Link} from 'react-router-dom';
import './databases.scss'

function Databases(props) {
    const history = useHistory();
    let databases = props.databases;
    const [sortReverse, setSort] = useState(false);
  
    useEffect(()=>{  
      //  getUserDatabases(userId)
        props.getUserDatabases('72c50eeb-bb66-47fa-ae1d-63eacbeb74fe')
     }, [])

    function onViewDbMetricsMetricClick(dbId) {
        history.push(`/databases/${dbId}`)
    }

    function onDeleteDatabaseClick(dbId) {      
        props.deleteDb(dbId);
    }

    function sortTable(property) {
      debugger;
      let temp = databases;
      switch (property){
        case 'databaseName':
          temp.sort((a, b) => (a.databaseName.toLowerCase() > b.databaseName.toLowerCase()) ? 1: -1);
          break;
        case 'databaseType':
          temp.sort((a, b) => (a.databaseType > b.databaseType) ? 1: -1);
          break;
        case 'dateAdded':
        default:
      }
      if(sortReverse) {
        temp.reverse();
      }
      setSort(!sortReverse);
      databases = temp;
    }

    return (
        
        <div>             
            <Card>
              <CardHeader className="container-header">
                <div>
                  <h3>Select which database's data you would like to view</h3>
                </div>
                <div>
                  <Link to="databases/creation">
                    <Button color="success">Add new database</Button>
                  </Link>
                </div>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr className="container__table-row">
                      <th className="container__table-row-text" >Database name <i onClick={() => sortTable('databaseName')} className="fa fa-sort fa-lg"></i></th>
                      <th className="container__table-row-text" >Database Type <i onClick={() => sortTable('databaseType')} className="fa fa-sort fa-lg"></i></th>
                      <th className="container__table-row-action">Select</th>
                      <th className="container__table-row-action">Remove</th>
                  </tr>
                  </thead>
                  <tbody>
                    {
                        databases && databases.map((db, index) => (
                            <tr key={db.id} className="container__table-row">
                                <td className="container__table-row-text">{ db.databaseName }</td>
                                <td className="container__table-row-text"> MSSQL</td>
                                <td className="container__table-row-action"> 
                                  <Button onClick={() => onViewDbMetricsMetricClick(db.id)} color="success"><i className="cui-layers icons px-4"></i></Button> 
                                </td>
                                <td className="container__table-row-action">  
                                  <Button className="px-3" onClick={() => onDeleteDatabaseClick(db.id)} color="danger"><i className="cui-trash icons ="></i></Button>
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

function mapStateToProps( state) {
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