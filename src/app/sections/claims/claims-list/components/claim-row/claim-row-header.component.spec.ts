import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { RowModule } from '@dsh/components/layout';

import { StatusModificationUnit } from '../../../../../api-codegen/claim-management/swagger-codegen';
import { generateMockClaim } from '../../../tests/generate-mock-claim';
import { ClaimRowComponent } from './claim-row.component';

describe('ClaimRowComponent', () => {
    let fixture: ComponentFixture<ClaimRowComponent>;
    let component: ClaimRowComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RowModule],
            declarations: [ClaimRowComponent],
        })
            .overrideComponent(ClaimRowComponent, {
                set: {
                    changeDetection: ChangeDetectionStrategy.Default,
                },
            })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ClaimRowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('template', () => {
        it('should show loading value if claim was not provided', () => {
            const labels = fixture.debugElement.queryAll(By.css('dsh-row dsh-row-label'));

            expect(labels.length).toBe(1);
            expect(labels[0].nativeElement.textContent.trim()).toBe('Loading ...');
        });

        it('should show balances component if claim was provided', () => {
            const { createdAt, updatedAt } = generateMockClaim();

            fixture.detectChanges();

            const labels = fixture.debugElement.queryAll(By.css('dsh-row dsh-row-label'));

            expect(labels[0].nativeElement.textContent.trim()).toBe(StatusModificationUnit.StatusEnum.Pending);
            expect(labels[1].nativeElement.textContent.trim()).toBe(createdAt.toUTCString());
            expect(labels[2].nativeElement.textContent.trim()).toBe(updatedAt.toUTCString());
        });
    });
});
