import React, {useState} from 'react'
import  {MdAddCircle}  from 'react-icons/md';
import PopUpForm from '../popup-form/popup-form';
import { ButtonToolbar, Accordion } from 'react-bootstrap';
import './table-card.scss';

export default function TableCard({table, eventKey}) {      
    const[showPopUp, setPopUp] = useState(false);

//     const decoratedOnClick = useAccordionToggle(eventKey, () =>
//     console.log('totally custom!'),
//   );

    return (
        
        <div className="item1">
                            
            <PopUpForm
                show={ showPopUp }
                onHide={() => setPopUp(false)}
                table={table}
            >

            </PopUpForm>
            <div>
                <div>
                {/* <button
      type="button"
      style={{ backgroundColor: 'pink' }}
      onClick={decoratedOnClick}
    >
      click
    </button> */}
                    <h2>{table.tableName} <span><MdAddCircle className="icon" onClick={() => setPopUp(true)}></MdAddCircle></span> </h2>
                </div>
                <div>
                    <ul>
                    {
                    table.properties.map(prop => (
                    <li>{prop.collumnName} ---- {prop.collumnType}</li>))
                    }
                    </ul>
                </div>
            </div>
        </div>
    )
}
