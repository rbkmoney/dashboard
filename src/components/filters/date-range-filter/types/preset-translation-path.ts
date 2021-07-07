import { Preset } from './preset';

export const PRESETS_TRANSLATION_PATH: [id: Preset, translationPath: string][] = [
    [Preset.Last24hour, 'last24hour'],
    [Preset.Last30days, 'last30days'],
    [Preset.Last90days, 'last90days'],
    [Preset.Last365days, 'last365days'],
    [Preset.Custom, 'custom'],
];
