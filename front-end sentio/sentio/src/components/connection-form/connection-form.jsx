import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {InputGroup, FormControl, FormLabel, FormGroup, Button} from 'react-bootstrap';
// import { FormControl } from 'react-bootstrap/FormControl';

import './connection-form.scss'
export default function ConnectionForm() {
  const[dataBases, setDataBases] = useState(['MS SQL', 'MySQL', 'PostgreSQL', 'MongoDB']);
  const[selectedDB, setSelectedDB] = useState(dataBases[0]);
  const[connectionStr, setConnStr] = useState('');

  return (
    <div className="form" >
      <div> 
        <FormGroup 
          controlId="exampleForm.ControlSelect1">
            <FormLabel>Select Your Database </FormLabel>
            <FormControl 
              as="select" 
              onChange={ e => setSelectedDB(e.target.value) }>     
                { dataBases.map((data, index) =><option key={index} value={data}>{data}</option>) }
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
          onChange={e => {setConnStr(e.target.value)}} />
      </InputGroup>
      </div>
      <Link>
          <Button 
            className="mt-3 form-btn" 
            style={{float:"right"}} 
            variant="primary" 
            size="lg" 
            active>
              Start
        </Button>
      </Link>

    </div>
  );
}
