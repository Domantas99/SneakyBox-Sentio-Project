import React from 'react'
import { connect } from 'react-redux';
import { FormGroup, Label, Button, Card, CardBody, CardHeader, Col, Table, Input } from 'reactstrap';
import { AddNewPanelAPI } from '../../../services/backend-urls';
import { AddNewPanel, UpdatePanel } from '../../../services/redux/actions/panel-actions';
import { useHistory } from 'react-router-dom';
import { handleMetricLegendChange, handlePanelNameChange } from '../../../services/redux/actions/tempPanelOptions-actions';

function GraphVisualizationSettings(props, { dbId }) {
    debugger
    const history = useHistory();
    const panel = props.panelOptions;
    const  metrics = panel.options.filter(o => o.include === true);

    function onPanelNameChange(value) {
      props.changePanelName(value);
    }

    function onLegendChange(metric, value) {
      props.changeLegend(metric, value);
    }
    // padaryt update ir add
    function onSubmit() {
      debugger;
      let arr = [];
      metrics.forEach(
        m => arr.push({TrackableQueryId: m.id, Legend: m.Legend})
      )
      const panelObj = JSON.stringify({
        PanelId: panel.id,
        Legend: panel.panelName,
        PanelQueries: arr,
        PanelType: 'graph',
        DatabaseId: props.dbId
      });

      if(panel.editing) {
        props.updatePanel(panelObj)
          .then(res => {
            if(res.json.isValid) {
              history.push(`/databases/${props.dbId}/panels`);
            }
          })
      } else {
        props.addPanel(panelObj)
          .then(res => {
            if(res.json.isValid) {
              history.push(`/databases/${props.dbId}/panels`);
            }
          })
      }
    }

    return (
        <div>
            <Col xs="9" lg="10">                                         
            <Card>
              <CardHeader>
                 <h3>Select what metrics you would like to see</h3>
              </CardHeader>
              <CardBody>
                <FormGroup>
                    <h4><Label>Graph name</Label></h4>
                    <Input value={panel.panelName} onChange={(e) => onPanelNameChange(e.target.value)}></Input>
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
                          <Input value={metric.Legend} onChange={(e) => onLegendChange(metric, e.target.value) }></Input>
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
    addPanel: jsonObj => dispatch(AddNewPanel(jsonObj)),
    updatePanel: jsonObj => dispatch(UpdatePanel(jsonObj)),
    changeLegend: (metric, value) => dispatch(handleMetricLegendChange(metric,value)),
    changePanelName: value => dispatch(handlePanelNameChange(value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(GraphVisualizationSettings)