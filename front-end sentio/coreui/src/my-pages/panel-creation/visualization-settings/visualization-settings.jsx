import React from 'react'
import { connect } from 'react-redux'
import  GraphVisualizationSettings  from '../../../my-components/visualization-settings/graph-visualization-settings/graph-visualization-settings';
import  SinglestatVisualizationSettings  from '../../../my-components/visualization-settings/singlestat-visualization-settings/singlestat-visualization-settings';

function VisualizationSettings(props) {
    const dbId = props.match.params.dbId;
    const panelOptions = props.panelOptions;
    const visualization = props.panelOptions.visualization;
    return (
        <div>
            { console.log(props, 'vs page props') }
            <h2>Welcome to vizualization page</h2>
            { 
                visualization === 'graph' ? 
                    <GraphVisualizationSettings dbId={dbId} ></GraphVisualizationSettings> : 
                visualization === 'singlestat' ? 
                    <SinglestatVisualizationSettings></SinglestatVisualizationSettings> : 
                <div> Option not implemented yet </div>
            }
            
        

        </div>
    )
}
const mapStateToProps = state => ({ panelOptions: state.tempPanelOptions });
const mapDispatchToProps = dispatch => ({ });

export default connect(mapStateToProps, mapDispatchToProps)(VisualizationSettings)