export const SET_TEMP_PANEL_OPTIONS = 'tempPanelOptions:set_temp_options';
export const RESET_TEMP_PANEL_OPTIONS = 'tempPanelOptions:reset_temp_options';
// temp data actions to transmit data to other component
export function setPanelOptionsAction(options) {
    return {
        type: SET_TEMP_PANEL_OPTIONS,
        options
    }
}

export function resetPanelOptionsAction() {
    return {
        type: RESET_TEMP_PANEL_OPTIONS,
        propObj:{}
    }
}