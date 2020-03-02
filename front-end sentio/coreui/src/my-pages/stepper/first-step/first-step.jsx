import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { fetchTables } from '../../../services/redux/actions/dbTables-actions';
import {  Button, Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Table, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import { Link } from 'react-router-dom';

function FirstStep(props) {
    const dbId = props.match.params.dbId;
    console.log(props,'daeina i fp')
    const tables = props.state.dbTables.Tables
    useEffect(() => {
      props.getTables(dbId).then(res=> console.log(res, ' cia resas table pg', props));
    
    }, [])

    return (
        <div>
            
        <Col xs="10" lg="10">
            <Card>
              <CardHeader>
                <h5><i className="fa fa-align-justify"></i> Start creating metric by selecting table or enter your own query </h5>
                <div> 
                  <InputGroup>
                    <Input id="appendedInputButton" size="10" type="text" />
                      <InputGroupAddon addonType="append">
                        <Button color="primary">Submit</Button>
                    </InputGroupAddon>
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
                  <tbody>
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
          </Col>




        </div>
    )
}

const mapStateToProps = state => ({
    state
})
const mapDispatchToProps = dispatch => ({
    getTables: dbId => dispatch(fetchTables(dbId))
})
export default connect(mapStateToProps, mapDispatchToProps)(FirstStep)