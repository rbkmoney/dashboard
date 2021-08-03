import { NgModule } from '@angular/core';

import { CompanySearchModule } from './company-search';
import { DataFlowModule } from './data-flow';
import { OnboardingRoutingModule } from './onboarding-routing.module';

@NgModule({
    imports: [OnboardingRoutingModule, CompanySearchModule, DataFlowModule],
})
export class OnboardingModule {}
