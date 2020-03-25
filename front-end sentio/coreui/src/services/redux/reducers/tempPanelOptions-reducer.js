import { SET_TEMP_PANEL_OPTIONS, 
        RESET_TEMP_PANEL_OPTIONS, 
        HANDLE_METRIC_CHECKBOX_CHANGE, 
        HANDLE_VISUALIZATION_CHANGE,
        HANDLE_METRIC_LEGEND_CHANGE,
        HANDLE_PANEL_NAME_CHANGE } from '../actions/tempPanelOptions-actions';

function tempPanelOptions (state={ panelName: '', visualization: 'No Option', options: [], editing: false }, action) {
    debugger;
    switch(action.type) {
        case SET_TEMP_PANEL_OPTIONS: {
            debugger;
            let editFlag=false;
            let arr = []
            action.options.forEach(o => {
                arr.push({...o, Legend: o.name, include:false})
                if(action.panel) {
                    editFlag = true;
                    const panelMetrics = action.panel.panelQueries;
                    for (let i=0; i < panelMetrics.length; i++) {
                        debugger
                        if (panelMetrics[i].trackableQueryId === arr[arr.length-1].id) {
                            arr[arr.length-1].include = true;
                        }
                    }
                }
            })
            debugger;
            return Object.assign({}, state, { 
                panelName: action.panel? action.panel.legend : '', 
                visualization: action.panel ? action.panel.panelType: '', 
                options: arr, 
                editing:editFlag,
                id: action.panel? action.panel.id : ''
            });    
        }
        case RESET_TEMP_PANEL_OPTIONS:
            return Object.assign({}, state, { panelName: '', visualization: 'No Option', options: [] }); 
        case HANDLE_VISUALIZATION_CHANGE:
            return Object.assign({}, state, {...state, visualization: action.value});
        case HANDLE_PANEL_NAME_CHANGE:
            return Object.assign({}, state, {...state, panelName: action.value});
        case HANDLE_METRIC_LEGEND_CHANGE: {
            let arr = state.options;
            const index = arr.indexOf(action.metric);
            arr[index].Legend = action.value; 
            return Object.assign({}, state, {...state, options: arr});
        }
        case HANDLE_METRIC_CHECKBOX_CHANGE:
            debugger
            const index = state.options.indexOf(action.metric);
            let temp = state.options;
            temp[index].include = !temp[index].include;
            return Object.assign({}, state, {...state, options:temp});
        default:
            return state;
    }
}

export default function tempPanelOptionsReducer(state ={ panelName: '', visualization: 'No Option', options: [] }, action) {
    debugger;
    switch(action.type) {
        case SET_TEMP_PANEL_OPTIONS:
            return tempPanelOptions(state, action);    
        case RESET_TEMP_PANEL_OPTIONS:
            return tempPanelOptions(state, action); 
        case HANDLE_METRIC_CHECKBOX_CHANGE:
            return tempPanelOptions(state, action);
        case HANDLE_VISUALIZATION_CHANGE:
            return tempPanelOptions(state, action);
        case HANDLE_METRIC_LEGEND_CHANGE:
            return tempPanelOptions(state, action);
        case HANDLE_PANEL_NAME_CHANGE:
            return tempPanelOptions(state, action);
        default:
            return state;
    }
}