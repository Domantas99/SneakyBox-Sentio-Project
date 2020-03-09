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
        const jsonObj = JSON.stringify({ ConnectionString: connStr, DatabaseType: dbType });
        props.addDb(jsonObj).then(res=> {
            if(res.json.isValid) {
                history.push('/databases')
            } else {
                alert("There was an error")
            }

        });;
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
                <strong>Credit Card</strong>
                <small> Form</small>
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
                      <Label htmlFor="ccnumber">Credit Card Number</Label>
                      <Input onChange={(e) => onDbTypeChange(e.target.value)} type="select" required>
                            <option value="Not Selected">Not Selected</option>
                            <option value="MSSQL">MSSQL</option>
                            <option value="MySQL">MySQL</option>
                            <option value="PostgreSQL">PostgreSQL</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                {/* <Row>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="ccmonth">Month</Label>
                      <Input type="select" name="ccmonth" id="ccmonth">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="ccyear">Year</Label>
                      <Input type="select" name="ccyear" id="ccyear">
                        <option>2017</option>
                        <option>2018</option>
                        <option>2019</option>
                        <option>2020</option>
                        <option>2021</option>
                        <option>2022</option>
                        <option>2023</option>
                        <option>2024</option>
                        <option>2025</option>
                        <option>2026</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col xs="4">
                    <FormGroup>
                      <Label htmlFor="cvv">CVV/CVC</Label>
                      <Input type="text" id="cvv" placeholder="123" required />
                    </FormGroup>
                  </Col>
                </Row> */}
                <Button onClick={() => onSubmit()}>Submit</Button>
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