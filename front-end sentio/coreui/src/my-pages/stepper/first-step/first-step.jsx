import React, {useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { fetchTables } from '../../../services/redux/actions/dbTables-actions';
import {  Button, Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Table, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import { Link } from 'react-router-dom';
import CreateQueryForm from '../../../my-components/create-query-form/create-query-form';
import './first-step.scss';
import { ResetTempPropertiesAction } from '../../../services/redux/actions/tempProperties-actions';

function FirstStep(props) {
    const dbId = props.match.params.dbId;
    const [tables, setTables] = useState(props.state.dbTables.Tables);
    useEffect(() => {
      props.getTables(dbId);
      props.resetSelectedOptions();
    }, [props.state.dbTables.Tables])

    function filterBySearch(filter) {
      let temp = props.state.dbTables.Tables;
      temp = temp.filter(t => t.tableName.toLowerCase().includes(filter.toLowerCase()));
      setTables(temp);
    }

    return (
        <div className="fs-container">
          <div className="fs-container__queries">   
            <Card>
              <CardHeader>
                <h5><i className="fa fa-align-justify"></i> Search </h5>
                <div> 
                  <InputGroup>
                    <Input onChange={(e) => filterBySearch(e.target.value)} id="appendedInputButton" size="10" type="text" />
                  </InputGroup>
                </div>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                  <tr>
                    <th>Table Name</th>
                    <th>Property Count</th>        
                    <th>Action</th>        
                  </tr>
                  </thead>
                  <tbody className="fs-container__queries-list">
                    {
                        tables && tables.map((table, index) => (
                            <tr key={index} className="tableRow">
                              
                                <td>{ table.tableName }</td>         
                                <td>{ table.properties.length }</td>         
                                <td>
                                    <Link to={`/databases/${dbId}/metrics/first-step/${table.id}/second-step`}><Button color="success">Select</Button></Link>
                                </td>         
                            </tr>
                        ))
                    } 
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
          {/* </Col> */}
          </div>
        
          <div className="fs-container-form">
            <CreateQueryForm dbId={dbId}></CreateQueryForm>
          </div>


        </div>
    )
}

const mapStateToProps = state => ({
    state
})
const mapDispatchToProps = dispatch => ({
    getTables: dbId => dispatch(fetchTables(dbId)),
    resetSelectedOptions: () => dispatch(ResetTempPropertiesAction())
})
export default connect(mapStateToProps, mapDispatchToProps)(FirstStep)