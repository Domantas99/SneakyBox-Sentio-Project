import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { InputGroup, FormControl, FormLabel, FormGroup, Button} from 'react-bootstrap';

import { validationAPI } from '../../services/backend';
import './connection-form.scss'
import {store} from '../../index';


import { updateDbConnection } from '../../services/redux/actions/DatabaseConnection-actions';
import { connect } from 'react-redux';

function ConnectionForm(props) {
  const DataBases = ['MSSQL', 'MySQL', 'PostgreSQL', 'MongoDB'];
  const[DatabaseType, SetSelectedDB] = useState(DataBases[0]);
  const[ConnectionString, SetConnStr] = useState('');
  const[Resp, SetResp] = useState('');

  function onUpdateConnStr(connectionStr) {
    props.onDBConnUpdate({connStr: connectionStr, type: DatabaseType});
  }

  async function ValidateData() {
    const obj = JSON.stringify({DatabaseType,ConnectionString});
    debugger;
    const result = await fetch(validationAPI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: obj
    })
      .catch(err=>SetResp(err));
    
    const response = await result.json();
      
    if(response.isValid===true) {
      onUpdateConnStr(response.dbId);
      console.log(store.getState(), 'cia store');
      alert("Success");
      //window.location.replace("http://localhost:3001/creation");
    }
  }

  return (
    
    <div className="form" >
      <div> 
        <h2>{Resp.ok}</h2>
        <FormGroup 
          controlId="exampleForm.ControlSelect1">
            <FormLabel>Select Your Database </FormLabel>
            <FormControl 
              as="select" 
              onChange={ e => SetSelectedDB(e.target.value) }>     
                { DataBases.map((data, index) =><option key={index} value={data}>{data}</option>) }
            </FormControl>
        </FormGroup>
      </div>
      
      <div className="mt-3">
      <label>Enter Your Connection String</label>
      <InputGroup >
        <InputGroup.Prepend>
        <InputGroup.Text>Connection String</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl 
          as="textarea" 
          aria-label="With textarea" 
          onChange={e => {SetConnStr(e.target.value)}} />
      </InputGroup>
      </div>
      {/* <Link > */}
          <Button 
            className="mt-3 form-btn" 
            style={{float:"right"}} 
            variant="primary" 
            size="lg" 
            active
            onClick={()=> ValidateData()}>
              Start
        </Button>
      {/* </Link> */}
    </div>
  );
}

const mapStateToProps = state => ({
 // tables: state.tables,
 // onDBConnUpdate: state.connectionStr

});

const mapActionsToProps = {
  onDBConnUpdate: updateDbConnection
}
export default connect(mapStateToProps, mapActionsToProps) (ConnectionForm);