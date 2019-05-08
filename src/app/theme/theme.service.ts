import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { Script, Style, External } from './external';
import themes from '../../themes/themes.json';

enum Type {
    JS = 'js',
    CSS = 'css'
}

@Injectable()
export class ThemeService {
    themes: { [name: string]: External } = {};
    fileType: Type = environment.production ? Type.CSS : Type.JS;
    get currentTheme() {
        return localStorage.getItem('dsh-theme') || themes[0];
    }
    set currentTheme(theme: string) {
        localStorage.setItem('dsh-theme', theme);
    }

    constructor() {
        this.init();
    }

    init() {
        this.themes = themes.reduce((t, name) => {
            t[name] = this.createExternal(this.getFilePath(name));
            return t;
        }, {});
        this.changeTheme(this.currentTheme);
    }

    changeTheme(name: string = this.getNextTheme()) {
        this.themes[name].add();
        this.removeCurrentTheme();
        this.currentTheme = name;
        document.body.classList.add(this.currentTheme);
    }

    getNextTheme(): string {
        const idx = themes.findIndex(n => n === this.currentTheme) + 1;
        return themes[idx === themes.length ? 0 : idx];
    }

    private removeCurrentTheme() {
        if (this.currentTheme) {
            this.themes[this.currentTheme].remove();
            document.body.classList.remove(this.currentTheme);
        }
    }

    private getFilePath(name: string) {
        return `themes/${name}.${this.fileType}`;
    }

    private createExternal(url: string): External {
        return new (this.fileType === 'js' ? Script : Style)(url);
    }
}
