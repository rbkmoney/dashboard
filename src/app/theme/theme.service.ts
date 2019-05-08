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
    currentTheme: string;

    constructor() {
        this.init();
    }

    init() {
        this.themes = themes.reduce((t, name) => {
            t[name] = this.createExternal(this.getFilePath(name));
            return t;
        }, {});
        this.changeTheme();
    }

    changeTheme(name?: string) {
        if (!name) {
            if (this.currentTheme) {
                const idx = themes.findIndex(n => n === this.currentTheme) + 1;
                name = themes[idx === themes.length ? 0 : idx];
            } else {
                name = themes[0];
            }
        }
        this.themes[name].add();
        if (this.currentTheme) {
            this.themes[this.currentTheme].remove();
            document.body.classList.remove(this.currentTheme);
        }
        this.currentTheme = name;
        document.body.classList.add(this.currentTheme);
    }

    private getFilePath(name: string) {
        return `themes/${name}.${this.fileType}`;
    }

    private createExternal(url: string): External {
        return new (this.fileType === 'js' ? Script : Style)(url);
    }
}
