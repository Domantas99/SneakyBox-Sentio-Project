import React, {useState} from 'react'
import { connect } from 'react-redux';
import { Link, useHistory} from 'react-router-dom';
import { FormGroup, Label, Button, Card, CardBody, CardHeader, Col, Table, Input } from 'reactstrap';
import { setPanelOptionsAction } from '../../../services/redux/actions/tempPanelOptions-actions';

function MetricSelection(props) {
    const dbId = props.match.params.dbId;
    const metrics = props.metrics.metrics
    
    const history = useHistory();
    
    
    let visualization='No Option';
    let selectedMetrics = [];

    function onVisualizationChange(value) {
      // jeigu yra state tai nusiresetina
      visualization = value
    }

    function onCheckBoxClick(metric) {
      debugger;
      const index = selectedMetrics.indexOf(metric);
      if(index > -1) {
        selectedMetrics.splice(index, 1);
      } else {
        selectedMetrics.push(metric)
      }
      console.log(selectedMetrics, 'cia toks');
    }

    function onSubmit() {
      console.log(selectedMetrics)
      debugger;
      if(visualization !== 'No Option') {
      const obj = {
        visualization: visualization,
        panelMetrics: selectedMetrics
      };
      
      props.setOptions(obj);
      history.push(`/databases/${dbId}/metrics/panel-creation/metric-selection/visualization-settings`);
      } else {
        alert('Please select visualization option');
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
                <Table responsive>
                  <thead>
                    <tr>
                        <th>Metric name</th>
                        <th>Operation Type</th>  
                        <th>Selected</th>              
                    </tr>
                  </thead>
                  <tbody>
                    { metrics && metrics.map((metric, index) => (
                      <tr key={index}>
                        <td>{metric.name}</td>
                        <td>{metric.operationType}</td>                
                        <td>
                          <Input onClick={() => onCheckBoxClick(metric)} type="checkbox"></Input>
                        </td>                      
                      </tr>
                    )) }
                  </tbody>
                </Table>         
              </CardBody>
            </Card>
            <Label>Select visualization </Label>
            <FormGroup>
              <Input onChange={(e) => onVisualizationChange(e.target.value)} type="select">
                  <option value="No Option">No option</option>
                  <option value="graph">Graph</option>                          
                  <option value="singlestat">Singlestat</option>                          
                  <option value="gauge">Gauge</option>                          
                  <option value="bar gauge">Bar Gauge</option>                          
              </Input>  
            </FormGroup>
            <Link>
              <Button onClick={() => onSubmit()}>Go to visualization settings</Button>
            </Link>
            </Col>       
        </div>      
    )
}

const mapStateToProps = state => ({ metrics: state.metrics });
const mapDispatchToProps = dispatch => ({
  setOptions: obj => dispatch(setPanelOptionsAction(obj))
 });

export default connect(mapStateToProps, mapDispatchToProps)(MetricSelection)