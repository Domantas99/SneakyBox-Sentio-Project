import React from 'react'
import { connect } from 'react-redux'
import  GraphVisualizationSettings  from '../../../my-components/visualization-settings/graph-visualization-settings/graph-visualization-settings';
import  SinglestatVisualizationSettings  from '../../../my-components/visualization-settings/singlestat-visualization-settings/singlestat-visualization-settings';

function VisualizationSettings(props) {
    const dbId = props.match.params.dbId;
    const visualization = props.panelOptions.visualization;
    return (
        <div>
            { 
                visualization === 'graph' ? 
                    <GraphVisualizationSettings dbId={dbId} ></GraphVisualizationSettings> : 
                visualization === 'stat' ? 
                    <SinglestatVisualizationSettings dbId={dbId}></SinglestatVisualizationSettings> : 
                <div> Option not implemented yet </div>
            }
        </div>
    )
}
const mapStateToProps = state => ({ panelOptions: state.tempPanelOptions });
const mapDispatchToProps = dispatch => ({ });

export default connect(mapStateToProps, mapDispatchToProps)(VisualizationSettings)