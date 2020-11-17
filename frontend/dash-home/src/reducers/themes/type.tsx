export const SET_THEME = "SET_THEME";

interface SetTheme {
    type: typeof SET_THEME;
    name: string;
}

export type ThemeAction = SetTheme;