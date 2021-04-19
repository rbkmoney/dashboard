export enum PaletteColor {
    Primary = 'primary',
    Accent = 'accent',
    Warn = 'warn',
}

export type Palette = keyof typeof PaletteColor;
