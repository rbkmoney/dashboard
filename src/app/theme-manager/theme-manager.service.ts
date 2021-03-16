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
    isMainBackgroundImages = false;
    logoName: string;

    private element: HTMLScriptElement | HTMLLinkElement;

    constructor(
        private settingsService: SettingsService,
        @Inject(DOCUMENT) private doc: Document,
        private configService: ConfigService
    ) {}

    change(name: ThemeName) {
        this.removeCurrent();
        this.set(name);
    }

    async init() {
        const theme = this.configService?.theme;
        this.isMainBackgroundImages = theme?.isMainBackgroundImages;
        this.logoName = theme?.logoName;
        const name = this.settingsService.getLocalStorageItem(ThemeManager.KEY);
        const correctedName = this.getCorrectName(name);
        this.change(correctedName);
    }

    private getCorrectName(theme: string): ThemeName {
        return isTheme(theme) ? theme : ThemeName.main;
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
