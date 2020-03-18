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
    const databaseId = props.match.params.dbId;
    const dashboard = props.dashboards.find(x => x.id === props.match.params.dashboardId);
    useEffect(() => {
        props.getPanels("72c50eeb-bb66-47fa-ae1d-63eacbeb74fe")
        // props.getPanels(userId)
    }, [])

    return (
        <div >
            {console.log(props, 'cia props db create')}
            <DragDrop data={ panels } dbId={ databaseId } dashboard={ dashboard }></DragDrop>
        </div>
    )
}
const mapStateToProps = state => ({
    user: state.user,
    panels: state.panels.panels,
    dashboards: state.dashboards.dashboards
  });
const mapDispatchToProps = dispatch => ({
    getPanels: userId => dispatch(fetchAllPanels(userId))
});
export default connect(mapStateToProps, mapDispatchToProps)(DashboardCreation)