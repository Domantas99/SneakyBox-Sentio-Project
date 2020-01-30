import React, { useState } from 'react';
import {InputGroup, FormControl, FormLabel, FormGroup} from 'react-bootstrap';
// import { FormControl } from 'react-bootstrap/FormControl';

import './connection-form.scss'
export default function ConnectionForm() {
  const[dataBases, setDataBases] = useState(['MS SQL', 'MySQL', 'PostgreSQL', 'MongoDB']);


  return (
    <div className="form" >
      
      <div>
        
        <FormGroup controlId="exampleForm.ControlSelect1">
          <FormLabel>Select Your Database</FormLabel>
          <FormControl as="select">
            {dataBases.map(data =><option>{data}</option> )}        
          </FormControl>
        </FormGroup>
      </div>
      
      <div>
      <label>Enter you connection string</label>
      <InputGroup >        
        <InputGroup.Prepend>
        <InputGroup.Text>Connection String</InputGroup.Text>
        </InputGroup.Prepend>
        <FormControl as="textarea" aria-label="With textarea" />
      </InputGroup>
      </div>
      
    </div>
  );
}
