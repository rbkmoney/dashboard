import { ComponentFactoryResolver, Directive, Input, OnChanges, TemplateRef, ViewContainerRef } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

import { TextComponent } from '@dsh/components/empty/components/text/text.component';
import { ComponentChanges } from '@dsh/type-utils';

@Directive({
    selector: '[dsh-empty],[dshEmpty]',
})
export class EmptyDirective implements OnChanges {
    @Input() dshEmpty: any;

    @Input() dshEmptyText = this.translocoService.translate('emptyData');

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private resolver: ComponentFactoryResolver,
        private translocoService: TranslocoService
    ) {}

    ngOnChanges({ dshEmpty }: ComponentChanges<EmptyDirective>) {
        if (dshEmpty && (dshEmpty.currentValue !== dshEmpty.previousValue || dshEmpty.firstChange)) {
            if (dshEmpty.currentValue) {
                this.viewContainer.clear();
                const factory = this.resolver.resolveComponentFactory(TextComponent);
                const textComponent = this.viewContainer.createComponent(factory);
                textComponent.instance.text = this.dshEmptyText;
            } else {
                this.viewContainer.clear();
                this.viewContainer.createEmbeddedView(this.templateRef);
            }
        }
    }
}
