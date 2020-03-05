import React from 'react'
import { connect } from 'react-redux';
import { FormGroup, Label, Button, Card, CardBody, CardHeader, Col, Table, Input } from 'reactstrap';


function GraphVisualizationSettings(props) {
    const panelOptions = props.panelOptions;
    let metrics = props.panelOptions.panelMetrics
    return (
        <div>
            GraphVisualizationSettings comp

            <Col xs="9" lg="10">                                         
            <Card>
              <CardHeader>
                 <h3>Select what metrics you would like to see</h3>
              </CardHeader>
              <CardBody>
                <FormGroup>
                    <Label>Graph name</Label>
                    <Input></Input>
                </FormGroup>
                <Table responsive>
                  <thead>
                    <tr>
                        <th>Metric name</th>
                        <th>Operation Type</th>  
                        <th>Legend Name</th>              
                        {/* <th>Size Y px</th>               */}
                        {/* <th>Size X px</th>               */}
                    </tr>
                  </thead>
                  <tbody>
                    { metrics && metrics.map((metric, index) => (
                      <tr onChange={(e) => console.log(e.target)} key={index}>
                        <td>{metric.name}</td>
                        <td>{metric.operationType}</td>                
                        <td>
                          <Input></Input>
                        </td> 
                        {/* <td><Input className="col-sm"></Input></td>                      */}
                        {/* <td><Input className="col-sm"></Input></td>                      */}
                      </tr>
                    )) }
                  </tbody>
                </Table>         
              </CardBody>
            </Card>          
              <Button>Finish</Button>
            
            </Col>       
        </div>
    )
}

const mapStateToProps = state => ({ panelOptions: state.tempPanelOptions })
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(GraphVisualizationSettings)