import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { InputGroup, FormControl, FormLabel, FormGroup, Button} from 'react-bootstrap';
import { validationAPI } from '../../services/backend';

import './connection-form.scss'
export default function ConnectionForm() {
  const[DataBases, SetDataBases] = useState(['MSSQL', 'MySQL', 'PostgreSQL', 'MongoDB']);
  const[DatabaseType, SetSelectedDB] = useState(DataBases[0]);
  const[ConnectionString, SetConnStr] = useState('');
  const[Resp, SetResp] = useState('dasdas');

  async function ValidateData() {
    const obj = JSON.stringify({DatabaseType,ConnectionString});
    debugger;

    console.log(validationAPI);
    const result = await fetch(validationAPI, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: obj
    } 
    )//.then(res => { SetResp(res); console.log(res.json())})
        .catch(err=>console.log(err));
      const response = await result.json();
      
      if(response.IsValid) {
       // store settinu response.ConnectionString

      }

      console.log(response);
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
