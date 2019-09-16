import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { DataFlowComponent } from './data-flow.component';
import { BasicInfoComponent } from './basic-info';
import { DataFlowRoutingModule } from './data-flow-routing.module';
import { LayoutModule } from '../../../layout';
import { StateNavModule } from '../../../state-nav';
import { ButtonModule } from '../../../button';

@NgModule({
    imports: [CommonModule, FlexLayoutModule, DataFlowRoutingModule, LayoutModule, StateNavModule, ButtonModule],
    declarations: [DataFlowComponent, BasicInfoComponent]
})
export class DataFlowModule {}
