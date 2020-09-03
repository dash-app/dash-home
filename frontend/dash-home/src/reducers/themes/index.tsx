import { ThemeAction, SET_THEME } from "./type"

const initialState = {
    // TODO: Get from cookie (or default const value)
    name: "CHEEKY_WHITE",
}

export const themes = (state = initialState, action: ThemeAction) => {
    switch (action.type) {
        case SET_THEME:
            return {
                ...state,
                name: action.name
            }
        default:
            return state
    }
}