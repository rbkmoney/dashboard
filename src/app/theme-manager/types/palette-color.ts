export enum PaletteColor {
    primary = 'primary',
    accent = 'accent',
    warn = 'warn',
}

export type Palette = keyof typeof PaletteColor;
