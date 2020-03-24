import React, {useState, useEffect} from 'react'
import { Button, Card, CardBody, CardHeader, Col, FormGroup, Input, Label, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { AddNewDatabaseToDB } from '../../services/redux/actions/databases-actions';
import { useHistory } from 'react-router-dom';

function DatabaseCreation(props) {
    const [connStr, setConnStr] = useState('');
    const [dbType, setDbType] = useState('Not selected');
    const history = useHistory();
    function onSubmit() {
      debugger;
        if(dbType === 'Not selected') {
          alert("Please select database type")
        }
        else{
        const jsonObj = JSON.stringify({ ConnectionString: connStr, DatabaseType: dbType });
        props.addDb(jsonObj).then(res=> {
            if(res.json.isValid) {
                history.push('/databases')
            } else {
                alert(res.json.message)
            }

        });
      }
    }
    
    function onConnectionStrChange(value) {
        setConnStr(value);
    }

    function onDbTypeChange(value) {
        setDbType(value)
        
    }

    return (
        <div>
            <Col xs="12" sm="6">
            <Card>
              <CardHeader>
                <strong>Enter your database connection data</strong>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="name">Connection String</Label>
                      <Input onChange={(e) => onConnectionStrChange(e.target.value)} type="text" id="name" placeholder="Enter your connection string" required />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col xs="12">
                    <FormGroup>
                      <Label htmlFor="ccnumber">Database Type</Label>
                      <Input onChange={(e) => onDbTypeChange(e.target.value)} type="select" required>
                            <option value="Not Selected">Not Selected</option>
                            <option value="MSSQL">MSSQL</option>
                            <option value="MySQL">MySQL</option>
                            <option value="PostgreSQL">PostgreSQL</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>

                <Button color="success" onClick={() => onSubmit()}>Submit</Button>
              </CardBody>
            </Card>
          </Col>
        </div>
    )
}
const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
    addDb: json => dispatch(AddNewDatabaseToDB(json))
});
export default connect(mapStateToProps, mapDispatchToProps)(DatabaseCreation)