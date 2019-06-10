import {
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    Directive,
    ElementRef,
    EventEmitter,
    forwardRef,
    HostBinding,
    Inject,
    Input,
    OnDestroy,
    OnInit,
    Optional,
    Output,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import { AnimationEvent } from '@angular/animations';
import { CdkPortalOutlet, PortalHostDirective, TemplatePortal } from '@angular/cdk/portal';
import { Direction, Directionality } from '@angular/cdk/bidi';
import { Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, startWith } from 'rxjs/operators';
import { dshTabsAnimations } from './tabs-animations';

export declare type DshTabBodyPositionState = 'left' | 'center' | 'right' | 'left-origin-center' | 'right-origin-center';

@Directive({
    selector: '[dshTabBodyHost]'
})
export class DshTabBodyPortalDirective extends CdkPortalOutlet implements OnInit, OnDestroy {
    private _centeringSub = Subscription.EMPTY;
    private _leavingSub = Subscription.EMPTY;

    constructor(
        componentFactoryResolver: ComponentFactoryResolver,
        viewContainerRef: ViewContainerRef,
        @Inject(forwardRef(() => DshTabBodyComponent)) private _host: DshTabBodyComponent) {
        super(componentFactoryResolver, viewContainerRef);
    }

    ngOnInit(): void {
        super.ngOnInit();

        this._centeringSub = this._host._beforeCentering
            .pipe(startWith(this._host._isCenterPosition(this._host._position)))
            .subscribe((isCentering: boolean) => {
                if (isCentering && !this.hasAttached()) {
                    this.attach(this._host._content);
                }
            });

        this._leavingSub = this._host._afterLeavingCenter.subscribe(() => {
            this.detach();
        });
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
        this._centeringSub.unsubscribe();
        this._leavingSub.unsubscribe();
    }
}

@Component({
    selector: 'dsh-tab-body',
    exportAs: 'dshTabBody',
    templateUrl: 'tab-body.component.html',
    encapsulation: ViewEncapsulation.None,
    animations: [dshTabsAnimations.translateTab]
})
export class DshTabBodyComponent implements OnInit, OnDestroy {

    @HostBinding('class.dsh-tab-body')
    classTabBody = true;

    private _positionIndex: number;

    private _dirChangeSubscription = Subscription.EMPTY;

    _position: DshTabBodyPositionState;

    _translateTabComplete = new Subject<AnimationEvent>();

    @Output() readonly _onCentering: EventEmitter<number> = new EventEmitter<number>();

    @Output() readonly _beforeCentering: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Output() readonly _afterLeavingCenter: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Output() readonly _onCentered: EventEmitter<void> = new EventEmitter<void>(true);

    @ViewChild(PortalHostDirective) _portalHost: PortalHostDirective;

    @Input('content') _content: TemplatePortal;

    @Input() origin: number;

    @Input() animationDuration = '500ms';

    @Input()
    set position(position: number) {
        this._positionIndex = position;
        this._computePositionAnimationState();
    }

    constructor(private _elementRef: ElementRef<HTMLElement>,
                @Optional() private _dir: Directionality,
                changeDetectorRef: ChangeDetectorRef) {

        if (_dir) {
            this._dirChangeSubscription = _dir.change.subscribe((dir: Direction) => {
                this._computePositionAnimationState(dir);
                changeDetectorRef.markForCheck();
            });
        }

        this._translateTabComplete.pipe(distinctUntilChanged((x, y) => {
            return x.fromState === y.fromState && x.toState === y.toState;
        })).subscribe(event => {
            if (this._isCenterPosition(event.toState) && this._isCenterPosition(this._position)) {
                this._onCentered.emit();
            }

            if (this._isCenterPosition(event.fromState) && !this._isCenterPosition(this._position)) {
                this._afterLeavingCenter.emit();
            }
        });
    }

    ngOnInit() {
        if (this._position === 'center' && this.origin != null) {
            this._position = this._computePositionFromOrigin();
        }
    }

    ngOnDestroy() {
        this._dirChangeSubscription.unsubscribe();
        this._translateTabComplete.complete();
    }

    _onTranslateTabStarted(event: AnimationEvent): void {
        const isCentering = this._isCenterPosition(event.toState);
        this._beforeCentering.emit(isCentering);
        if (isCentering) {
            this._onCentering.emit(this._elementRef.nativeElement.clientHeight);
        }
    }

    _getLayoutDirection(): Direction {
        return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
    }

    _isCenterPosition(position: DshTabBodyPositionState | string): boolean {
        return position === 'center' ||
            position === 'left-origin-center' ||
            position === 'right-origin-center';
    }

    private _computePositionAnimationState(dir: Direction = this._getLayoutDirection()) {
        if (this._positionIndex < 0) {
            this._position = dir === 'ltr' ? 'left' : 'right';
        } else if (this._positionIndex > 0) {
            this._position = dir === 'ltr' ? 'right' : 'left';
        } else {
            this._position = 'center';
        }
    }

    private _computePositionFromOrigin(): DshTabBodyPositionState {
        const dir = this._getLayoutDirection();

        if ((dir === 'ltr' && this.origin <= 0) || (dir === 'rtl' && this.origin > 0)) {
            return 'left-origin-center';
        }

        return 'right-origin-center';
    }

}
