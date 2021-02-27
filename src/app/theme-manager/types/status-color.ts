export enum StatusColor {
    neutral = 'neutral',
    success = 'success',
    pending = 'pending',
    warn = 'warn',
}

export type Status = keyof typeof StatusColor;
