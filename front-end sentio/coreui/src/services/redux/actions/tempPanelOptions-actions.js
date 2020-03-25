export const SET_TEMP_PANEL_OPTIONS = 'tempPanelOptions:set_temp_options';
export const RESET_TEMP_PANEL_OPTIONS = 'tempPanelOptions:reset_temp_options';
export const HANDLE_METRIC_CHECKBOX_CHANGE = 'tempPanelOptions:handle_checkbox_change';
export const HANDLE_VISUALIZATION_CHANGE = 'tempPanelOptions:handle_visualization_change';
export const HANDLE_METRIC_LEGEND_CHANGE = 'tempPanelOptions:handle_legend_change';
export const HANDLE_PANEL_NAME_CHANGE = 'tempPanelOptions:handle_panel_name_change';
// temp data actions to transmit data to other component
export function setPanelOptionsAction(options, panel) {
    return {
        type: SET_TEMP_PANEL_OPTIONS,
        options,
        panel
    }
}

export function handleMetricCheckboxChange(metric) {
    return {
        type: HANDLE_METRIC_CHECKBOX_CHANGE,
        metric
    }
}

export function handleVisualizationChange(value) {
    return {
        type: HANDLE_VISUALIZATION_CHANGE,
        value
    }
}

export function handleMetricLegendChange(metric,value) {
    return {
        type: HANDLE_METRIC_LEGEND_CHANGE,
        value,
        metric
    }
}

export function handlePanelNameChange(value) {
    return {
        type: HANDLE_PANEL_NAME_CHANGE,
        value
    }
}

export function resetPanelOptions() {
    return {
        type: RESET_TEMP_PANEL_OPTIONS,
    }
}