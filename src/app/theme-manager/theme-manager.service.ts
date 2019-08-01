import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { environment } from '../../environments/environment';
import { Script, Style, External } from './external';
import { SettingsService, supportedThemes } from '../settings';

enum Type {
    JS = 'js',
    CSS = 'css'
}

@Injectable()
export class ThemeManager {
    private themes: { [name: string]: External } = {};
    private fileType: Type = environment.production ? Type.CSS : Type.JS;

    constructor(private settingsService: SettingsService, @Inject(DOCUMENT) private doc: Document) {
        this.init();
    }

    changeTheme(name = this.getTheme(1)) {
        this.removeCurrentTheme();
        this.themes[name].add(this.doc);
        this.settingsService.theme = name;
        document.body.classList.add(this.settingsService.theme);
    }

    private init() {
        this.themes = supportedThemes.reduce((t, name) => {
            t[name] = this.createExternal(this.getFilePath(name));
            return t;
        }, {});
        const defaultTheme = supportedThemes[0];
        this.changeTheme(this.settingsService.theme || defaultTheme);
    }

    private get themeIdx(): number {
        return supportedThemes.findIndex(n => n === this.settingsService.theme);
    }

    private getTheme(changeIdx: number = 0) {
        const nextIdx = (this.themeIdx + changeIdx) % supportedThemes.length;
        return supportedThemes[nextIdx < 0 ? supportedThemes.length - nextIdx : nextIdx];
    }

    private removeCurrentTheme() {
        if (this.settingsService.theme) {
            this.themes[this.settingsService.theme].remove(this.doc);
            document.body.classList.remove(this.settingsService.theme);
        }
    }

    private getFilePath(name: string) {
        return `themes/${name}.${this.fileType}`;
    }

    private createExternal(url: string): External {
        return new (this.fileType === Type.JS ? Script : Style)(url);
    }
}
