import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, Col, Input, Table } from 'reactstrap';
import { handleFilterChange, setAllOptionsAction, setTableId, handleCheckBoxChange, handleSelectedOptionChange } from '../../../services/redux/actions/tempProperties-actions';
import TypeOptions from '../../../settings/typeOptions';

function SecondStep(props) {
    const history = useHistory();
    const tableId = props.match.params.tableId;
    const dbId = props.match.params.dbId;
    const table = props.tables.find(x => x.id === tableId);
    const options = props.options;

    useEffect(() => {
        if(!options || options.length ===0) {
            props.setDefaultOptions(table.properties, tableId)
        }
    }, [])

    function handleSelectedOptionChange(property, value) {
        props.changeSelectedOption(property, value);
    }
    function handleCheckBoxChange(property) {
        props.changeCheckBox(property);
    }

    function handleFilterChange(property, value) {
       props.changeFilter(property, value);
    }

    function onSubmit() {
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
                    options && options.map((option, index) => (
                        <tr key={index} className="tableRow">
                            <td>{ option.property.collumnName }</td>         
                            <td>{ option.property.collumnType }</td>         
                            <td>
                                <Input checked={option.include} onChange={(e) => handleCheckBoxChange(option.property, e.target.value)}  className="form-check-input" type="checkbox" id="checkbox1" name="checkbox1" value="option1" />
                            </td>
                            <td>VALUE</td>           
                            <td>   
                            <Input type="select" value={option.filterOption} onChange={(e) => handleSelectedOptionChange(option.property, e.target.value)}>
                                {
                                    TypeOptions[option.property.collumnType].map(opt => 
                                        <option value={opt}>{ opt }</option>
                                    )
                                }                                      
                            </Input>  
                            </td>     
                            <td><Input value={option.filter} onChange={(e) => handleFilterChange(option.property, e.target.value) } type="text" placeholder="value" />  </td>    
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
    options: state.tempProperties.options,
    state
})
const mapDispatchToProps = dispatch => ({
    setDefaultOptions: (options, tableId) => dispatch(setAllOptionsAction(options, tableId)),
    setTableId: tableId => dispatch(setTableId(tableId)),
    changeCheckBox: property => dispatch(handleCheckBoxChange(property)),
    changeSelectedOption: (property, value) => dispatch(handleSelectedOptionChange(property , value)),
    changeFilter: (property, value) => dispatch(handleFilterChange(property , value))
})

export default connect(mapStateToProps, mapDispatchToProps)(SecondStep)