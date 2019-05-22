import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { Script, Style, External } from './external';
import themes from '../../themes/themes.json';
import { SettingsService } from '../settings';

enum Type {
    JS = 'js',
    CSS = 'css'
}

@Injectable()
export class ThemeService {
    themes: { [name: string]: External } = {};
    fileType: Type = environment.production ? Type.CSS : Type.JS;

    constructor(private settingsService: SettingsService) {
        this.init();
    }

    init() {
        this.themes = themes.reduce((t, name) => {
            t[name] = this.createExternal(this.getFilePath(name));
            return t;
        }, {});
        this.changeTheme(this.settingsService.theme);
    }

    changeTheme(name: string = this.getNextTheme()) {
        this.themes[name].add();
        this.removeCurrentTheme();
        this.settingsService.theme = name;
        document.body.classList.add(this.settingsService.theme);
    }

    getNextTheme(): string {
        const idx = themes.findIndex(n => n === this.settingsService.theme) + 1;
        return themes[idx === themes.length ? 0 : idx];
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
