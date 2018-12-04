import { NgModule } from '@angular/core';
import {
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatRadioModule,
    MatSlideToggleModule,
    DateAdapter,
    MAT_DATE_LOCALE,
    MAT_DATE_FORMATS,
    MAT_FORM_FIELD_DEFAULT_OPTIONS
} from '@angular/material';
import {
    MAT_MOMENT_DATE_ADAPTER_OPTIONS,
    MAT_MOMENT_DATE_FORMATS,
    MomentDateAdapter
} from '@angular/material-moment-adapter';
import { MAT_RIPPLE_GLOBAL_OPTIONS } from '@angular/material/core';

@NgModule({
    imports: [
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatAutocompleteModule,
        MatRadioModule,
        MatSlideToggleModule,
        MatButtonModule
    ],
    exports: [
        MatInputModule,
        MatSelectModule,
        MatCheckboxModule,
        MatDatepickerModule,
        MatAutocompleteModule,
        MatRadioModule,
        MatSlideToggleModule,
        MatButtonModule
    ],
    providers: [
        { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
        { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_LOCALE, useValue: 'ru' },
        { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: { disabled: true } },
        { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }
    ]
})
export class UiKitModule {}
