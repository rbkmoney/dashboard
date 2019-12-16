import { NgModule } from '@angular/core';

import { OnboardingRoutingModule } from './onboarding-routing.module';
import { CompanySearchModule } from './company-search';
import { DataFlowModule } from './data-flow';

@NgModule({
    imports: [OnboardingRoutingModule, CompanySearchModule, DataFlowModule]
})
export class OnboardingModule {}
