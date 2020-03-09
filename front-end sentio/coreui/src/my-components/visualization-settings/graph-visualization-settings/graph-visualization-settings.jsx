import React from 'react'
import { connect } from 'react-redux';
import { FormGroup, Label, Button, Card, CardBody, CardHeader, Col, Table, Input } from 'reactstrap';
import { AddNewPanelAPI } from '../../../services/backend-urls';

function GraphVisualizationSettings(props) {
    const panelOptions = props.panelOptions;
    let metrics = props.panelOptions.panelMetrics
    let name = '';
    let arr = [];
    debugger;
    metrics.forEach(
      m => arr.push({TrackableQueryId: m.id, Legend: m.name})
    )

    function onNameChange(value) {
      name = value;
    }

    function onLegendChange(metricId, value) {
      const element = arr.find(el => el.TrackableQueryId === metricId);  
      const index = arr.indexOf(element);
      arr[index].Legend = value;
      
    }

    function onSubmit() {
      debugger;
      const panelObj = JSON.stringify({
        Legend: name,
        PanelQueries: arr,
        PanelType: 'graph'
      });
      debugger;
      fetch(AddNewPanelAPI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: panelObj
      }).then(res => console.log(res))
      

    }


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
                    <Input onChange={(e) => onNameChange(e.target.value)}></Input>
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
                      <tr key={index}>
                        <td>{metric.name}</td>
                        <td>{metric.operationType}</td>                
                        <td>
                          <Input onChange={(e) => onLegendChange(metric.id, e.target.value) }></Input>
                        </td> 
                        {/* <td><Input className="col-sm"></Input></td>                      */}
                        {/* <td><Input className="col-sm"></Input></td>                      */}
                      </tr>
                    )) }
                  </tbody>
                </Table>         
              </CardBody>
            </Card>          
              <Button onClick={() => onSubmit()}>Finish</Button>       
            </Col>       
        </div>
    )
}

const mapStateToProps = state => ({ panelOptions: state.tempPanelOptions })
const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(GraphVisualizationSettings)