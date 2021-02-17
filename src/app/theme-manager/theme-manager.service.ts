import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

import { environment } from '../../environments';
import { ConfigService } from '../config';
import { SettingsService } from '../settings';
import { FileType } from './types/file-type';
import { ThemeName } from './types/theme-name';
import { createScriptElement } from './utils/create-script-element';
import { createStyleElement } from './utils/create-style-element';
import { isTheme } from './utils/is-theme';

@Injectable()
export class ThemeManager {
    private static readonly KEY = 'theme';

    current: ThemeName;

    private element: HTMLScriptElement | HTMLLinkElement;

    constructor(
        private settingsService: SettingsService,
        @Inject(DOCUMENT) private doc: Document,
        private configService: ConfigService
    ) {
        this.init();
    }

    change(name: ThemeName) {
        this.removeCurrent();
        this.set(name);
    }

    private init() {
        const name = this.settingsService.getLocalStorageItem(ThemeManager.KEY);
        const correctedName = this.getCorrectName(name);
        this.change(correctedName);
    }

    private getCorrectName(theme: string): ThemeName {
        // TODO: For several themes you will need to add a list of allowed theme to the config
        const allowedThemes: ThemeName[] = [this.configService.theme.default as ThemeName];
        if (isTheme(theme) && allowedThemes.includes(theme)) {
            return theme;
        }
        return (this.configService.theme.default as ThemeName) || ThemeName.light;
    }

    private set(name: ThemeName) {
        this.element = this.createElement(name);
        this.doc.head.appendChild(this.element);
        this.doc.body.classList.add(name);
        this.settingsService.setLocalStorageItem(ThemeManager.KEY, name);
        this.current = name;
    }

    private removeCurrent() {
        if (this.doc.head.contains(this.element)) {
            this.doc.head.removeChild(this.element);
        }
        this.doc.body.classList.remove(this.current);
    }

    private createElement(name: ThemeName): HTMLLinkElement | HTMLScriptElement {
        const fileType: FileType = environment.production ? FileType.CSS : FileType.JS;
        const url = `themes/${name}.${fileType}`;
        return fileType === FileType.JS ? createScriptElement(url) : createStyleElement(url);
    }
}
