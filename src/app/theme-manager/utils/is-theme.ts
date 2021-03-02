import { ThemeName } from '../types/theme-name';

export function isTheme(themeName: string): themeName is ThemeName {
    return Object.values<string>(ThemeName).includes(themeName);
}
