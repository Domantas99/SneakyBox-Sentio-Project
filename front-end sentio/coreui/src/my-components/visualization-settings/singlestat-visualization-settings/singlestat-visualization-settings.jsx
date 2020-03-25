import React, {useState} from 'react'
import { connect } from 'react-redux'
import { FormGroup, Label, Button, Card, CardBody, CardHeader, Col, Table, Input } from 'reactstrap';;

function SinglestatVisualizationSettings(props) {
    const alphabet = "ABCDEFGHIYJKLMNOPQRSTUVXWZ";
    const metrics = props.panelOptions.options.filter(x => x.include === true);
    const [formula, setFormula] = useState('');
    const [metricNames, setNames] = useState(metrics.map(m => ({TrackableQueryId: m.id, Legend: m.name})));

    function onLegendChange(metricId, value) {
      debugger;
      const element = metricNames.find(el => el.TrackableQueryId === metricId);  
      const index = metricNames.indexOf(element);
      let arr = metricNames;
      arr[index].Legend = value;
      setNames(arr);
      console.log(metricNames);
    }

    // Reikes pabaikti su redux
    function onNameChange(id, value) {
        const name = metricNames.find(x => x.id === id);
        const index = metricNames.indexOf(name);
        if(index < 0 ) {
        }  
    }

    debugger
    return (
        <div>
            {console.log(props, 'cia props SingleV')}

            <Col xs="9" lg="10">                                         
            <Card>
              <CardHeader>
                 <h3>Select what metrics you would like to see</h3>
              </CardHeader>
              <CardBody>
                <FormGroup>
                    <h4><Label>Graph name</Label></h4>
                    <Input onChange={(e) => (e.target.value)}></Input>
                </FormGroup>
                <Table responsive>
                  <thead>
                    <tr>
                        <th>Index for formula</th>
                        <th>Metric name</th>
                        <th>Operation Type</th>  
                        <th>Legend Name</th>              
                    </tr>
                  </thead>
                  <tbody>
                    { metrics && metrics.map((metric, index) => (
                      <tr key={index}>
                        <td>{alphabet[index]}</td>
                        <td>{metric.name}</td>
                        <td>{metric.operationType}</td>                
                        <td>
                          <Input onChange={(e) => onLegendChange(metric.id, e.target.value) }></Input>
                        </td> 
                      </tr>
                    )) }
                  </tbody>
                </Table>     
                <div>
                    <Label>
                        <h4>Write result formula of index letters</h4>
                    </Label>
                    <Input onChange={(e) => setFormula(e.target.value)} placeholder="A * A / B + C"></Input>
                </div>    
              </CardBody>
              
            </Card>          
              <Button >Finish</Button>       
            </Col>       

        </div>
    )
}
const mapStateToProps = state => ({ 
    panelOptions: state.tempPanelOptions, 
    state 
})
const mapDispatchToProps = dispatch => ({
    
})

export default connect(mapStateToProps, mapDispatchToProps)(SinglestatVisualizationSettings)