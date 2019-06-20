import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { Script, Style, External } from './external';
import { SettingsService } from '../settings';

enum Type {
    JS = 'js',
    CSS = 'css'
}

const themes = ['light', 'dark'];

@Injectable()
export class ThemeManager {
    private themes: { [name: string]: External } = {};
    private fileType: Type = environment.production ? Type.CSS : Type.JS;

    constructor(private settingsService: SettingsService) {
        this.init();
    }

    changeTheme(name: string = this.getTheme(1)) {
        this.themes[name].add();
        this.removeCurrentTheme();
        this.settingsService.theme = name;
        document.body.classList.add(this.settingsService.theme);
    }

    private init() {
        this.themes = themes.reduce((t, name) => {
            t[name] = this.createExternal(this.getFilePath(name));
            return t;
        }, {});
        const defaultTheme = themes[0];
        this.changeTheme(this.settingsService.theme || defaultTheme);
    }

    private get themeIdx(): number {
        return themes.findIndex(n => n === this.settingsService.theme);
    }

    private getTheme(changeIdx: number = 0): string {
        const nextIdx = (this.themeIdx + changeIdx) % themes.length;
        return themes[nextIdx < 0 ? themes.length - nextIdx : nextIdx];
    }

    private removeCurrentTheme() {
        if (this.settingsService.theme) {
            this.themes[this.settingsService.theme].remove();
            document.body.classList.remove(this.settingsService.theme);
        }
    }

    private getFilePath(name: string) {
        return `themes/${name}.${this.fileType}`;
    }

    private createExternal(url: string): External {
        return new (this.fileType === 'js' ? Script : Style)(url);
    }
}
