import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { fetchAllPanels } from '../../services/redux/actions/panel-actions';

function AllPanels(props) {
    const panels = props.panels;
    useEffect(() => {
        debugger
        console.log(props.userId, 'cia uid efecte')
       props.getPanels(props.userId);
       
    }, [])


    return (
        <div>
            {console.log(panels, 'cia panels')}
            <h1>Welcome to panels list page</h1>
            {/* there will be listed all panels and you will be able to create one */}
        </div>
    )
}
const mapStateToProps = state => ({
    userId: state.user.id,
    panels: state.panels
});
const mapDispatchToProps = dispatch => ({
    getPanels: userId => dispatch(fetchAllPanels(userId))
});

export default connect(mapStateToProps, mapDispatchToProps)(AllPanels)