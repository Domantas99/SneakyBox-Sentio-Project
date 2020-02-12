import React, {useState} from 'react'
import { Modal, Table, DropdownButton, Dropdown, Form } from 'react-bootstrap'

import { rowOptions } from '../../services/propery-options';


export default function PopUpForm(props) {
    const table = props.table;
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [rowOption, setRowOptions] = useState('');

    function Add() {

 
    } 

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    <h2>Customize</h2>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h3>{table.tableName}</h3>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Property Name</th>
                            <th>Property Type</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>0</td>
                        <td colSpan="2">All rows </td>
                        <td>
                            <Form.Control onChange={ e => setRowOptions(e.target.value) } 
                                          as="select">
                                { rowOptions.map((opt, index) => (
                                    <option key={index+opt}>{opt}</option>
                                )) }                                                    
                            </Form.Control> 
                        </td>
                    </tr>
                    {
                        table.properties.map((prop, index) => (
                            <tr key={index+1}>
                                <td>{index+1}</td>
                                <td>{prop.collumnName}</td> 
                                <td>{prop.collumnType}</td>
                                <td>
                                <Form.Control as="select">
                                    <option>No option</option>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>                                  
                                </Form.Control>                        
                                </td>
                            </tr>                  
                        ))
                    }
                    </tbody>
                </Table>
            </Modal.Body>
            <Modal.Footer>
            <button onClick={() => Add()}>Add</button>
            <button onClick={props.onHide}>Close</button>
         </Modal.Footer>
        </Modal>
    )
}
