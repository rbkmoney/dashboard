export enum StatusColor {
    Neutral = 'neutral',
    Success = 'success',
    Pending = 'pending',
    Warn = 'warn',
}

export type Status = keyof typeof StatusColor;
