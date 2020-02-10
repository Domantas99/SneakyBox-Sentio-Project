import React from 'react'
import { Modal } from 'react-bootstrap'

export default function PopUpForm(props) {
    

    return (
        <Modal
            {...props}
            size=""
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Customize

                </Modal.Title>
            </Modal.Header>
            <Modal.Footer>
            <button onClick={props.onHide}>Close</button>
         </Modal.Footer>
        </Modal>

    )
  
}
