import React from 'react'

import { Badge, Card, CardBody, CardHeader, Col, Pagination, PaginationItem, PaginationLink, Row, Table } from 'reactstrap';


export default function DbTable({databases}) {
     
    return (
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
                  { databases.map(db => (
                      <tr>
                        <td className="align-middle">{ db.databaseName }</td>    
                        { 
                            db.databaseType ===0 ? <td className="align-middle" >MSSQL</td > : <td className="align-middle">Other SQL</td>                  
                        } 
                        <td className="align-middle">
                            <button type="button" class="btn btn-primary">Add new metric</button>
                           
                        </td>
                        <td> <button type="button" class="btn btn-danger">Remove</button></td>
                      </tr>
                  )) }
                  
                 
                  </tbody>
                </Table>
              
              </CardBody>
            </Card>
          </Col>


            
        </div>
    )
}
