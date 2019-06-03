import { Renderer2 } from '@angular/core';
import { ThemePalette } from '@angular/material';

export class ColorManager {
    constructor(private renderer: Renderer2, private target: HTMLElement, private preffix = 'dsh') {}

    set(color: ThemePalette) {
        this.renderer.addClass(this.target, `${this.preffix}-${color}`);
    }

    remove(color: ThemePalette) {
        this.renderer.removeClass(this.target, `${this.preffix}-${color}`);
    }
}
