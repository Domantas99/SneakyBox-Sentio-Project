import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import { connect } from 'react-redux';
import {fetchUser } from '../../../services/redux/actions/user-actions'; 

function Login(props) {
    const [Email, setEmail] = useState('Dom');
    const [Password, setPassword] = useState('Dom');
    const history = useHistory();
    

    function handleLoginSubmit() {
      debugger
      const jsonUser = JSON.stringify({Email, Password});   
      props.validateUser(jsonUser)
        .then(resposnse => resposnse.validationResult)
        .then(result => {
          debugger
          if(result.isValid)
          {
            history.push('/home')
          }
          else {
            alert("Wrong Data")
          }
        })      
    }

    function handleEmailChange(newValue) {
      setEmail(newValue);
    }

    function handlePasswordChange(newValue) {
      setPassword(newValue);
    }


    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input value="Dom" onChange={ event => handleEmailChange(event.target.value) } 
                                type="text" placeholder="Username" autoComplete="username" />
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input  value="Dom" onChange={ event => handlePasswordChange(event.target.value) } 
                                type="password" placeholder="Password" autoComplete="current-password" />
                      </InputGroup>
                      <Row>
                        <Col xs="6">                     
                          <Button onClick={() => handleLoginSubmit()} color="primary" className="px-4">Login</Button>                     
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  
}
const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({
  validateUser: jsonUser => dispatch(fetchUser(jsonUser))
})


export default connect(mapStateToProps, mapDispatchToProps)(Login)

