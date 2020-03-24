export const SET_ALL_OPTIONS = 'properties:set_all_options';
export const RESET_TEMP_PROPERTIES = 'properties:reset_temp_properties';
export const HANDLE_CHECKBOX_CHANGE = 'properties:handle_checkbox_change';
export const HANDLE_SELECTED_OPTION_CHANGE = 'properties:handle_selected_option';
export const HANDLE_FILTER_CHANGE = 'properties:handle_filter_change';
export const SET_TABLE_ID = 'properties:set_Table_Id';


// Temp data(Selected table's collumn's options) to transmit data to other component
export function setAllOptionsAction(allOptions, tableId) {
    return {
        type: SET_ALL_OPTIONS,
        options: allOptions,
        tableId
    }
}

export function handleCheckBoxChange(property) {
    return {
        type: HANDLE_CHECKBOX_CHANGE,
        property
    }
}

export function handleSelectedOptionChange(property, value) {
    return {
        type: HANDLE_SELECTED_OPTION_CHANGE,
        property,
        value
    }
}

export function handleFilterChange(property, value) {
    return {
        type: HANDLE_FILTER_CHANGE,
        property,
        value
    }
}

export function setTableId(tableId) {
    return {
        type: SET_TABLE_ID,
        tableId
    }
}

export function ResetTempPropertiesAction() {
    return {
        type: RESET_TEMP_PROPERTIES,
        propObj:{}
    }
}