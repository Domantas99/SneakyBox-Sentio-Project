import React, {useState} from 'react'
import { connect } from 'react-redux'
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Collapse,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Fade,
    Form,
    FormGroup,
    FormText,
    FormFeedback,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupButtonDropdown,
    InputGroupText,
    Label,
    Row,
  } from 'reactstrap';
import { AddNewMetric } from '../../services/redux/actions/metrics-actions';
import { useHistory } from 'react-router-dom';


function CreateQueryForm(props) {
    const [queryName, setName] = useState('');
    const [operationType, setOptType] = useState('COUNT');
    const [sqlQuery, setSqlQuery] = useState('');
    const history = useHistory();
    function onSubmit() {
        const json = JSON.stringify({
            Name:queryName,
            Operation:operationType,
            DatabaseId: props.dbId,
            Query: sqlQuery
        });
        console.log(json);
        props.addNewMetric(json)
            .then(res => res.json)
                .then(json => {
                    if (!json.isValid) {
                        alert('There was an error adding metric')
                    }
                        history.push(`/databases/${props.dbId}/metrics`)
                    });
    }

    return (
        <div>
            {/* <Col xs="12" sm="6"> */}
            <Card>
              <CardHeader>
                <strong>Create your own query</strong>
              </CardHeader>
              <CardBody>
                <FormGroup>
                  <Label htmlFor="company">Query Name</Label>
                  <Input onChange={(e) => setName(e.target.value) } type="text" id="company" placeholder="Enter your Query Name" />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="vat">What Operation Type you are going to do?</Label>
                  <Input onChange={(e) => setOptType(e.target.value) } type="text" id="vat" placeholder="What Operation Type you are going to do?" value={operationType} />
                </FormGroup>
                <FormGroup>
                  <Label htmlFor="street">SQL Query</Label>
                  <Input onChange={(e) => setSqlQuery(e.target.value) }type="textarea" id="street" placeholder="Enter your SQL query" />
                </FormGroup>
              </CardBody>
              <Button onClick={() => onSubmit()}>Submit</Button>
            </Card>
          {/* </Col> */}


        </div>
    )
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({
    addNewMetric: json => dispatch(AddNewMetric(json))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateQueryForm);