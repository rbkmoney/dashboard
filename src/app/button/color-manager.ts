import { Renderer2 } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

export class ColorManager {
    constructor(private renderer: Renderer2, private target: HTMLElement, private prefix = 'dsh') {}

    set(color: ThemePalette) {
        this.renderer.addClass(this.target, `${this.prefix}-${color}`);
    }

    remove(color: ThemePalette) {
        this.renderer.removeClass(this.target, `${this.prefix}-${color}`);
    }
}
