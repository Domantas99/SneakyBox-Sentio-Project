import React, { useEffect } from 'react'
import Board from '../../my-components/board/board';
import Card from '../../my-components/card/card';
import './dashboard-creation.scss';
import DragDrop from '../../my-components/drag-and-drop/drag-and-drop';
import { connect } from 'react-redux';
import {fetchAllPanels} from '../../services/redux/actions/panel-actions';

function DashboardCreation(props) {
    const userId = props.user.id;
    const panels = props.panels ? props.panels : [];
    const dbId = props.match.params.dbId;
    useEffect(() => {
        props.getPanels("72c50eeb-bb66-47fa-ae1d-63eacbeb74fe")
        // props.getPanels(userId)
    }, [])

    return (
        // <div className="flexbox">
        <div >
            {/* paduot db id */}
            {console.log(props, 'cia props db create')}
            <DragDrop data={ panels } dbId={ dbId }></DragDrop>
            
            {/* <Board id="board-1" className="flexbox__board">
                <Card id="card-1" className="flexbox__board-card" draggable="true">
                    <p>card one</p>
                </Card>
            </Board>
          
            <Board id="board-2" className="flexbox__board">
                <Card id="card-2" className="flexbox__board-card" draggable="true">
                    <p>card two</p>
                </Card>
            </Board> */}
          
            {/*  There will be displayed list of created panels */}
        </div>
    )
}
const mapStateToProps = state => ({
    user: state.user,
    panels: state.panels.panels
  });
const mapDispatchToProps = dispatch => ({
    getPanels: userId => dispatch(fetchAllPanels(userId))
});
export default connect(mapStateToProps, mapDispatchToProps)(DashboardCreation)