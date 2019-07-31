import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { environment } from '../../environments/environment';
import { Script, Style, External } from './external';
import { SettingsService } from '../settings';

enum Type {
    JS = 'js',
    CSS = 'css'
}

const themes = ['light', 'dark'] as const;

@Injectable()
export class ThemeManager {
    private themes: { [name: string]: External } = {};
    private fileType: Type = environment.production ? Type.CSS : Type.JS;

    constructor(private settingsService: SettingsService, @Inject(DOCUMENT) private doc: Document) {
        this.init();
    }

    changeTheme(name: string = this.getTheme(1)) {
        this.removeCurrentTheme();
        this.themes[name].add(this.doc);
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
