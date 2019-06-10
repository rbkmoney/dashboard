import { Component, Input, OnInit, Renderer2, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { ThemePalette } from '@angular/material';

import { GlowManager } from './glow-manager';
import { ColorManager } from '../color-manager';

@Component({
    selector: 'dsh-glow',
    templateUrl: 'glow.component.html',
    styleUrls: ['glow.component.scss']
})
export class GlowComponent implements OnInit, OnChanges {
    @Input() target: HTMLButtonElement;
    @Input() color: ThemePalette;

    private glowEl: HTMLElement;
    private colorManager: ColorManager;

    constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

    ngOnChanges({ color }: SimpleChanges) {
        if (this.glowEl && color && color.previousValue !== color.currentValue) {
            this.colorManager.set(color.currentValue);
            this.colorManager.remove(color.previousValue);
        }
    }

    ngOnInit() {
        this.glowEl = this.elementRef.nativeElement.querySelector('.dsh-glow');
        this.colorManager = new ColorManager(this.renderer, this.glowEl);
        new GlowManager(this.renderer, this.glowEl).register(this.target);
        this.colorManager.set(this.color);
    }
}
