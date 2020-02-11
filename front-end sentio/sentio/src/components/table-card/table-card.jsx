import React, {useState} from 'react'
import  {MdAddCircle}  from 'react-icons/md';
import PopUpForm from '../popup-form/popup-form';
import { ButtonToolbar } from 'react-bootstrap';

export default function TableCard({table}) {      
    const[showPopUp, setPopUp] = useState(false);

    return (
        
        <div className="item1">
            <ButtonToolbar>
            <button variant="primary" onClick={() => setPopUp(true)}>
                Launch vertically centered modal
            </button>
            
            <PopUpForm
                show={ showPopUp }
                onHide={() => setPopUp(false)}
                table={table}
            >

            </PopUpForm>
            </ButtonToolbar>
            <h2>{table.tableName} <span><MdAddCircle></MdAddCircle></span> </h2>
            <ul>
            {
            table.properties.map(prop => (
            <li>{prop.collumnName} ---- {prop.collumnType}</li>    
            ))
            }
            </ul>
        </div>
    )
}
