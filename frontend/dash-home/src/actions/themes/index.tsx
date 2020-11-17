import { SET_THEME } from '../../reducers/themes/type';

export type setThemesFunc = (name: string) => void;
export const setThemes = (name: string) => ({
    type: SET_THEME as typeof SET_THEME,
    name: name,
});