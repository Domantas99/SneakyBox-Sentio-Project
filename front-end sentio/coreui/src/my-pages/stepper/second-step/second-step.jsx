import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Col, Input, Table } from 'reactstrap';
import { setTempPropertiesAction } from '../../../services/redux/actions/tempProperties-actions';
import TypeOptions from '../../../settings/typeOptions';

function SecondStep(props) {
    const history = useHistory();
    const tableId = props.match.params.tableId;
    const dbId = props.match.params.dbId;
    const table = props.tables.find(x => x.id === tableId);
    console.log(props, 'cia props second step')
    let propertyOptionArray = [];

    function handleSelectedOptionChange(property, value) {
        const index = propertyOptionArray.findIndex(val => val.property === property);
        if(index < 0) {
            propertyOptionArray.push({ include: false, property: property, filterOption: 'No Option', filter: 'No filter' })
        } else {
            propertyOptionArray[index].filterOption = value
        }
    }
    function handleCheckBoxChange(property) {
        const index = propertyOptionArray.findIndex(val => val.property === property);
        if(index < 0) {
            propertyOptionArray.push({ include: true, property: property, filterOption: 'No Option', filter: 'No filter' })
        } else {
            propertyOptionArray[index].include = !propertyOptionArray[index].include;
        } 
    }

    function handleFilterChange(property, value) {
        const index = propertyOptionArray.findIndex(val => val.property === property);
        if(index < 0) {
            propertyOptionArray.push({ include: false, property: property, filterOption: 'No Option', filter: value })
        } else {
            propertyOptionArray[index].filter = value;
        }
    }

    function onSubmit() {
        const metricOptions = { tableId: tableId, options: propertyOptionArray.filter(p => p.include === true) };
        console.log(metricOptions)

        props.setProps(metricOptions);
        history.push(`/databases/${dbId}/metrics/first-step/${table.id}/second-step/third-step`)   
    }

    return (
        <div>
            <Col xs="10" lg="10">
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Table "{table.tableName}" properties
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead>
                  <tr>
                    <th>Propety Name</th>
                    <th>Property Type</th>        
                    <th>Include</th>        
                    <th></th>        
                    <th>Select Option</th>        
                    <th>Filter</th>        
                  </tr>
                  </thead>
                  <tbody>
                      <tr className="tableRow">
                          <td colSpan="4">All table rows</td>
                          <td>
                            <Input type="select" onChange={(e) => handleSelectedOptionChange({collumnName:'All rows', collumnType:'id'}, e.target.value)}>
                                    <option value="No Option">No option</option>
                                    <option value="With">With</option>                                                                        
                            </Input>
                          </td>
                          <td></td>
                      </tr>
                    {
                        table && table.properties.map((property, index) => (
                            <tr key={index} className="tableRow">
                                <td>{ property.collumnName }</td>         
                                <td>{ property.collumnType }</td>         
                                <td>
                                    <Input onChange={(e) => handleCheckBoxChange(property, e.target.value)}  className="form-check-input" type="checkbox" id="checkbox1" name="checkbox1" value="option1" />
                                </td>
                                <td>VALUE</td>           
                                <td>
                                
                                <Input type="select" onChange={(e) => handleSelectedOptionChange(property, e.target.value)}>
                                    {
                                        TypeOptions[property.collumnType].map(opt => 
                                            <option value={opt}>{ opt }</option>
                                        )
                                    
                                    }                                      
                                </Input>  
                                </td>     
                                <td><Input onChange={(e) => handleFilterChange(property, e.target.value) } type="text" placeholder="value" />  </td>    
                            </tr>
                        ))                    
                    } 
                  </tbody>
                </Table>
                    <Button onClick={() => onSubmit()} color="primary">Choose an action</Button>
              </CardBody>
            </Card>
          </Col>
        </div>
    )
}

const mapStateToProps = state => ({
    tables: state.dbTables.Tables,
    state
})
const mapDispatchToProps = dispatch => ({
    setProps: propsObj => dispatch(setTempPropertiesAction(propsObj))
})

export default connect(mapStateToProps, mapDispatchToProps)(SecondStep)