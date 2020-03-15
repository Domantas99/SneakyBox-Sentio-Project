import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FormGroup, Label, Button, Card, CardBody, CardHeader, Col, Input, Table } from 'reactstrap';
import { AddNewMetric } from '../../../services/redux/actions/metrics-actions';
import { useHistory } from 'react-router-dom';


 
function ThirdStep(props) {
    console.log(props)
    const dbId = props.match.params.dbId;
    const options = props.tempProperties.options;
    const [Operation, setOperation] = useState(false);
    const [MetricName, setMetricName] = useState('');
    const history = useHistory();

    console.log(options, 'cia options')
    function onSubmit() {
      const json = JSON.stringify({ 
        Name: MetricName,
        TableId: props.tempProperties.tableId,
        Conditions: options.map(opt => ({
          TableProperty: opt.property,
          FilterOption: opt.filterOption,
          FilterValue: opt.filter
        })),
        Operation: Operation,
        DatabaseId: dbId
      });
      props.addNewMetric(json)
        .then(res => res.json)
        .then(json => {
          if(!json.isValid) {
            alert('There was an error adding metric')
          }
          history.push(`/databases/${dbId}/metrics`)
        }
        )
    }

    function handleOperationChange(value) {
      setOperation(value);
    }

    function handleMetricNameChange(value) {
      setMetricName(value);
    }

    return (
        <div>
            
            {console.log(options, 'cia options')}
            <Col xs="6" lg="6">
                <h2>Choose an action</h2>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Your selected properties options
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                  <tr>
                    <th>Propety Name</th>
                    <th>Property Type</th>        
                    <th>Filter Option</th>        
                    <th>Filter Value</th>        
                  </tr>
                  </thead>
                  <tbody>     
                    {
                        options && options.map((opt, index) => (
                            <tr className="tableRow" key={index}>
                                <td>{ opt.property.collumnName }</td>         
                                <td>{ opt.property.collumnType }</td>         
                                <td>{ opt.filterOption } </td>         
                                <td>{ opt.filter } </td>         
                            </tr>
                        ))
                    } 
                  </tbody>
                </Table>                                       
              </CardBody>
            </Card>
            <FormGroup>
              <Label htmlFor="name">Enter Metric Name</Label>
              <Input onChange={(e) => handleMetricNameChange(e.target.value)} type="text" id="name" placeholder="My Metric" required />
            </FormGroup>
            <FormGroup>
              <Input onChange={(e) => handleOperationChange(e.target.value)} type="select">
                  <option value="No Option">No option</option>
                  <option value="COUNT">COUNT</option>  
                  { 
                      (options.length === 1 && options[0].property.collumnType==='int') && <option value="AVERAGE">Average</option> 
                  }                             
              </Input>  
            </FormGroup>
            <Button onClick={() => onSubmit()} color="success">Submit</Button>
          </Col>
        </div>
    )
}

const mapStateToProps = state => ({
    tempProperties: state.tempProperties
})

const mapDispatchToProps = dispatch => ({
    addNewMetric: json => dispatch(AddNewMetric(json))
})

export default connect(mapStateToProps, mapDispatchToProps)(ThirdStep)