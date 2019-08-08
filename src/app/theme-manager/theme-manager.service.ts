import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { environment } from '../../environments/environment';
import { Script, Style, External } from './external';
import { SettingsService } from '../settings';

enum Type {
    JS = 'js',
    CSS = 'css'
}

@Injectable()
export class ThemeManager {
    static readonly KEY = 'theme';

    default: string;

    get supported() {
        return Object.keys(this.themes);
    }

    get theme(): string {
        return this.getCorrectName(this.settingsService.get(ThemeManager.KEY));
    }
    set theme(name: string) {
        if (this.theme !== name) {
            this.setTheme(name);
        }
    }

    private themes: { [name: string]: External } = {};
    private fileType: Type = environment.production ? Type.CSS : Type.JS;

    constructor(private settingsService: SettingsService, @Inject(DOCUMENT) private doc: Document) {}

    init(supportedThemes: ArrayLike<any>, defaultTheme: string) {
        this.default = defaultTheme;
        this.themes = Array.from(supportedThemes).reduce((themes, name) => {
            themes[name] = this.createExternal(this.getFilePath(name));
            return themes;
        }, {});
        if (!this.supported.includes(this.theme)) {
            this.theme = defaultTheme;
        }
        this.setTheme(this.theme);
    }

    change(offset: number = 1) {
        this.theme = this.getThemeByOffset(offset);
    }

    private setTheme(name: string) {
        const correctName = this.getCorrectName(name);
        this.removeCurrentTheme();
        this.themes[correctName].add(this.doc);
        document.body.classList.add(correctName);
        this.settingsService.set(ThemeManager.KEY, correctName);
    }

    private getThemeByOffset(offset: number) {
        const themeIdx = this.supported.findIndex(n => n === this.theme);
        const nextIdx = (themeIdx + offset) % this.supported.length;
        return this.supported[nextIdx < 0 ? this.supported.length - nextIdx : nextIdx];
    }

    private getCorrectName(theme: string) {
        if (!this.supported.includes(theme)) {
            return this.default;
        }
        return theme;
    }

    private removeCurrentTheme() {
        this.themes[this.theme].remove(this.doc);
        this.doc.body.classList.remove(this.theme);
    }

    private getFilePath(name: string) {
        return `themes/${name}.${this.fileType}`;
    }

    private createExternal(url: string): External {
        return new (this.fileType === Type.JS ? Script : Style)(url);
    }
}
