import { NgModule } from '@angular/core';

import { OnboardingRoutingModule } from './onboarding-routing.module';
import { CompanySearchModule } from './company-search';
import { DataFlowModule } from './data-flow';
import { DocumentUploadModule } from './document-upload';

@NgModule({
    imports: [OnboardingRoutingModule, CompanySearchModule, DataFlowModule, DocumentUploadModule]
})
export class OnboardingModule {}
