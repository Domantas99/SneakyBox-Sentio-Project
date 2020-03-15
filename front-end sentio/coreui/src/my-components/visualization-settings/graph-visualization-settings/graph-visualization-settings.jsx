import React from 'react'
import { connect } from 'react-redux';
import { FormGroup, Label, Button, Card, CardBody, CardHeader, Col, Table, Input } from 'reactstrap';
import { AddNewPanelAPI } from '../../../services/backend-urls';
import { AddNewPanel } from '../../../services/redux/actions/panel-actions';
import { useHistory } from 'react-router-dom';

function GraphVisualizationSettings(props, { dbId }) {
    const history = useHistory();
    //const panelOptions = props.panelOptions;
    let metrics = props.panelOptions.panelMetrics
    let name = '';
    let arr = [];
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
    // prideti db id
    function onSubmit() {
      const panelObj = JSON.stringify({
        Legend: name,
        PanelQueries: arr,
        PanelType: 'graph',
        DatabaseId: props.dbId
      });
      props.addPanel(panelObj)
      .then(res => {
        if(res.json.isValid) {
          history.push(`/databases/${props.dbId}/panels`);
        }
      })
    }

    return (
        <div>
            GraphVisualizationSettings comp
            <Col xs="9" lg="10">                                         
            <Card>
              { console.log(props,'cia porps gvs')}
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

const mapStateToProps = state => ({ panelOptions: state.tempPanelOptions, s:state })
const mapDispatchToProps = dispatch => ({
    addPanel: jsonObj => dispatch(AddNewPanel(jsonObj))
})

export default connect(mapStateToProps, mapDispatchToProps)(GraphVisualizationSettings)