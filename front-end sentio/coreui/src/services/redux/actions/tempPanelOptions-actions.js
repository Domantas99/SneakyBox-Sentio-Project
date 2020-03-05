

export const SET_TEMP_PANEL_OPTIONS = 'tempPanelOptions:set_temp_options';
export const RESET_TEMP_PANEL_OPTIONS = 'tempPanelOptions:reset_temp_options';

export function setPanelOptionsAction(options) {
    debugger
    return {
        type: SET_TEMP_PANEL_OPTIONS,
        options
    }
}

export function resetPanelOptionsAction() {
    debugger
    return {
        type: RESET_TEMP_PANEL_OPTIONS,
        propObj:{}
    }
}