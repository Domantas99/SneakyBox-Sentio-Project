import React, {useState} from 'react'
import  {MdAddCircle}  from 'react-icons/md';
import  {FaAngleDoubleDown}  from 'react-icons/fa';
import PopUpForm from '../popup-form/popup-form';
import { ButtonToolbar, Accordion, eventKey } from 'react-bootstrap';
import './table-card.scss';

export default function TableCard({table}) {      
    const[showPopUp, setPopUp] = useState(false);

    

    return (
        <Accordion >
            <div className="item1">               
                <PopUpForm
                    show={ showPopUp }
                    onHide={() => setPopUp(false)}
                    table={table}>
                </PopUpForm>

                <div>                
                    <h3>
                        <span><Accordion.Toggle  eventKey="0"><FaAngleDoubleDown></FaAngleDoubleDown></Accordion.Toggle></span>
                        {table.tableName} 
                    <span><MdAddCircle className="icon" onClick={() => setPopUp(true)}></MdAddCircle></span> </h3>
                </div>

                <Accordion.Collapse eventKey="0">
                    <div>
                        <ul>
                        {
                        table.properties.map((prop, index) => (
                        <li key={index + table.id}>{prop.collumnName} ---- {prop.collumnType}</li>))
                        }
                        </ul>
                    </div>
                </Accordion.Collapse>
                
            </div>
        </Accordion>
    )
}
