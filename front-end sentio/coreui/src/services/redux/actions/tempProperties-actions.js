export const SET_TEMP_PROPERTIES = 'properties:set_temp_properties';
export const RESET_TEMP_PROPERTIES = 'properties:reset_temp_properties';

// Temp data(Selected table's collumn's options) to transmit data to other component
export function setTempPropertiesAction(propObj) {
    return {
        type: SET_TEMP_PROPERTIES,
        propObj
    }
}

export function ResetTempPropertiesAction() {
    return {
        type: SET_TEMP_PROPERTIES,
        propObj:{}
    }
}