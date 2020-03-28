import React, {useEffect} from 'react'
import { connect } from 'react-redux';
import { Link, useHistory} from 'react-router-dom';
import { FormGroup, Label, Button, Card, CardBody, CardHeader, Col, Table, Input } from 'reactstrap';
import { setPanelOptionsAction, handleMetricCheckboxChange, handleVisualizationChange } from '../../../services/redux/actions/tempPanelOptions-actions';
import { fetchDbMetrics } from '../../../services/redux/actions/metrics-actions';
import './metrics-selection.scss';
//import { handleCheckBoxChange } from '../../../services/redux/actions/tempProperties-actions';

function MetricSelection(props) {
    const dbId = props.match.params.dbId;
    const panelId = props.match.params.panelId;
    const metrics = props.metrics.metrics;
    const panel = props.editablePanel;
    const history = useHistory();

    useEffect(() => {
      props.getMetrics(dbId)
      if(panel.visualization === 'No Option' || panel.visualization === '') {
        const panelToFilter = props.panels.find(x=> x.id === panelId);
        props.setInitOptions(metrics, panelToFilter);
      }
    },[])
    

    function onVisualizationChange(value) {
      props.changeVisualization(value);
    }

    function onCheckBoxClick(metric) {
      props.handleCheckbox(metric);
    }

    function onSubmit() {
      if (panel.visualization !== 'No Option') {
          if(panelId) {
            history.push(`/databases/${dbId}/panels/edit/${panelId}/metric-selection/visualization-settings`);
          } else {
            history.push(`/databases/${dbId}/panels/creation/metric-selection/visualization-settings`);
          }
      } else {
        alert('Please select visualization option');
      }
    }

    return (
        <div>                                          
            <Card>
              <CardHeader>
                 <h3>Select what metrics you would like to see in your panel</h3>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                    <tr>
                      <th>Metric name</th>
                      <th>Operation Type</th>  
                      <th className="select-option">Selected</th>              
                    </tr>
                  </thead>
                  <tbody>
                    {  panel.options && panel.options.map((metric, index) => (
                      <tr key={metric.id}>
                        <td>{metric.name}</td>
                        <td>{metric.operationType}</td>                
                        <td className="select-option">
                          <Input defaultChecked={metric.include} onClick={() => onCheckBoxClick(metric)} type="checkbox"></Input>
                        </td>                      
                      </tr>
                    )) }
                  </tbody>
                </Table>         
              </CardBody>
            </Card>
            <Label>Select what visualization you would like to see </Label>
            <FormGroup>
              <Input value={panel.visualization} onChange={(e) => onVisualizationChange(e.target.value)} type="select">
                <option value="No Option">No option</option>
                <option value="graph">Graph</option>                          
                <option value="stat">Singlestat</option>                          
                <option value="gauge">Gauge</option>                          
                <option value="bar gauge">Bar Gauge</option>                          
              </Input>  
            </FormGroup>
            <Link>
              <Button color="primary" onClick={() => onSubmit()}>Go to visualization settings</Button>
            </Link>    
        </div>      
    )
}

const mapStateToProps = state => ({ 
                                    metrics: state.metrics,
                                    panels: state.panels.panels,
                                    editablePanel: state.tempPanelOptions
                                  });
const mapDispatchToProps = dispatch => ({
  getMetrics: dbId => dispatch(fetchDbMetrics(dbId)),
  handleCheckbox: metric => dispatch(handleMetricCheckboxChange(metric)),
  changeVisualization: value => dispatch(handleVisualizationChange(value)),
  setInitOptions: (allMetrics, panelToFilter) => dispatch(setPanelOptionsAction(allMetrics, panelToFilter))
 });

export default connect(mapStateToProps, mapDispatchToProps)(MetricSelection)