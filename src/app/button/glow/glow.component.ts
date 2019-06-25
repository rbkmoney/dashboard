import {
    Component,
    Input,
    OnInit,
    Renderer2,
    ElementRef,
    OnChanges,
    SimpleChanges,
    ViewChild,
    OnDestroy
} from '@angular/core';
import { ThemePalette } from '@angular/material';

import { GlowManager } from './glow-manager';
import { ColorManager } from '../color-manager';

@Component({
    selector: 'dsh-glow',
    templateUrl: 'glow.component.html',
    styleUrls: ['glow.component.scss']
})
export class GlowComponent implements OnInit, OnChanges, OnDestroy {
    @Input() target: HTMLButtonElement;
    @Input() color: ThemePalette;

    @ViewChild('glow', { static: true }) private glowRef: ElementRef<HTMLSpanElement>;
    private colorManager: ColorManager;
    private glowManager: GlowManager;

    constructor(private renderer: Renderer2) {}

    ngOnChanges({ color }: SimpleChanges) {
        if (this.colorManager && color && color.previousValue !== color.currentValue) {
            this.colorManager.set(color.currentValue);
            this.colorManager.remove(color.previousValue);
        }
    }

    ngOnInit() {
        if (!this.target) {
            throw new Error('Target button element should be specified');
        }
        this.colorManager = new ColorManager(this.renderer, this.glowRef.nativeElement);
        this.glowManager = new GlowManager(this.renderer, this.glowRef.nativeElement);
        this.glowManager.register(this.target);
        this.colorManager.set(this.color);
    }

    ngOnDestroy() {
        this.glowManager.unregister();
    }
}
