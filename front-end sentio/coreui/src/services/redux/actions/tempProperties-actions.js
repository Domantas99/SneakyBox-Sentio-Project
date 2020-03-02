export const SET_TEMP_PROPERTIES = 'properties:set_temp_properties';
export const RESET_TEMP_PROPERTIES = 'properties:reset_temp_properties';

export function setTempPropertiesAction(propObj) {
    debugger
    return {
        type: SET_TEMP_PROPERTIES,
        propObj
    }
}

export function ResetTempPropertiesAction() {
    debugger
    return {
        type: SET_TEMP_PROPERTIES,
        propObj:{}
    }
}